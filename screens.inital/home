cat > screens/home.js << 'EOF'
function createHomeScreen() {
  const screen = document.createElement('div');
  screen.id = 'home-screen';

  screen.innerHTML = `
    <div class="container">
      <div class="campus-picker">
        <label class="campus-picker-label">Select Your Campus</label>
        <select id="campus-select" onchange="applyFilters()">
          <option value="">All Campuses</option>
          ${CAMPUSES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
      </div>
    </div>
  `;

  return screen;
}

function renderListings(listings) {
  let container = document.getElementById('listings-container');
  if (!container) {
    const section = document.createElement('div');
    section.className = 'container';
    section.innerHTML = '<div id="listings-container" class="listings-grid"></div>';
    document.getElementById('home-screen').appendChild(section);
    container = document.getElementById('listings-container');
  }

  container.innerHTML = '';
  if (listings.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; padding: 48px; text-align: center;">No listings found</p>';
  } else {
    listings.forEach(listing => {
      container.appendChild(createListingCard(listing));
    });
  }
}
EOF