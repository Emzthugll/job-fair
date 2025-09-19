<?php

namespace App\Http\Controllers\applicant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationalBackgroundController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicant_profile_id' => 'required|integer',
            'level'         => 'required|string',
            'course'        => 'required|string',
            'year_graduated'=> 'required|integer',
        ]);

        DB::table('applicant_profile_educational_backgrounds')->updateOrInsert(
            ['applicant_profile_id' => $validated['applicant_profile_id']],
            $validated
        );

        return response()->json(['success' => true]);
    }
}
