<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','firstname','midname','surname','suffix','birthday','sex','religion',
        'civil_status','current_barangay','current_city','current_province',
        'tin_number','disability','contact_number','employment_status'
    ];

    // Job Preference
    public function jobPreference()
    {
        return $this->hasOne(ApplicantProfileJobPreference::class, 'applicant_profile_id');
    }

    // Eligibility/License
    public function eligibilities()
    {
        return $this->hasMany(ApplicantProfileEligibility::class, 'applicant_profile_id');
    }

    // Educational Backgrounds
    public function educationalBackgrounds()
    {
        return $this->hasMany(ApplicantProfileEducationalBackground::class, 'applicant_profile_id');
    }
    //highest attainment
    public function highestEducation()
    {
       return $this->hasOne(ApplicantProfileEducationalBackground::class, 'applicant_profile_id')
                    ->ofMany('level', 'max'); 
    }


    // Trainings
    public function trainings()
    {
        return $this->hasMany(ApplicantProfileTraining::class, 'applicant_profile_id');
    }

    // Work Experience
    public function workExperiences()
    {
        return $this->hasMany(ApplicantProfileWorkExperience::class, 'personal_profile_id');
    }

    // Relation to user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
