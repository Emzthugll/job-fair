<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfileWorkExperience extends Model
{
    use HasFactory;

    protected $table = 'applicant_profile_work_experiences';

    protected $fillable = [
        'personal_profile_id',
        'company',
        'address',
        'date_started',
        'date_ended',
        'position',
        'status'
    ];

    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'personal_profile_id');
    }
}
