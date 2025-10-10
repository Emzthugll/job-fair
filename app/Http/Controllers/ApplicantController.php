<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicantProfile;
use App\Models\ApplicantProfileJobPreference;
use App\Models\ApplicantProfileEligibility;
use App\Models\ApplicantProfileTraining;
use App\Models\ApplicantProfileEducationalBackground;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    /**
     * Show applicant form (prefilled if exists)
     */
    public function showForm(Request $request)
    {   //for the input
    $session = DB::table('sessions')->where('id', $request->session_id)->first();

        if (!$session || !$session->user_id) {
            return redirect('/error')->with('message', 'Invalid or expired session.');
        }

        $userId = $session->user_id;

        // Fetch applicant profile or create new
        $applicant = ApplicantProfile::with([
            'jobPreference',
            'eligibilities',
            'trainings',
            'highestEducation',
        ])->firstOrNew(['user_id' => $userId]);

        // Fetch user via Eloquent
        $user = User::find($userId);

        return Inertia::render('Main', [
    'applicant' => [
        ...$applicant->toArray(),
        'jobPreference' => $applicant->jobPreference?->toArray() ?? null,
        'highestEducation' => $applicant->highestEducation?->toArray() ?? null,
        'eligibility' => $applicant->eligibilities->first()?->toArray() ?? null,
        'training' => $applicant->trainings->first()?->toArray() ?? null,
    ],
    'email' => $user?->email ?? '',  
    'session_id' => $request->session_id,
]);
}


    /**
     * Save or update applicant profile and related tables
     */
    public function Main(Request $request)
   {
    try {
    // Validate input
    $validated = $request->validate([
        // Personal Information
        'firstname' => 'required|string|max:255',
        'midname' => 'nullable|string|max:255',
        'surname' => 'required|string|max:255',
        'suffix' => 'nullable|string|max:10',
        'birthday' => 'required|date',
        'sex' => 'required|string|max:7',
        'religion' => 'nullable|string|max:100',
        'civil_status' => 'required|string|max:20',
        'current_barangay' => 'required|string|max:255',
        'current_city' => 'required|string|max:255',
        'current_province' => 'required|string|max:255',
        'tin_number' => 'nullable|string|max:15',
        'disability' => 'nullable|string|max:255',
        'contact_number' => 'required|string|max:15',
        'employment_status' => 'required|string',

        // Job Preferences
        'employment' => 'required|string',
        'preferred_job' => 'required|string',

        // Educational Background
        'level' => 'required|integer|in:1,2,3,4,5',
        'course' => 'nullable|string',
        'year_graduated' => 'nullable|digits:4',

        // Eligibility
        'eligibility_name' => 'required_with:issuer,date_of_issuance|string|max:255',
        'issuer' => 'required_with:eligibility_name,date_of_issuance|string|max:255',
        'date_of_issuance' => 'required_with:eligibility_name,issuer|date',
        'date_of_expiration' => 'nullable|date',




        // Trainings
        'training_name' => 'nullable|string',
        'institution' => 'nullable|string',
        'certificate' => 'nullable|string',
        'date_start' => 'nullable|date',
        'date_end' => 'nullable|date',

        // Session ID
        'session_id' => 'required|string',
    ]);

    // Resolve user_id from session_id
    $session = DB::table('sessions')->where('id', $validated['session_id'])->first();

    if (!$session || !$session->user_id) {
        return redirect('/error')->with('message', 'Invalid or expired session.');
    }

    $userId = $session->user_id;

    // Save main applicant profile
    $applicant = ApplicantProfile::updateOrCreate(
        ['user_id' => $userId],
        [
            'firstname' => $validated['firstname'],
            'midname' => $validated['midname'] ?? null,
            'surname' => $validated['surname'],
            'suffix' => $validated['suffix'] ?? null,
            'birthday' => $validated['birthday'],
            'sex' => $validated['sex'],
            'disability' => $validated['disability'] ?? null,
            'religion' => $validated['religion'],
            'tin_number' => $validated['tin_number'],
            'civil_status' => $validated['civil_status'],
            'current_barangay' => $validated['current_barangay'],
            'current_city' => $validated['current_city'],
            'current_province' => $validated['current_province'],
            'contact_number' => $validated['contact_number'],
            'employment_status' => $validated['employment_status'],
        ]
    );

    // Job Preferences
    ApplicantProfileJobPreference::updateOrCreate(
        ['applicant_profile_id' => $applicant->id],
        [
            'employment' => $validated['employment'],
            'preferred_job' => $validated['preferred_job'],
        ]
    );

    // Educational Background(highest attainment only)
    if (!empty($validated['level'])) {
        ApplicantProfileEducationalBackground::UpdateOrCreate(
            [
                'applicant_profile_id' => $applicant->id,
                'level' => $validated['level'],
            ],
            [
                'course' => $validated['course'] ?? null,
                'year_graduated' => $validated['year_graduated'] ?? null,
            ]
            );
    }
    
    
    // Eligibility 
if (!empty($validated['eligibility_name']) || !empty($validated['issuer']) || !empty($validated['date_of_issuance'])) {
    $eligibility = ApplicantProfileEligibility::firstOrNew([
        'applicant_profile_id' => $applicant->id,
    ]);

    $eligibility->name = trim($validated['eligibility_name']); 
    $eligibility->issuer = $validated['issuer'] ?? null;
    $eligibility->date_of_issuance = $validated['date_of_issuance'] ?? null;
    $eligibility->date_of_expiration = $validated['date_of_expiration'] ?? null;

    $eligibility->save();
}


// Trainings
if (!empty($validated['training_name']) || !empty($validated['date_start'])) {

    // Get existing training for this applicant, or create new
    $training = ApplicantProfileTraining::firstOrNew([
        'applicant_profile_id' => $applicant->id,
    ]);

    $training->name = trim($validated['training_name'] ?? $training->name);
    $training->institution = $validated['institution'] ?? $training->institution;
    $training->certificate = $validated['certificate'] ?? $training->certificate;
    $training->date_start = $validated['date_start'] ?? $training->date_start;
    $training->date_end = $validated['date_end'] ?? $training->date_end;

    $training->save();
}



    

    return redirect()->back()->with('success', 'Applicant profile updated successfully!');
    }
    catch (\Exception $e) {   
     return $e->getMessage();
    }

}
}