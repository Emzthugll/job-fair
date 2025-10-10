<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class QrCodeController extends Controller
{
    public function download($id)
    {
        try {
            $directory = 'public/qrcodes';
            if (!Storage::exists($directory)) {
                Storage::makeDirectory($directory);
            }

            $filePath = "{$directory}/qr_{$id}.png";

            // Generate QR code 
            $qrPng = QrCode::format('png')
                ->size(300)
                ->color(0, 0, 0)           
                ->backgroundColor(255, 255, 255) 
                ->generate($id);

            // Save PNG to storage 
            Storage::put($filePath, $qrPng);

            // Encode PNG as base64 for DomPDF
            $qrBase64 = base64_encode($qrPng);

            $pdf = Pdf::loadView('pdf.qr', [
                'id' => $id,
                'qrBase64' => $qrBase64, 
            ]);

            return $pdf->download("Applicant_QR_{$id}.pdf");

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
            ]);
        }
    }
}
