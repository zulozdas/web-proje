// ===== Form Doğrulama (Validation) =====
document.addEventListener('DOMContentLoaded', function () {

  // İletişim Formu
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var valid = true;

      var ad = document.getElementById('ad');
      var soyad = document.getElementById('soyad');
      var email = document.getElementById('email');
      var mesaj = document.getElementById('mesaj');

      // Ad kontrolü
      if (!ad.value.trim()) {
        document.getElementById('adError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('adError').classList.remove('show');
      }

      // Soyad kontrolü
      if (!soyad.value.trim()) {
        document.getElementById('soyadError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('soyadError').classList.remove('show');
      }

      // E-posta kontrolü
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById('emailError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('emailError').classList.remove('show');
      }

      // Mesaj kontrolü
      if (!mesaj.value.trim()) {
        document.getElementById('mesajError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('mesajError').classList.remove('show');
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // Login Formu
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      var valid = true;

      var kullanici = document.getElementById('kullanici');
      var sifre = document.getElementById('sifre');

      if (!kullanici.value.trim()) {
        document.getElementById('kullaniciError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('kullaniciError').classList.remove('show');
      }

      if (!sifre.value.trim()) {
        document.getElementById('sifreError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('sifreError').classList.remove('show');
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }
});
