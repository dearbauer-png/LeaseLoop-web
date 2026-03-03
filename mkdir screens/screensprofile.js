cat > screens/profile.js << 'EOF'
function createProfileScreen() {
  const screen = document.createElement('div');
  screen.id = 'profile-screen';

  screen.innerHTML = `
    <div class="container">
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar">👤</div>
          <div class="profile-name">John Student</div>
          <div style="color: #999; font-size: 14px;">student@university.edu</div>
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-number">3</div>
            <div style="font-size: 12px; color: #999; text-transform: uppercase;">Listings</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-number">12</div>
            <div style="font-size: 12px; color: #999; text-transform: uppercase;">Saved</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-number">8</div>
            <div style="font-size: 12px; color: #999; text-transform: uppercase;">Messages</div>
          </div>
        </div>
        <div style="margin-bottom: 24px;">
          <h3 style="font-weight: 600; margin-bottom: 16px; border-bottom: 1px solid #E8E8E8; padding-bottom: 8px;">About</h3>
          <p><strong>Year:</strong> Junior</p>
          <p><strong>Major:</strong> Computer Science</p>
          <p><strong>Bio:</strong> Love exploring campus housing!</p>
        </div>
        <button class="btn btn-primary" style="width: 100%;">Edit Profile</button>
      </div>
    </div>
  `;

  return screen;
}
EOF