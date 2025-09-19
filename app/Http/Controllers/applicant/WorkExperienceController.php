<?php

namespace App\Http\Controllers\applicant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicant_profile_id' => 'required|integer',
            'company'     => 'required|string|max:255',
            'address'     => 'required|string|max:255',
            'position'    => 'required|string|max:100',
            'date_started' => 'required|date',
            'date_ended'  => 'nullable|date',
        ]);

        DB::table('applicant_profile_work_experiences')->insert($validated);

        return response()->json(['success' => true]);
    }
}
