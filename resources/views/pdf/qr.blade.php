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
        img { width: 300px; height: 300px; }
    </style>
</head>
<body>
    <h2>Applicant QR Code</h2>
    
    <div class="qr">
        <img src="data:image/png;base64,{{ $qrBase64 }}" alt="QR Code">
    </div>
    <p>ID: {{ $id }}</p>
</body>
</html>
