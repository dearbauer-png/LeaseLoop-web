cat > screens/detail.js << 'EOF'
let currentDetailListingId = null;

function createDetailScreen() {
  const screen = document.createElement('div');
  screen.id = 'detail-screen';

  screen.innerHTML = `
    <div class="container">
      <div class="detail-screen">
        <div class="detail-header">
          <button class="detail-back-btn" onclick="showScreen('home')">← Back</button>
        </div>
        <div id="detail-content"></div>
      </div>
    </div>
  `;

  return screen;
}

function renderDetailScreen(id) {
  const listing = SAMPLE_LISTINGS.find(l => l.id === id);
  if (!listing) return;

  const content = document.getElementById('detail-content');
  content.innerHTML = `
    <div class="detail-image">${listing.image}</div>
    <div class="detail-body">
      <h2>${listing.title}</h2>
      <div style="color: #999; margin-bottom: 16px;">by ${listing.postedBy} • ${listing.date}</div>
      <h3>${formatPrice(listing.price)}</h3>
      <p>${listing.bedrooms} Bedrooms • ${listing.bathrooms} Bathrooms • ${listing.distance} miles away</p>
      <h3>Description</h3>
      <p>${listing.description}</p>
      <h3>Details</h3>
      <p><strong>Type:</strong> ${listing.type.replace('-', ' ')}</p>
      <p><strong>Distance from Campus:</strong> ${listing.distance} miles</p>
      <div class="detail-cta">
        <button class="btn-message" onclick="showScreen('messages')">💬 Message</button>
        <button class="btn-message" style="background: #10B981;" onclick="saveListing(${id})">❤️ Save</button>
      </div>
    </div>
  `;
}

function saveListing(id) {
  StorageHelper.saveListing(id);
  alert('Added to saved listings!');
}
EOF