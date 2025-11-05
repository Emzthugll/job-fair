<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\QrCodeController;



// Display form (GET)
Route::get('/applicant/form', [ApplicantController::class, 'showForm'])->name('applicant.form');

// Handle form submission (POST)
Route::post('/applicant/form', [ApplicantController::class, 'submit'])->name('applicant.submit');
    

// Display QR code in browser
Route::get('/qr/{token}', [QrCodeController::class, 'show']);

// Generate QR token for a submitted applicant
Route::post('/applicant/qr/generate', [QrCodeController::class, 'generate'])->name('qr.generate');


// Download QR code as PDF
Route::get('/qr/download/{token}', [QrCodeController::class, 'download'])->name('qr.download');



require __DIR__.'/settings.php';


