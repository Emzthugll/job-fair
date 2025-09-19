<?php

namespace App\Http\Controllers\applicant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JobPreferenceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employment'    => 'required|string',
            'preferred_job' => 'required|string',
        ]);

        DB::table('applicant_profile_job_preference')->updateOrInsert(
            ['applicant_profile_id' => $validated['applicant_profile_id']],
            $validated
        );

        return response()->json(['success' => true]);
    }
}
