cat > components/navbar.js << 'EOF'
function createNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';

  navbar.innerHTML = `
    <div class="navbar-container">
      <a href="#" class="navbar-brand">🔄 LeaseLoop</a>
      <ul class="navbar-links">
        <li><a href="#" onclick="showScreen('home'); return false;">Home</a></li>
        <li><a href="#" onclick="showScreen('saved'); return false;">Saved</a></li>
        <li><a href="#" onclick="showScreen('messages'); return false;">Messages</a></li>
        <li><a href="#" onclick="showScreen('profile'); return false;">Profile</a></li>
        <li><button onclick="showScreen('post')" class="btn btn-primary">+ Post</button></li>
      </ul>
    </div>
  `;

  return navbar;
}
EOF