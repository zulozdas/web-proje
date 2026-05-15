// ===== Hamburger Menü =====
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // ===== Hava Durumu API (İzmit) =====
  var weatherContainer = document.getElementById('weather-container');
  if (weatherContainer) {
    fetchIzmitWeather();
  }

  async function fetchIzmitWeather() {
    try {
      // İzmit koordinatları: Enlem: 40.7667, Boylam: 29.9167
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7667&longitude=29.9167&current_weather=true');
      const data = await response.json();
      
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;
      const isDay = data.current_weather.is_day;
      
      const { description, icon } = getWeatherDetails(code, isDay);
      
      weatherContainer.innerHTML = `
        <div class="weather-info">
          <div class="weather-city">İzmit</div>
          <div class="weather-desc">${description}</div>
        </div>
        <div class="weather-temp-container">
          <div class="weather-icon">${icon}</div>
          <div class="weather-temp">${temp}°C</div>
        </div>
      `;
    } catch (error) {
      weatherContainer.innerHTML = `<div class="weather-loading">Hava durumu yüklenemedi.</div>`;
      console.error('Hava durumu hatası:', error);
    }
  }

  function getWeatherDetails(code, isDay) {
    // WMO Weather interpretation codes
    const wmoCodes = {
      0: { desc: 'Açık, Güneşli', iconDay: '☀️', iconNight: '🌙' },
      1: { desc: 'Çoğunlukla Açık', iconDay: '🌤️', iconNight: '☁️' },
      2: { desc: 'Parçalı Bulutlu', iconDay: '⛅', iconNight: '☁️' },
      3: { desc: 'Bulutlu', iconDay: '☁️', iconNight: '☁️' },
      45: { desc: 'Sisli', iconDay: '🌫️', iconNight: '🌫️' },
      48: { desc: 'Puslu', iconDay: '🌫️', iconNight: '🌫️' },
      51: { desc: 'Hafif Çisenti', iconDay: '🌦️', iconNight: '🌧️' },
      53: { desc: 'Çisenti', iconDay: '🌧️', iconNight: '🌧️' },
      55: { desc: 'Şiddetli Çisenti', iconDay: '🌧️', iconNight: '🌧️' },
      61: { desc: 'Hafif Yağmurlu', iconDay: '🌦️', iconNight: '🌧️' },
      63: { desc: 'Yağmurlu', iconDay: '🌧️', iconNight: '🌧️' },
      65: { desc: 'Şiddetli Yağmurlu', iconDay: '🌧️', iconNight: '🌧️' },
      71: { desc: 'Hafif Kar Yağışlı', iconDay: '🌨️', iconNight: '🌨️' },
      73: { desc: 'Kar Yağışlı', iconDay: '❄️', iconNight: '❄️' },
      75: { desc: 'Şiddetli Kar Yağışlı', iconDay: '❄️', iconNight: '❄️' },
      77: { desc: 'Kar Taneleri', iconDay: '❄️', iconNight: '❄️' },
      80: { desc: 'Hafif Sağanak', iconDay: '🌦️', iconNight: '🌧️' },
      81: { desc: 'Sağanak Yağışlı', iconDay: '🌧️', iconNight: '🌧️' },
      82: { desc: 'Şiddetli Sağanak', iconDay: '🌧️', iconNight: '🌧️' },
      95: { desc: 'Gökgürültülü Fırtına', iconDay: '⛈️', iconNight: '⛈️' },
      96: { desc: 'Dolu ve Fırtına', iconDay: '⛈️', iconNight: '⛈️' },
      99: { desc: 'Şiddetli Dolu', iconDay: '⛈️', iconNight: '⛈️' }
    };
    
    const condition = wmoCodes[code] || { desc: 'Bilinmiyor', iconDay: '🌡️', iconNight: '🌡️' };
    return {
      description: condition.desc,
      icon: isDay ? condition.iconDay : condition.iconNight
    };
  }

  // ===== NASA APOD API (Ana Sayfa) =====
  var apodContainer = document.getElementById('apod-container');
  if (apodContainer) {
    fetchNasaApod();
  }

  async function fetchNasaApod() {
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      const data = await response.json();
      
      let mediaHtml = '';
      if (data.media_type === 'video') {
        mediaHtml = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        mediaHtml = `<img src="${data.url}" alt="${data.title}">`;
      }
      
      // Tarihi formatla
      const dateParts = data.date.split('-');
      const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
      
      apodContainer.innerHTML = `
        <div class="apod-media">
          ${mediaHtml}
        </div>
        <div class="apod-content">
          <h3 class="apod-title">${data.title}</h3>
          <div class="apod-date">${formattedDate}</div>
          <div class="apod-desc">${data.explanation}</div>
        </div>
      `;
    } catch (error) {
      apodContainer.innerHTML = `<div class="weather-loading" style="padding: 3rem;">Fotoğraf yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>`;
      console.error('NASA APOD hatası:', error);
    }
  }

  // ===== Şehrim Slider =====
  var citySlider = document.getElementById('citySlider');
  if (citySlider) {
    initCitySlider();
  }

  function initCitySlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let autoPlayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Otomatik geçiş
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Buton olayları
    nextBtn.addEventListener('click', function () {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });

    prevBtn.addEventListener('click', function () {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });

    // Nokta tıklamaları
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopAutoPlay();
        goToSlide(parseInt(this.dataset.index));
        startAutoPlay();
      });
    });

    // Klavye desteği
    document.addEventListener('keydown', function (e) {
      if (!citySlider) return;
      if (e.key === 'ArrowLeft') {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      }
    });

    // Dokunmatik (swipe) desteği
    citySlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    citySlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        stopAutoPlay();
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoPlay();
      }
    });

    // Hover'da durdur
    citySlider.addEventListener('mouseenter', stopAutoPlay);
    citySlider.addEventListener('mouseleave', startAutoPlay);

    // Başlat
    startAutoPlay();
  }
});

