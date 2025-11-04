<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $firstname }} {{ $surname }} - QR Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 40px;
            color: #333;
        }
        h1 {
            color: #033284;
            font-size: 24px;
            margin-bottom: 10px;
        }
        h2 {
            font-size: 18px;
            color: #555;
            margin-bottom: 30px;
        }
        .qr {
            margin: 20px 0;
        }
        .details {
            font-size: 16px;
            line-height: 1.6;
            margin-top: 20px;
        }
        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #888;
        }
        img.logo {
            width: 120px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    
    <img class="logo" src="{{ public_path('images/work.png') }}" alt="WorkIn Logo">

    
    <h2>
    {{ $type }}<br>
    <small style="color:#777;">
        Venue: {{ $venue }}<br>
        
    </small>
</h2>

    <div class="qr">
        <img width="220" height="220" src="data:image/png;base64,{{ $qrBase64 }}" alt="QR Code">
    </div>
    <h1>{{ $firstname }} {{ $surname }}</h1>

    <div class="details">
    <p><strong>Instructions:</strong></p>
    <ol style="text-align: left; display: inline-block; margin: 0 auto;">
        <li>Present this QR code at the registration area during the event.</li>
        <li>Ensure that the QR code is clearly visible on your device or printed copy.</li>
        <li>Do not share this QR code with others—it is assigned specifically to your application.</li>
        <li>Follow further instructions from the PESO staff upon arrival.</li>
    </ol>
</div>


    <div class="footer">
        Generated on {{ now()->format('F d, Y h:i A') }}
    </div>
</body>
</html>
