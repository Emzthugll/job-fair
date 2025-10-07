<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\QrCodeController;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


// Route to display the applicant form 
Route::get('/applicant/form', [ApplicantController::class, 'showForm'])->name('applicant.form');

// Route to handle form submission
Route::post('/applicant/form', [ApplicantController::class, 'Main'])->name('applicant.submit');

//QR Code Generation Route
Route::get('/qr/{id}', [QrCodeController::class, 'show']);

// Route to download the QR code as a PDF
Route::get('/qr/download/{id}', [QrCodeController::class, 'download'])->name('qr.download');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

