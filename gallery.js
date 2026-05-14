/**
 * Metropolitan Museum of Art API - Claude Monet Gallery
 * Fetches and displays 6 specific masterpieces by Claude Monet
 * Using fixed IDs for maximum reliability and quality.
 */

const MET_API_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

// Specific IDs for iconic Claude Monet paintings in the MET collection
const MONET_IDS = [
    437127, // Bridge over a Pond of Water Lilies
    437128, // Water Lilies
    437125, // The Houses of Parliament (Effect of Fog)
    437122, // Garden at Sainte-Adresse
    437131, // The Manneporte (Étretat)
    437129  // Villas at Bordighera
];

async function fetchMonetArtworks() {
    const galleryContainer = document.getElementById("art-gallery");
    if (!galleryContainer) return;

    try {
        // Fetch all artworks in parallel
        const artworkPromises = MONET_IDS.map(async (id) => {
            try {
                const response = await fetch(`${MET_API_BASE}/objects/${id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return await response.json();
            } catch (e) {
                console.error(`Error fetching object ${id}:`, e);
                return null;
            }
        });

        const artworks = await Promise.all(artworkPromises);
        
        // Filter out any failed requests
        const validArtworks = artworks.filter(art => art && art.primaryImageSmall);

        if (validArtworks.length === 0) {
            throw new Error("No valid artworks loaded");
        }

        // Render the gallery
        renderGallery(validArtworks);

    } catch (error) {
        console.error("Gallery Error:", error);
        galleryContainer.innerHTML = `
            <div class="error-message">
                <p>Eserler yüklenirken bir ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyiniz.</p>
            </div>
        `;
    }
}

function renderGallery(artworks) {
    const galleryContainer = document.getElementById("art-gallery");
    galleryContainer.innerHTML = ""; // Clear loader

    artworks.forEach((art, index) => {
        const card = document.createElement("div");
        card.className = "art-card";
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="art-image-container">
                <img src="${art.primaryImageSmall}" alt="${art.title}" loading="lazy">
                <div class="art-overlay">
                    <span class="view-details">Detayları Gör</span>
                </div>
            </div>
            <div class="art-info">
                <h3>${art.title}</h3>
                <div class="art-meta">
                    <span class="art-year">${art.objectDate || 'Tarih Bilinmiyor'}</span>
                    <span class="art-medium">Tuval Üzerine Yağlı Boya</span>
                </div>
            </div>
        `;

        // Click event to open the MET page for the artwork
        card.addEventListener('click', () => {
            window.open(art.objectURL, '_blank');
        });

        galleryContainer.appendChild(card);
    });
}

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", fetchMonetArtworks);
