const artGallery = document.getElementById('art-gallery');

async function fetchMonetArt() {
    try {
        // Cleveland Museum of Art API - Claude Monet araması
        const response = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?q=Claude Monet&limit=12&has_image=1');
        const data = await response.json();

        // Yükleniyor yazısını temizle
        artGallery.innerHTML = '';

        data.data.forEach(artwork => {
            // Sadece görseli olanları ekle
            if (artwork.images && artwork.images.web) {
                const card = document.createElement('div');
                card.style.cssText = `
                    background: #fff;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease;
                `;

                card.innerHTML = `
                    <img src="${artwork.images.web.url}" alt="${artwork.title}" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 15px;">
                        <h3 style="font-size: 16px; margin: 0 0 5px 0; color: #333;">${artwork.title}</h3>
                        <p style="font-size: 13px; color: #777; margin: 0;">${artwork.creation_date || 'Tarih belirtilmemiş'}</p>
                    </div>
                `;

                // Hover efekti için küçük bir dokunuş
                card.onmouseenter = () => card.style.transform = 'translateY(-5px)';
                card.onmouseleave = () => card.style.transform = 'translateY(0)';

                artGallery.appendChild(card);
            }
        });

        if (artGallery.innerHTML === '') {
            artGallery.innerHTML = '<p style="text-align:center; width:100%;">Görüntülenecek eser bulunamadı.</p>';
        }

    } catch (error) {
        console.error("API Hatası:", error);
        artGallery.innerHTML = '<p style="text-align:center; width:100%; color: red;">Galeri yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edin.</p>';
    }
}

// Sayfa yüklendiğinde çalıştır
fetchMonetArt();