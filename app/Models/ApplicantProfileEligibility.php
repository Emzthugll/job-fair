<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfileEligibility extends Model
{
    use HasFactory;

    protected $table = 'applicant_profile_license_eligibilities';

    protected $fillable = [
        'applicant_profile_id',
        'eligibility_name',
        'issuer',
        'date_of_issuance',
        'date_of_expiration'
    ];

    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id');
    }
}
