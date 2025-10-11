<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicantFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Personal Information
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

            // Job Preferences
            'employment' => 'required|string',
            'preferred_job' => 'required|string',

            // Educational Background
            'level' => 'required|integer|in:1,2,3,4,5',
            'course' => 'nullable|string',
            'school' => 'nullable|string|max:255',
            'year_graduated' => 'nullable|digits:4',

            // Eligibility
            'eligibility_name' => 'nullable|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'date_of_issuance' => 'nullable|date',
            'date_of_expiration' => 'nullable|date',


            // Trainings
            'training_name' => 'nullable|string',
            'institution' => 'nullable|string',
            'certificate' => 'nullable|string',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',

            // Work Experience
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'date_started' => 'nullable|date',
            'date_ended' => 'nullable|date',
            'status' => 'nullable|string|max:50',

            // Session ID
            'session_id' => 'required|string',
        ];
    }
}
