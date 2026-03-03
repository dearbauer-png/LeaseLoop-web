cat > screens/saved.js << 'EOF'
function createSavedScreen() {
  const screen = document.createElement('div');
  screen.id = 'saved-screen';

  screen.innerHTML = `
    <div class="container">
      <div class="saved-container">
        <h2 style="margin-bottom: 24px;">Saved Listings</h2>
        <div id="saved-listings" class="listings-grid"></div>
      </div>
    </div>
  `;

  return screen;
}

function renderSavedListings() {
  const saved = StorageHelper.getSavedListings();
  const savedListings = SAMPLE_LISTINGS.filter(l => saved.includes(l.id));
  const container = document.getElementById('saved-listings');

  if (container) {
    container.innerHTML = '';
    if (savedListings.length === 0) {
      container.innerHTML = `
        <div class="saved-empty" style="grid-column: 1/-1;">
          <i class="far fa-heart"></i>
          <p>No saved listings yet</p>
          <p style="font-size: 14px; margin-top: 8px;">Start saving your favorite listings!</p>
        </div>
      `;
    } else {
      savedListings.forEach(listing => {
        container.appendChild(createListingCard(listing));
      });
    }
  }
}
EOF