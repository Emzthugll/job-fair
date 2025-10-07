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

        // Read the SVG from storage
        $qrCode = Storage::get($filePath);

        // Load into PDF view
        $pdf = Pdf::loadView('pdf.qr', [
            'qrCode' => $qrCode,
            'id'     => $id
        ]);

        // Force download
        return $pdf->download("qr_applicant_{$id}.pdf");
    }
}
