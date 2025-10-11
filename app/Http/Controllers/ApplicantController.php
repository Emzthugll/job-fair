<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ApplicantFormRequest;
use App\Models\ApplicantProfile;
use App\Models\ApplicantProfileJobPreference;
use App\Models\ApplicantProfileEligibility;
use App\Models\ApplicantProfileTraining;
use App\Models\ApplicantProfileEducationalBackground;
use App\Models\ApplicantProfileWorkExperience;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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

        // Fetch applicant profile or create new
        $applicant = ApplicantProfile::with([
            'jobPreference',
            'eligibilities',
            'trainings',
            'highestEducation',
            'workExperiences',
        ])
            ->where('user_id', $userId)
            ->latest('id')  // ensures you get the most recent record if multiple exist
            ->firstOrNew();


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
     * Save or update applicant profile and related tables
     */
    public function Main(ApplicantFormRequest $request)
    {
        try {
            // Validate input
            $validated = $request->validated();

            // Resolve user_id from session (only once)
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

            // Job Preferences (single entry)
            ApplicantProfileJobPreference::updateOrCreate(
                ['applicant_profile_id' => $applicant->id],
                [
                    'employment' => $validated['employment'],
                    'preferred_job' => $validated['preferred_job'],
                ]
            );

            // Educational Background (highest attainment only)
            if (!empty($validated['level'])) {
                ApplicantProfileEducationalBackground::updateOrCreate(
                    [
                        'applicant_profile_id' => $applicant->id,
                        'level' => $validated['level'],
                    ],
                    [
                        'school' => $validated['school'] ?? null,
                        'course' => $validated['course'] ?? null,
                        'year_graduated' => $validated['year_graduated'] ?? null,
                    ]
                );
            }

            // Eligibility (single entry)
            if (!empty($validated['eligibility_name']) || !empty($validated['issuer'])) {
                ApplicantProfileEligibility::updateOrCreate(
                    ['applicant_profile_id' => $applicant->id],
                    [
                        'name' => trim($validated['eligibility_name'] ?? ''),
                        'issuer' => $validated['issuer'] ?? null,
                        'date_of_issuance' => $validated['date_of_issuance'] ?? null,
                        'date_of_expiration' => $validated['date_of_expiration'] ?? null,
                    ]
                );
            }






            // Trainings (single entry)
            if (!empty($validated['training_name']) || !empty($validated['date_start'])) {
                ApplicantProfileTraining::updateOrCreate(
                    ['applicant_profile_id' => $applicant->id],
                    [
                        'name' => trim($validated['training_name'] ?? ''),
                        'institution' => $validated['institution'] ?? null,
                        'certificate' => $validated['certificate'] ?? null,
                        'date_start' => $validated['date_start'] ?? null,
                        'date_end' => $validated['date_end'] ?? null,
                    ]
                );
            }

            // Work Experience (single entry)
            if (!empty($validated['company']) || !empty($validated['position'])) {
                ApplicantProfileWorkExperience::updateOrCreate(
                    ['personal_profile_id' => $applicant->id],
                    [
                        'company' => trim($validated['company'] ?? ''),
                        'address' => trim($validated['address'] ?? ''),
                        'position' => trim($validated['position'] ?? ''),
                        'status' => $validated['status'] ?? '',
                        'date_started' => $validated['date_started'] ?? null,
                        'date_ended' => $validated['date_ended'] ?? null,
                    ]
                );
            }

            return redirect()->back()->with('success', 'Applicant profile updated successfully!');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
