<?php
// İletişim formu işleme
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ad = isset($_POST['ad']) ? htmlspecialchars(trim($_POST['ad'])) : '';
    $soyad = isset($_POST['soyad']) ? htmlspecialchars(trim($_POST['soyad'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $konu = isset($_POST['konu']) ? htmlspecialchars(trim($_POST['konu'])) : '';
    $mesaj = isset($_POST['mesaj']) ? htmlspecialchars(trim($_POST['mesaj'])) : '';

    // Basit doğrulama
    if (empty($ad) || empty($soyad) || empty($email) || empty($mesaj)) {
        echo '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Hata</title><link rel="stylesheet" href="../css/style.css"></head><body>';
        echo '<div class="login-page"><div class="login-card" style="text-align:center;">';
        echo '<h2>Eksik Bilgi</h2>';
        echo '<p style="color:#8a8a8a; margin:1rem 0;">Lütfen tüm zorunlu alanları doldurun.</p>';
        echo '<a href="../iletisim.html" class="hero-btn">Geri Dön</a>';
        echo '</div></div></body></html>';
        exit;
    }

    // Başarılı mesaj
    echo '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Başarılı</title><link rel="stylesheet" href="../css/style.css"></head><body>';
    echo '<div class="login-page"><div class="login-card" style="text-align:center;">';
    echo '<h2>Mesajınız Alındı ✓</h2>';
    echo '<p style="color:#8a8a8a; margin:1rem 0;">Teşekkürler, ' . $ad . '! En kısa sürede size dönüş yapacağım.</p>';
    echo '<a href="../index.html" class="hero-btn">Ana Sayfaya Dön</a>';
    echo '</div></div></body></html>';
} else {
    header('Location: ../iletisim.html');
    exit;
}
?>
