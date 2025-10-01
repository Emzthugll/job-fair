<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ApplicantController;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;




// Route to display the applicant form 
Route::get('/applicant/form', [ApplicantController::class, 'showForm'])->name('applicant.form');

// Route to handle form submission
Route::post('/applicant/form', [ApplicantController::class, 'Main'])->name('applicant.submit');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

