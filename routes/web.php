<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ApplicantController;




Route::get('/', function () {
    return Inertia::render('main'); 
});

Route::post('/main', [ApplicantController::class, 'main'])->name('main.store');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
