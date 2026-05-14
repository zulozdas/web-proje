<?php
// İletişim formu işleme
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Formdan gelen verileri al ve temizle
    $ad = isset($_POST['ad']) ? htmlspecialchars(trim($_POST['ad'])) : '';
    $soyad = isset($_POST['soyad']) ? htmlspecialchars(trim($_POST['soyad'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $telefon = isset($_POST['telefon']) ? htmlspecialchars(trim($_POST['telefon'])) : '';
    $cinsiyet = isset($_POST['cinsiyet']) ? htmlspecialchars(trim($_POST['cinsiyet'])) : 'Belirtilmedi';
    $sehir = isset($_POST['sehir']) ? htmlspecialchars(trim($_POST['sehir'])) : 'Belirtilmedi';
    $universite = isset($_POST['universite']) ? htmlspecialchars(trim($_POST['universite'])) : 'Belirtilmedi';
    $mesaj = isset($_POST['mesaj']) ? htmlspecialchars(trim($_POST['mesaj'])) : '';

    // Basit sunucu taraflı doğrulama
    if (empty($ad) || empty($soyad) || empty($email) || empty($mesaj)) {
        header('Location: ../iletisim.html');
        exit;
    }

    // Başarılı mesaj ekranı (Görsele göre tasarlandı)
    ?>
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mesajınız Alındı</title>
        <link rel="stylesheet" href="../css/style.css">
        <style>
            body {
                background-color: #d9cfb3; /* Görseldeki arka plan rengi */
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
            }
            .success-card {
                background: #f9f7f2;
                max-width: 600px;
                width: 100%;
                padding: 3rem;
                border-radius: 30px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.1);
                text-align: center;
            }
            .success-card h1 {
                font-family: 'Playfair Display', serif;
                font-size: 2.8rem;
                color: #4a3f35;
                margin-bottom: 2rem;
            }
            .info-box {
                background: #eeebe1;
                border-radius: 15px;
                padding: 2rem;
                text-align: left;
                margin-bottom: 2rem;
            }
            .info-box p {
                font-size: 1rem;
                color: #7a7a7a;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid #ddd9cc;
                padding-bottom: 0.8rem;
            }
            .info-item {
                margin-bottom: 0.8rem;
                font-size: 1rem;
                line-height: 1.5;
            }
            .info-label {
                font-weight: 700;
                color: #8c7352; /* Görseldeki kahverengi tonu */
                margin-right: 5px;
            }
            .info-value {
                color: #4a3f35;
            }
            .btn-back {
                display: inline-block;
                padding: 15px 50px;
                background-color: #4a3f35;
                color: #fff;
                text-decoration: none;
                border-radius: 30px;
                font-weight: 600;
                transition: transform 0.3s, background 0.3s;
            }
            .btn-back:hover {
                background-color: #5d5044;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="success-card">
            <h1>Mesajınız Alındı</h1>
            
            <div class="info-box">
                <p>Sunucuya (PHP) ulaşan bilgileriniz aşağıdadır:</p>
                
                <div class="info-item">
                    <span class="info-label">Ad Soyad:</span>
                    <span class="info-value"><?php echo $ad . ' ' . $soyad; ?></span>
                </div>
                <div class="info-item">
                    <span class="info-label">E-posta:</span>
                    <span class="info-value"><?php echo $email; ?></span>
                </div>
                <div class="info-item">
                    <span class="info-label">Telefon:</span>
                    <span class="info-value"><?php echo $telefon; ?></span>
                </div>
                <div class="info-item">
                    <span class="info-label">Şehir:</span>
                    <span class="info-value"><?php echo $sehir; ?></span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cinsiyet:</span>
                    <span class="info-value"><?php echo $cinsiyet; ?></span>
                </div>
                <div class="info-item">
                    <span class="info-label">Mesaj:</span>
                    <span class="info-value"><?php echo $mesaj; ?></span>
                </div>
            </div>

            <a href="../iletisim.html" class="btn-back">Geri Dön</a>
        </div>
    </body>
    </html>
    <?php
} else {
    header('Location: ../iletisim.html');
    exit;
}
?>
