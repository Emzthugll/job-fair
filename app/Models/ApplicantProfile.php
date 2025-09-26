<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfile extends Model
{

    use HasFactory;

    protected $fillable = [
        'firstname','midname','surname','suffix','birthday','sex','religion',
        'civil_status','current_barangay','current_city','current_province',
        'tin_number','disability','contact_number','employment_status'
    ];

    public function jobPreference()
    {
        return $this->hasOne(JobPreference::class, 'applicant_id');
    }



    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

    
}