cat > components/listing-card.js << 'EOF'
function createListingCard(listing) {
  const card = document.createElement('div');
  card.className = 'listing-card';
  const isSaved = StorageHelper.isSaved(listing.id);

  card.innerHTML = `
    <div class="listing-image">${listing.image}</div>
    <div class="listing-content">
      <div class="listing-header">
        <span class="listing-type">${listing.type.replace('-', ' ')}</span>
        <i class="far fa-heart listing-heart ${isSaved ? 'active' : ''}" onclick="toggleSave(event, ${listing.id})"></i>
      </div>
      <div class="listing-title">${listing.title}</div>
      <div class="listing-price">${formatPrice(listing.price)}</div>
      <div class="listing-meta">
        <span>${listing.bedrooms}br</span>
        <span>${listing.bathrooms}ba</span>
        <span>${listing.distance}mi</span>
      </div>
      <div class="listing-description">${listing.description}</div>
      <div class="listing-footer">
        <span style="font-size: 13px; color: #999;">by ${listing.postedBy}</span>
        <button class="btn-view" onclick="viewDetail(${listing.id})">View</button>
      </div>
    </div>
  `;

  return card;
}

function toggleSave(event, id) {
  event.stopPropagation();
  const heart = event.target;
  if (StorageHelper.isSaved(id)) {
    StorageHelper.unsaveListing(id);
    heart.classList.remove('active');
  } else {
    StorageHelper.saveListing(id);
    heart.classList.add('active');
  }
}

function viewDetail(id) {
  currentDetailListingId = id;
  showScreen('detail');
}
EOF