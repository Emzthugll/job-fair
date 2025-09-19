<?php

namespace App\Http\Controllers\applicant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrainingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicant_profile_id' => 'required|integer',
            'name'       => 'required|string|max:255',
            'date_start' => 'required|date',
            'date_end'   => 'required|date',
            'institution'=> 'required|string|max:255',
            'certificate'=> 'nullable|string|max:255',
        ]);

        DB::table('applicant_profile_trainings')->insert($validated);

        return response()->json(['success' => true]);
    }
}
