cat > components/filters.js << 'EOF'
function createFilters() {
  const filtersDiv = document.createElement('div');
  filtersDiv.className = 'filters-container';

  filtersDiv.innerHTML = `
    <h3 class="filters-title">Filter & Sort</h3>
    <div class="filters-grid">
      <div class="filter-group">
        <label>Type</label>
        <select id="filter-type">
          <option value="">All Types</option>
          <option value="sublease">Subleases</option>
          <option value="roommate">Roommates</option>
          <option value="home-sale">Homes for Sale</option>
          <option value="new-build">New Builds</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Min Price</label>
        <input type="number" id="filter-min-price" placeholder="0">
      </div>
      <div class="filter-group">
        <label>Max Price</label>
        <input type="number" id="filter-max-price" placeholder="999999">
      </div>
      <div class="filter-group">
        <label>Sort By</label>
        <select id="filter-sort">
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="distance">Distance</option>
        </select>
      </div>
    </div>
    <div class="filter-buttons">
      <button class="btn btn-primary" onclick="applyFilters()">Apply Filters</button>
      <button class="btn btn-secondary" onclick="clearFilters()">Reset</button>
    </div>
  `;

  return filtersDiv;
}

function applyFilters() {
  const campus = document.getElementById('campus-select')?.value || '';
  const type = document.getElementById('filter-type')?.value || '';
  const minPrice = parseInt(document.getElementById('filter-min-price')?.value) || 0;
  const maxPrice = parseInt(document.getElementById('filter-max-price')?.value) || 999999;
  const sort = document.getElementById('filter-sort')?.value || 'newest';

  let filtered = filterListings(SAMPLE_LISTINGS, {
    campus: campus || null,
    type: type || null,
    minPrice,
    maxPrice,
  });

  const sorted = sortListings(filtered, sort);
  renderListings(sorted);
}

function clearFilters() {
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-min-price').value = '';
  document.getElementById('filter-max-price').value = '';
  document.getElementById('filter-sort').value = 'newest';
  applyFilters();
}
EOF