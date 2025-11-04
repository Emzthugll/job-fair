<?php

namespace App\Http\Controllers;

use App\Models\ApplicantProfile;
use App\Models\RecruitmentActivity;
use App\Models\JobfairRecruitmentAttendee;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    public function download($token, Request $request)
    {
        try {
            // Find applicant by QR token
            $applicant = ApplicantProfile::where('qr_token', $token)->firstOrFail();

            // Get event_id from query string
            $eventId = $request->query('event_id');
            if (!$eventId) {
                return response()->json([
                    'error' => 'Event ID is missing from URL.',
                ], 400);
            }

            // Fetch the recruitment activity
            $activity = RecruitmentActivity::find($eventId);
            if (!$activity) {
                return response()->json([
                    'error' => 'Recruitment activity not found for this event ID.',
                ], 404);
            }

            $activityType = $activity->type;
            $activityVenue = $activity->venue;

            // Generate QR code image
            $directory = 'public/qrcodes';
            if (!Storage::exists($directory)) {
                Storage::makeDirectory($directory);
            }

            $filePath = "{$directory}/qr_{$token}.png";

            $qrPng = QrCode::format('png')
                ->size(300)
                ->color(0, 0, 0)
                ->backgroundColor(255, 255, 255)
                ->generate($applicant->qr_token);

            Storage::put($filePath, $qrPng);

            $qrBase64 = base64_encode($qrPng);

            // Generate PDF
            $pdf = Pdf::loadView('pdf.qr', [
                'token' => $applicant->qr_token,
                'qrBase64' => $qrBase64,
                'firstname' => $applicant->firstname,
                'surname' => $applicant->surname,
                'type' => $activityType,
                'venue' => $activityVenue,
                'event_id' => $eventId,
            ]);

            $fileName = "Applicant_{$applicant->firstname}_{$applicant->surname}_QR.pdf";
            return $pdf->download($fileName);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
            ]);
        }
    }
}
