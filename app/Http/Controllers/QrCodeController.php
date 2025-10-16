<?php

namespace App\Http\Controllers;

use App\Models\ApplicantProfile;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class QrCodeController extends Controller
{
    public function download($token)
    {
        try {
            $applicant = ApplicantProfile::where('qr_token', $token)->firstorFail();

            // Generate QR token if it doesn't exist
            if (!$applicant->qr_token) {
                $applicant->qr_token = Str::random(128); 
                $applicant->save();
            }

            $directory = 'public/qrcodes';
            if (!Storage::exists($directory)) {
                Storage::makeDirectory($directory);
            }

            $filePath = "{$directory}/qr_{$token}.png";

            // Generate QR code using the secure token
            $qrPng = QrCode::format('png')
                ->size(300)
                ->color(0, 0, 0)
                ->backgroundColor(255, 255, 255)
                ->generate($applicant->qr_token);

            // Save PNG to storage
            Storage::put($filePath, $qrPng);

            // Encode PNG as base64 for PDF
            $qrBase64 = base64_encode($qrPng);

            $pdf = Pdf::loadView('pdf.qr', [
                'token' => $applicant->qr_token,
                'qrBase64' => $qrBase64,
                'firstname' => $applicant->firstname,
                'surname' => $applicant->surname,
            ]);

            $fileName = "Applicant_{$applicant->firstname}_{$applicant->surname}_QR.pdf";
            return $pdf->download("$fileName");



        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
            ]);
        }
    }
}
