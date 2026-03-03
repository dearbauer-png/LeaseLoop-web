cat > utils/helpers.js << 'EOF'
class StorageHelper {
  static getSavedListings() {
    const saved = localStorage.getItem('savedListings');
    return saved ? JSON.parse(saved) : [];
  }

  static saveListing(id) {
    const saved = this.getSavedListings();
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem('savedListings', JSON.stringify(saved));
    }
  }

  static unsaveListing(id) {
    const saved = this.getSavedListings();
    const filtered = saved.filter(s => s !== id);
    localStorage.setItem('savedListings', JSON.stringify(filtered));
  }

  static isSaved(id) {
    return this.getSavedListings().includes(id);
  }
}

function formatPrice(price) {
  if (price >= 100000) {
    return `$${(price / 1000).toFixed(0)}k`;
  }
  return `$${price.toLocaleString()}`;
}

function filterListings(listings, filters) {
  return listings.filter(listing => {
    if (filters.campus && listing.campus !== filters.campus) return false;
    if (filters.type && listing.type !== filters.type) return false;
    if (filters.minPrice && listing.price < filters.minPrice) return false;
    if (filters.maxPrice && listing.price > filters.maxPrice) return false;
    return true;
  });
}

function sortListings(listings, sortBy) {
  const sorted = [...listings];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'distance':
      return sorted.sort((a, b) => a.distance - b.distance);
    default:
      return sorted;
  }
}
EOF