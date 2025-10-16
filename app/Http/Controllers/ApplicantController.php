<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ApplicantFormRequest;
use App\Models\ApplicantProfile;
use App\Models\ApplicantProfileJobPreference;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ApplicantController extends Controller
{
    /**
     * Show applicant form (prefilled if exists)
     */
    public function showForm(Request $request)
    {
        // Resolve user_id from session
        $session = DB::table('sessions')->where('id', $request->session_id)->first();
        if (!$session || !$session->user_id) {
            return redirect('/error')->with('message', 'Invalid or expired session.');
        }
        $userId = $session->user_id;

        // Fetch existing applicant profile only
        $applicant = ApplicantProfile::with([
            'jobPreference',
            'eligibilities',
            'trainings',
            'highestEducation',
            'workExperiences',
        ])
            ->where('user_id', $userId)
            ->latest('id')
            ->first();

        if (!$applicant) {
            return redirect('/error')->with('message', 'No applicant profile found to update.');
        }

        // Fetch user email
        $user = User::find($userId);

        return Inertia::render('Main', [
            'applicant' => [
                ...$applicant->toArray(),
                'jobPreference' => $applicant->jobPreference?->toArray() ?? null,
                'highestEducation' => $applicant->highestEducation?->toArray() ?? null,
                'eligibility' => $applicant->eligibilities->first()?->toArray() ?? null,
                'training' => $applicant->trainings->first()?->toArray() ?? null,
                'workExperience' => $applicant->workExperiences->first()?->toArray() ?? null,
            ],
            'email' => $user?->email ?? '',
            'session_id' => $request->session_id,
        ]);
    }

    /**
     * Update applicant profile and related tables
     */
    public function Main(ApplicantFormRequest $request)
    {
        try {
            // Validate input
            $validated = $request->validated();

            // Resolve user_id from session
            $session = DB::table('sessions')->where('id', $validated['session_id'])->first();
            if (!$session || !$session->user_id) {
                return redirect('/error')->with('message', 'Invalid or expired session.');
            }
            $userId = $session->user_id;

            // Fetch existing applicant profile
            $applicant = ApplicantProfile::where('user_id', $userId)->latest('id')->first();
            if (!$applicant) {
                return redirect('/error')->with('message', 'No applicant profile found to update.');
            }

            // Update main applicant profile
            $applicant->update([
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
            ]);

            // Generate QR token if not exists
            if (!$applicant->qr_token) {
            $applicant->qr_token = Str::random(128); 
            $applicant->save();
            }

            // Job Preference 
            $jobPreference = ApplicantProfileJobPreference::firstOrNew([
            'applicant_profile_id' => $applicant->id,
            ]);
            $jobPreference->employment = $validated['employment'] ?? null;
            $jobPreference->preferred_job = $validated['preferred_job'] ?? null;
            $jobPreference->save();



            if ($applicant->highestEducation && !empty($validated['level'])) {
                $applicant->highestEducation->update([
                    'school' => $validated['school'] ?? null,
                    'course' => $validated['course'] ?? null,
                    'year_graduated' => $validated['year_graduated'] ?? null,
                ]);
            }


            return redirect()->back()->with('success', 'Applicant profile updated successfully!');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
