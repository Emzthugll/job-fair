<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfileTraining extends Model
{
    use HasFactory;

    protected $table = 'applicant_profile_trainings';

    protected $fillable = [
        'applicant_profile_id',
        'name',
        'institution',
        'certificate',
        'date_start',
        'date_end'
    ];

    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id');
    }
}
