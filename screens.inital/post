cat > screens/post.js << 'EOF'
function createPostScreen() {
  const screen = document.createElement('div');
  screen.id = 'post-screen';

  screen.innerHTML = `
    <div class="container">
      <form class="post-form" onsubmit="submitListing(event)">
        <h2>Post a Listing</h2>
        <div class="form-section">
          <h3>Listing Type</h3>
          <div class="form-group">
            <label>What are you posting?</label>
            <select id="post-type" required>
              <option value="">Select...</option>
              <option value="sublease">Sublease</option>
              <option value="roommate">Roommate</option>
              <option value="home-sale">Home for Sale</option>
              <option value="new-build">New Build</option>
            </select>
          </div>
          <div class="form-group">
            <label>Campus</label>
            <select id="post-campus" required>
              <option value="">Select...</option>
              ${CAMPUSES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-section">
          <h3>Details</h3>
          <div class="form-group">
            <label>Title</label>
            <input type="text" id="post-title" placeholder="e.g., Modern 2BR Apartment" required>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" id="post-price" placeholder="0" required>
          </div>
          <div class="form-group">
            <label>Bedrooms</label>
            <input type="number" id="post-bedrooms" min="1" value="1" required>
          </div>
          <div class="form-group">
            <label>Bathrooms</label>
            <input type="number" id="post-bathrooms" min="1" value="1" step="0.5" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea id="post-description" placeholder="Tell us about your listing..." required></textarea>
          </div>
        </div>
        <button type="submit" class="btn-submit">Post Listing</button>
      </form>
    </div>
  `;

  return screen;
}

function submitListing(event) {
  event.preventDefault();
  const newListing = {
    id: SAMPLE_LISTINGS.length + 1,
    title: document.getElementById('post-title').value,
    type: document.getElementById('post-type').value,
    campus: document.getElementById('post-campus').value,
    price: parseInt(document.getElementById('post-price').value),
    bedrooms: parseInt(document.getElementById('post-bedrooms').value),
    bathrooms: parseInt(document.getElementById('post-bathrooms').value),
    description: document.getElementById('post-description').value,
    image: '📍',
    distance: 0.5,
    postedBy: 'You',
    date: 'Today',
  };

  SAMPLE_LISTINGS.push(newListing);
  alert('Listing posted! 🎉');
  showScreen('home');
  applyFilters();
}
EOF