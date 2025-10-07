<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Applicant QR Code</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; }
        h2 { color: #033284; }
        p { font-size: 16px; color: #333; }
        .qr { margin-top: 40px; }
    </style>
</head>
<body>
    <h2>Applicant QR Code</h2>
    <p>ID: {{ $id }}</p>
    <div class="qr">
        <img src="{{ $qrUrl }}" width="300" height="300" alt="QR Code">
    </div>
</body>
</html>
