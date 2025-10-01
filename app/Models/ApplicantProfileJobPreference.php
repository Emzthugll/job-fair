<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfileJobPreference extends Model
{
    use HasFactory;

    // If your table name is not the pluralized version of the model, specify it
    protected $table = 'applicant_profile_job_preference';

    // Specify the fillable columns
    protected $fillable = [
        'applicant_profile_id',
        'employment',
        'preferred_job'
    ];

    // Relation back to the applicant profile
    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id');
    }
}
