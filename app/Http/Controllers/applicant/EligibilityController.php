<?php

namespace App\Http\Controllers\applicant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EligibilityController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicant_profile_id'  => 'required|integer',
            'name'       => 'required|string|max:255',
             'date_of_issuance' => 'required|date',
            'date_of_expiration' => 'nullable|date',
        ]);

        DB::table('applicant_profile_eligibilities')->insert($validated);

        return response()->json(['success' => true]);
    }
}
