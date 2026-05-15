// ===== Form Doğrulama (Validation) =====
document.addEventListener('DOMContentLoaded', function () {

  // İletişim Formu
  var btnNative = document.getElementById('btn-native');
  var contactForm = document.getElementById('contactForm');
  if (btnNative && contactForm) {
    btnNative.addEventListener('click', function (e) {
      var valid = true;

      var ad = document.getElementById('ad');
      var soyad = document.getElementById('soyad');
      var email = document.getElementById('email');
      var telefon = document.getElementById('telefon');
      var sehir = document.getElementById('sehir');
      var universite = document.getElementById('universite');
      var mesaj = document.getElementById('mesaj');
      
      // Radio button selection check
      var cinsiyetOptions = document.getElementsByName('cinsiyet');
      var cinsiyetSelected = false;
      for (var i = 0; i < cinsiyetOptions.length; i++) {
        if (cinsiyetOptions[i].checked) {
          cinsiyetSelected = true;
          break;
        }
      }

      // Regex patterns
      var nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/; // Sadece harf ve boşluk
      // Telefon: 5 ile başlamalı ve toplam 10 hane olmalı
      var phoneRegex = /^5[0-9]{9}$/; 
      // E-posta: Standart format + yaygın servis sağlayıcıları kontrolü
      var emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|icloud\.com|yahoo\.com|windowslive\.com|sakarya\.edu\.tr|edu\.tr)$/;

      // Ad kontrolü
      if (!ad.value.trim() || !nameRegex.test(ad.value)) {
        document.getElementById('adError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('adError').classList.remove('show');
      }

      // Soyad kontrolü
      if (!soyad.value.trim() || !nameRegex.test(soyad.value)) {
        document.getElementById('soyadError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('soyadError').classList.remove('show');
      }

      // E-posta kontrolü
      if (!email.value.trim() || !emailRegex.test(email.value.toLowerCase())) {
        document.getElementById('emailError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('emailError').classList.remove('show');
      }

      // Telefon kontrolü
      var phoneValue = telefon.value.replace(/\s/g, ''); // Boşlukları temizle
      if (!phoneValue || !phoneRegex.test(phoneValue)) {
        document.getElementById('telefonError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('telefonError').classList.remove('show');
      }

      // Cinsiyet kontrolü
      if (!cinsiyetSelected) {
        document.getElementById('cinsiyetError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('cinsiyetError').classList.remove('show');
      }

      // Şehir kontrolü
      if (!sehir.value) {
        document.getElementById('sehirError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('sehirError').classList.remove('show');
      }

      // Üniversite kontrolü
      if (!universite.value) {
        document.getElementById('universiteError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('universiteError').classList.remove('show');
      }

      // Mesaj kontrolü
      if (!mesaj.value.trim()) {
        document.getElementById('mesajError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('mesajError').classList.remove('show');
      }

      // Koşul kontrolü
      var kosul = document.getElementById('kosul');
      if (!kosul.checked) {
        document.getElementById('kosulError').classList.add('show');
        valid = false;
      } else {
        document.getElementById('kosulError').classList.remove('show');
      }

      if (valid) {
        contactForm.submit();
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
