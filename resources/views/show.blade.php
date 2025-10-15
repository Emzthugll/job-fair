<!DOCTYPE html>
<html>
<head>
    <title>QR Code Display</title>
    <style>
        body { font-family: sans-serif; text-align: center; margin-top: 60px; }
        img { border: 2px solid #ccc; border-radius: 10px; padding: 10px; }
        a { display: inline-block; margin-top: 20px; color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h2>Applicant QR Code</h2>
    <img src="{{ $qrUrl }}" width="300" height="300" alt="QR Code">
    <br>
    <a href="{{ route('qr.download', $id) }}">Download as PDF</a>
</body>
</html>
