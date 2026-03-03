cat > app.js << 'EOF'
let currentScreen = 'home';
const screens = {};

function initializeApp() {
  const app = document.getElementById('app');
  
  app.appendChild(createNavbar());

  screens.home = createHomeScreen();
  screens.detail = createDetailScreen();
  screens.post = createPostScreen();
  screens.saved = createSavedScreen();
  screens.messages = createMessagesScreen();
  screens.profile = createProfileScreen();

  const container = screens.home.querySelector('.container');
  container.appendChild(createFilters());

  Object.values(screens).forEach(screen => {
    app.appendChild(screen);
    screen.style.display = 'none';
  });

  showScreen('home');
  applyFilters();
}

function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    screen.style.display = 'none';
  });

  screens[screenName].style.display = 'block';
  currentScreen = screenName;

  if (screenName === 'saved') {
    renderSavedListings();
  } else if (screenName === 'detail') {
    renderDetailScreen(currentDetailListingId);
  }

  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', initializeApp);
EOF