<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\QrCodeController;



// Route to display the applicant form 
Route::get('/applicant/form', [ApplicantController::class, 'showForm'])->name('applicant.form');

// Route to handle form submission
Route::post('/applicant/form', [ApplicantController::class, 'Main'])->name('applicant.submit');

//QR Code Generation Route
Route::get('/qr/{token}', [QrCodeController::class, 'show']);

// Route to download the QR code as a PDF
Route::get('/qr/download/{token}', [QrCodeController::class, 'download'])->name('qr.download');


require __DIR__.'/settings.php';


