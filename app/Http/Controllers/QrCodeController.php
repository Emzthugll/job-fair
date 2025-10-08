<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Barryvdh\DomPDF\Facade\Pdf;

class QrCodeController extends Controller
{
    public function download($id)
    {
        $filePath = "public/qrcodes/qr_{$id}.png";

        // Create directory if missing
        if (!Storage::exists('public/qrcodes')) {
            Storage::makeDirectory('public/qrcodes');
        }

        // Generate QR code if not exists
        if (!Storage::exists($filePath)) {
            QrCode::format('png')
                ->size(300)
                ->backgroundColor(168, 151, 164)
                ->generate($id, storage_path("app/{$filePath}"));
        }

        // Get the PNG content
        $qrCode = Storage::get($filePath);

        // Encode PNG to base64 so DomPDF can render it
        $qrBase64 = 'data:image/png;base64,' . base64_encode($qrCode);

        // Load the PDF view
        $pdf = Pdf::loadView('pdf.qr', [
            'qrUrl' => $qrBase64,
            'id'    => $id,
        ]);

        // Force download
        return $pdf->download("qr_applicant_{$id}.pdf");
    }
}
