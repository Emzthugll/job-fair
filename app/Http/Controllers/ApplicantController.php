<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicantProfile; 

class ApplicantController extends Controller
{
    public function Main(Request $request)
    {
       
        $validated = $request->validate([
            //Personal Information 
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

            //Job Preferences
            'employment' => 'required|string',
            'preferred_job' => 'required|string',

            // Education Background
            'level' => 'required|string',
            'course' => 'nullable|string',
            'year_graduated' => 'nullable|digits:4',

            //Eligibility
            'eligibility_name' => 'nullable|string',
            'issuer' => 'nullable|string',
            'date_of_issuance' => 'nullable|date',
            'date_of_expiration' => 'nullable|date',

            // Validate email against users table
            'email' => 'required|email|max:255|exists:users,email',
            
        ]);

        
        $applicant = new ApplicantProfile();
        $applicant->user_id = auth()->id();
        $applicant->firstname = $validated['firstname'];
        $applicant->midname = $validated['midname'];
        $applicant->surname = $validated['surname'];
        $applicant->suffix = $validated['suffix'] ?? null;
        $applicant->birthday = $validated['birthday'];
        $applicant->sex = $validated['sex'];
        $applicant->religion = $validated['religion'] ?? null;
        $applicant->civil_status = $validated['civil_status'];
        $applicant->current_barangay = $validated['current_barangay'];
        $applicant->current_city = $validated['current_city'];
        $applicant->current_province = $validated['current_province'];
        $applicant->tin_number = $validated['tin_number'] ?? null;
        $applicant->disability = $validated['disability'] ?? null;
        $applicant->contact_number = $validated['contact_number'];
        $applicant->employment_status = $validated['employment_status'];
        $applicant->employment = $validated['employment'];
        $applicant->preferred_job = $validated['preferred_job'];
        $applicant->level = $validated['level'];
        $applicant->course = $validated['course'] ?? null;
        $applicant->year_graduated = $validated['year_graduated'] ?? null;
        $applicant->save();

        
        return redirect()->back()->with('success', 'Applicant saved successfully!');
    }
}
