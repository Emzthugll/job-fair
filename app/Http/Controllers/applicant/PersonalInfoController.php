<?php

namespace App\Http\Controllers\applicant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use illuminate\Support\Facades\DB;

class PersonalInfoController extends Controller
{
 public function store(Request $request)
 {

    $validated = $request->validate([
            'user_id'           => 'required|integer',
            'firstname'         => 'required|string|max:50',
            'midname'           => 'nullable|string|max:50',
            'surname'           => 'required|string|max:50',
            'suffix'            => 'nullable|string|max:10',
            'birthday'          => 'required|date',
            'sex'               => 'required|string',
            'religion'          => 'required|string',
            'civil_status'      => 'required|string',
            'current_barangay'  => 'required|string|max:255',
            'current_city'      => 'required|string|max:255',
            'current_province'  => 'required|string|max:255',
            'email'             => 'required|email|max:100',
            'tin_number'        => 'nullable|string|max:20',
            'disability'        => 'required|string',
            'contact_number'    => 'required|string|max:20',
            'employment_status' => 'required|string',
    ]);

    DB::table('applicant_profiles')->updateOrInsert(
        ['user_id' => $validated['user_id']],
        $validated
    );  

    return response()->json(['success' => true]);
 }
}
