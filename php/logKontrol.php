<?php
// Basit giriş kontrolü
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $kullanici = isset($_POST['kullanici']) ? trim($_POST['kullanici']) : '';
    $sifre = isset($_POST['sifre']) ? trim($_POST['sifre']) : '';

    // Örnek kullanıcı bilgileri
    $dogruKullanici = 'zulal';
    $dogruSifre = '1234';

    if ($kullanici === $dogruKullanici && $sifre === $dogruSifre) {
        header('Location: ../index.html');
        exit;
    } else {
        echo '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Hata</title><link rel="stylesheet" href="../css/style.css"></head><body>';
        echo '<div class="login-page"><div class="login-card" style="text-align:center;">';
        echo '<h2>Giriş Başarısız</h2>';
        echo '<p style="color:#8a8a8a; margin:1rem 0;">Kullanıcı adı veya şifre hatalı.</p>';
        echo '<a href="../login.html" class="hero-btn">Tekrar Dene</a>';
        echo '</div></div></body></html>';
    }
} else {
    header('Location: ../login.html');
    exit;
}
?>
