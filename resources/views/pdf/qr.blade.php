<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $firstname}} {{ $surname}} QR Code</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; }
        h2 { color: #033284; }
        p { font-size: 16px; color: #333; }
        .qr { margin-top: 10px; } 
      
        
    </style>
</head>
<body>
    <img height="90" width="250"  src="images/work.png" alt="">
    <div class="qr">
        <img width="250" height="250" src="data:image/png;base64,{{ $qrBase64 }}" alt="QR Code">
    </div>
    <h2>{{$firstname}} {{$surname}}'s QR Code</h2>
    
</body>
</html>
