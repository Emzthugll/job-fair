<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicantProfileController extends Controller
{
    //Personal Info
    public function savePersonal(Request $request)
    {
        $validated = $request->validate([
            'user_id'          => 'required|integer|exists:users,id',
            'firstname'        => 'required|string|max:50',
            'midname'          => 'nullable|string|max:50',
            'surname'          => 'required|string|max:50',
            'suffix'           => 'nullable|string|max:10',
            'birthday'         => 'required|date',
            'sex'              => 'required|string',
            'religion'         => 'required|string',
            'civil_status'     => 'required|string',
            'current_barangay' => 'required|string|max:255',
            'current_city'     => 'required|string|max:255',
            'current_province' => 'required|string|max:255',
            'tin_number'       => 'nullable|string|max:20',
            'disability'       => 'nullable|string|max:255',
            'contact_number'   => 'required|string|max:20',
            'employment_status'=> 'required|string',
        ]);

        DB::table('applicant_profiles')->updateOrInsert(
            ['user_id' => $validated['user_id']],
            $validated
        );

        return response()->json(['message' => 'Personal info saved successfully']);
    }

    // Job Preference
    public function saveJobPreference(Request $request)
    {
        $validated = $request->validate([
            'user_id'       => 'required|integer|exists:users,id',
            'employment'    => 'required|string',
            'preferred_job' => 'required|string',
        ]);

        DB::table('applicant_profile_job_preferences')->updateOrInsert(
            ['user_id' => $validated['user_id']],
            $validated
        );

        return response()->json(['message' => 'Job preference saved successfully']);
    }

    // Education
    public function saveEducation(Request $request)
{
    $validated = $request->validate([
        'user_id'        => 'required|integer|exists:users,id',
        'level'          => 'required|integer',
        'course'         => 'required|string',
        'year_graduated' => 'required|integer',
    ]);

    DB::table('applicant_profile_educational_backgrounds')->updateOrInsert(
        ['user_id' => $validated['user_id']],
        $validated
    );

    // Mapping
    $levels = [
        1 => 'Elementary',
        2 => 'High School',
        3 => 'Technical Vocational',
        4 => 'College',
        5 => 'Post Graduate',
    ];

    $education = DB::table('applicant_profile_educational_backgrounds')
        ->where('user_id', $validated['user_id'])
        ->first();

    $education->level_label = $levels[$education->level] ?? 'Unknown';

    return response()->json([
        'message'   => 'Education saved successfully',
        'education' => $education,
    ]);
}


    // Training (Optional)
    public function saveTraining(Request $request)
    {
        $validated = $request->validate([
            'user_id'     => 'required|integer|exists:users,id',
            'name'        => 'nullable|string|max:255',
            'date_start'  => 'nullable|date',
            'date_end'    => 'nullable|date',
            'institution' => 'nullable|string|max:255',
            'certificate' => 'nullable|string|max:255',
        ]);

        if (!empty($validated['name'])) {
            DB::table('applicant_profile_trainings')->updateOrInsert(
                ['user_id' => $validated['user_id']],
                $validated
            );
        }

        return response()->json(['message' => 'Training saved successfully']);
    }

    // Eligibility (Optional)
    public function saveEligibility(Request $request)
    {
        $validated = $request->validate([
            'user_id'            => 'required|integer|exists:users,id',
            'name'               => 'nullable|string|max:255',
            'date_of_issuance'   => 'nullable|date',
            'date_of_expiration' => 'nullable|date',
        ]);

        if (!empty($validated['name'])) {
            DB::table('applicant_profile_license_eligibilities')->updateOrInsert(
                ['user_id' => $validated['user_id']],
                $validated
            );
        }

        return response()->json(['message' => 'Eligibility saved successfully']);
    }

    // Work Experience (Optional)
    public function saveWorkExperience(Request $request)
    {
        $validated = $request->validate([
            'user_id'      => 'required|integer|exists:users,id',
            'company'      => 'nullable|string|max:255',
            'address'      => 'nullable|string|max:255',
            'position'     => 'nullable|string|max:100',
            'date_started' => 'nullable|date',
            'date_ended'   => 'nullable|date',
        ]);

        if (!empty($validated['company'])) {
            DB::table('applicant_profile_work_experiences')->updateOrInsert(
                ['user_id' => $validated['user_id']],
                $validated
            );
        }

        return response()->json(['message' => 'Work experience saved successfully']);
    }
}
