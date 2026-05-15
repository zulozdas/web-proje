<?php
// Basit giriş kontrolü
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $kullanici = isset($_POST['kullanici']) ? trim($_POST['kullanici']) : '';
    $sifre = isset($_POST['sifre']) ? trim($_POST['sifre']) : '';

    // Sadece b251210034@sakarya.edu.tr ve b251210034 ile girişe izin ver
    if ($kullanici === 'b251210034@sakarya.edu.tr' && $sifre === 'b251210034') {
        $ogrenciNo = 'b251210034';
        
        if (true) {
            echo '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Giriş Başarılı</title>';
            echo '<!-- Bootstrap 5 CSS --><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">';
            echo '<link rel="stylesheet" href="../css/style.css">';
            echo '<!-- Font Awesome --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';
            echo '</head><body>';
            
            // Navbar
            echo '<header><nav class="navbar"><div class="nav-container"><span class="nav-logo">ZÜLAL ÖZDAŞ</span>';
            echo '<button class="hamburger" id="hamburger" aria-label="Menü"><span></span><span></span><span></span></button>';
            echo '<ul class="nav-links" id="navLinks">';
            echo '<li><a href="../index.html">Ana Sayfa</a></li>';
            echo '<li><a href="../hobilerim.html">İlgi Alanlarım</a></li>';
            echo '<li><a href="../cv.html">CV</a></li>';
            echo '<li><a href="../sehrım.html">Şehrim</a></li>';
            echo '<li><a href="../mirasimiz.html">Mirasımız</a></li>';
            echo '<li><a href="../iletisim.html">İletişim</a></li>';
            echo '<li><a href="../login.html" class="active">Giriş</a></li>';
            echo '</ul></div></nav></header>';

            echo '<div class="login-page"><div class="login-card" style="text-align:center;">';
            echo '<h2>Giriş Başarılı</h2>';
            echo '<p style="color:#8a8a8a; margin:1rem 0; font-size:1.2rem;">Hoşgeldiniz ' . htmlspecialchars($ogrenciNo) . '</p>';
            echo '<a href="../index.html" class="hero-btn" style="display:inline-block; margin-top:1rem; padding:0.8rem 1.5rem; background-color:#9c8574; color:#fff; text-decoration:none; border-radius:5px;">Ana ekrana geri dön</a>';
            echo '</div></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script><script src="../js/main.js"></script></body></html>';
            exit;
        }
    }

    // Hatalı veya boş ise yönlendir
    header('Location: ../login.html?error=1');
    exit;
} else {
    header('Location: ../login.html');
    exit;
}
?>
