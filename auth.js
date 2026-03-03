/* ============================================================
   LeaseLoop — Auth System (localStorage-backed)
   ============================================================ */

const AUTH_KEY   = 'll_users';
const SESSION_KEY= 'll_session';
const CAMPUS_KEY = 'll_campus';
const SAVED_KEY  = 'll_saved';
const LISTING_KEY= 'll_user_listings';
const ROOMMATE_KEY='ll_roommate_profile';
const LIKES_KEY  = 'll_rm_likes';
const PASSES_KEY = 'll_rm_passes';

/* ── Campus helpers ───────────────────────────────────────── */
function getCurrentCampus() {
  return localStorage.getItem(CAMPUS_KEY) || 'UT Austin';
}
function setCurrentCampus(c) {
  localStorage.setItem(CAMPUS_KEY, c);
}

/* ── User store ───────────────────────────────────────────── */
function getAllUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); }
  catch { return []; }
}
function saveAllUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

/* ── Session ──────────────────────────────────────────────── */
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}
function setCurrentUser(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else       localStorage.removeItem(SESSION_KEY);
}

/* ── Register ─────────────────────────────────────────────── */
function register(data) {
  const users = getAllUsers();
  if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, error: 'An account with this email already exists.' };
  }
  const user = {
    id:           'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    name:         data.name.trim(),
    email:        data.email.trim().toLowerCase(),
    password:     data.password,           // plaintext for demo
    type:         data.type,               // 'student' | 'realtor'
    campus:       data.campus || 'UT Austin',
    phone:        data.phone  || '',
    major:        data.major  || '',
    year:         data.year   || '',
    agency:       data.agency || '',
    licenseNum:   data.licenseNum || '',
    bio:          '',
    createdAt:    new Date().toISOString(),
  };
  users.push(user);
  saveAllUsers(users);
  setCurrentUser(user);
  setCurrentCampus(user.campus);
  return { ok: true, user };
}

/* ── Login ────────────────────────────────────────────────── */
function login(email, password) {
  const users = getAllUsers();
  const user  = users.find(u => u.email === email.trim().toLowerCase());
  if (!user)            return { ok: false, error: 'No account found with this email.' };
  if (user.password !== password) return { ok: false, error: 'Incorrect password.' };
  setCurrentUser(user);
  setCurrentCampus(user.campus);
  return { ok: true, user };
}

/* ── Logout ───────────────────────────────────────────────── */
function logout() {
  setCurrentUser(null);
  window.location.href = 'index.html';
}

/* ── Update profile ───────────────────────────────────────── */
function updateProfile(updates) {
  const current = getCurrentUser();
  if (!current) return;
  const users   = getAllUsers();
  const idx     = users.findIndex(u => u.id === current.id);
  if (idx === -1) return;
  const updated = Object.assign({}, users[idx], updates);
  users[idx]    = updated;
  saveAllUsers(users);
  setCurrentUser(updated);
  return updated;
}

/* ── Saved listings ───────────────────────────────────────── */
function getSavedIds() {
  const u = getCurrentUser();
  const key = u ? `${SAVED_KEY}_${u.id}` : SAVED_KEY;
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
}
function setSavedIds(ids) {
  const u = getCurrentUser();
  const key = u ? `${SAVED_KEY}_${u.id}` : SAVED_KEY;
  localStorage.setItem(key, JSON.stringify(ids));
}
function isSaved(id) { return getSavedIds().includes(id); }
function toggleSave(id) {
  const ids = getSavedIds();
  const idx = ids.indexOf(id);
  if (idx === -1) ids.push(id);
  else ids.splice(idx, 1);
  setSavedIds(ids);
  return idx === -1;
}

/* ── User listings (realtor-posted) ──────────────────────── */
function getUserListings() {
  try { return JSON.parse(localStorage.getItem(LISTING_KEY) || '[]'); }
  catch { return []; }
}
function saveUserListings(arr) {
  localStorage.setItem(LISTING_KEY, JSON.stringify(arr));
}
function addUserListing(listing) {
  const arr = getUserListings();
  arr.unshift(listing);
  saveUserListings(arr);
}
function deleteUserListing(id) {
  const arr = getUserListings().filter(l => l.id !== id);
  saveUserListings(arr);
}
function updateUserListing(id, updates) {
  const arr = getUserListings();
  const idx = arr.findIndex(l => l.id === id);
  if (idx !== -1) { arr[idx] = Object.assign({}, arr[idx], updates); saveUserListings(arr); }
}

/* ── All listings combined ────────────────────────────────── */
function getAllListings() {
  const userListings = getUserListings();
  return [...userListings, ...listings];
}

/* ── Roommate profile ─────────────────────────────────────── */
function getRoommateProfile() {
  const u = getCurrentUser();
  if (!u) return null;
  try { return JSON.parse(localStorage.getItem(`${ROOMMATE_KEY}_${u.id}`)); }
  catch { return null; }
}
function saveRoommateProfile(profile) {
  const u = getCurrentUser();
  if (!u) return;
  localStorage.setItem(`${ROOMMATE_KEY}_${u.id}`, JSON.stringify(profile));
}

/* ── Roommate likes/passes ────────────────────────────────── */
function getRMLikes() {
  const u = getCurrentUser();
  if (!u) return [];
  try { return JSON.parse(localStorage.getItem(`${LIKES_KEY}_${u.id}`) || '[]'); }
  catch { return []; }
}
function getRMPasses() {
  const u = getCurrentUser();
  if (!u) return [];
  try { return JSON.parse(localStorage.getItem(`${PASSES_KEY}_${u.id}`) || '[]'); }
  catch { return []; }
}
function likeRoommate(profileId) {
  const u = getCurrentUser();
  if (!u) return false;
  const likes = getRMLikes();
  if (!likes.includes(profileId)) { likes.push(profileId); localStorage.setItem(`${LIKES_KEY}_${u.id}`, JSON.stringify(likes)); }
  // Check for match: if the other person's likes contain our user id (simulated)
  return true;
}
function passRoommate(profileId) {
  const u = getCurrentUser();
  if (!u) return;
  const passes = getRMPasses();
  if (!passes.includes(profileId)) { passes.push(profileId); localStorage.setItem(`${PASSES_KEY}_${u.id}`, JSON.stringify(passes)); }
}
function getMatches() {
  // Return profiles the user has liked (simulate mutual match with seeded data)
  const liked = getRMLikes();
  return roommateProfiles.filter(p => liked.includes(p.id));
}

/* ── Shared helpers ───────────────────────────────────────── */
function bedroomLabel(n) {
  return n === 0 ? 'Studio' : n === 1 ? '1 Bed' : `${n} Beds`;
}
function renderStars(rating) {
  const full = Math.floor(rating);
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (rating % 1 >= 0.5) s += '½';
  return `<span class="stars">${s}</span> <span class="rating-num">${rating}</span>`;
}

/* ── Inject navbar auth state ─────────────────────────────── */
function initNavbar() {
  const user = getCurrentUser();
  const campus = getCurrentCampus();
  const rightEl = document.getElementById('navbar-right');
  const chipEl  = document.getElementById('campus-chip');
  if (chipEl) {
    const info = CAMPUSES.find(c => c.name === campus);
    chipEl.innerHTML = `<span class="campus-chip-icon">${info ? info.emoji : '🎓'}</span> ${campus} <span style="opacity:.6;font-size:11px;">▼</span>`;
    chipEl.addEventListener('click', openCampusSwitcher);
  }
  if (!rightEl) return;
  if (user) {
    rightEl.innerHTML = `
      <a href="dashboard.html" class="user-avatar-btn" title="${user.name}" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--blue-600),var(--green-600));color:white;font-size:14px;font-weight:700;text-decoration:none;">
        ${user.name.charAt(0).toUpperCase()}
      </a>`;
  } else {
    rightEl.innerHTML = `
      <a href="auth.html" class="btn btn-outline btn-sm">Log In</a>
      <a href="auth.html?tab=register" class="btn btn-green btn-sm">Sign Up</a>`;
  }
}

/* ── Campus Switcher ──────────────────────────────────────── */
function openCampusSwitcher() {
  const existing = document.getElementById('campus-switcher-modal');
  if (existing) existing.remove();

  const current = getCurrentCampus();
  const campusCounts = {};
  getAllListings().forEach(l => { campusCounts[l.campus] = (campusCounts[l.campus] || 0) + 1; });

  const modal = document.createElement('div');
  modal.id = 'campus-switcher-modal';
  modal.className = 'campus-modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Choose your campus');
  modal.innerHTML = `
    <div class="campus-modal">
      <div class="campus-modal-header">
        <h2>🎓 Choose Your Campus</h2>
        <p>Your listings, roommates, and search will be tailored to your campus</p>
      </div>
      <div class="campus-grid-picker">
        ${CAMPUSES.map(c => `
          <button class="campus-option ${c.name === current ? 'selected' : ''}" data-campus="${c.name}" aria-pressed="${c.name === current}">
            <div class="campus-option-emoji">${c.emoji}</div>
            <div class="campus-option-name">${c.name}</div>
            <div class="campus-option-count">${campusCounts[c.name] || 0} listings</div>
          </button>`).join('')}
      </div>
      <div class="campus-modal-footer">
        <button class="btn btn-ghost btn-sm" id="campus-cancel">Cancel</button>
        <button class="btn btn-primary" id="campus-confirm">Set Campus</button>
      </div>
    </div>`;

  let selected = current;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.querySelectorAll('.campus-option').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.campus-option').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
      selected = btn.dataset.campus;
    });
  });

  const close = () => { modal.remove(); document.body.style.overflow = ''; };
  document.getElementById('campus-cancel').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.getElementById('campus-confirm').addEventListener('click', () => {
    setCurrentCampus(selected);
    const user = getCurrentUser();
    if (user) updateProfile({ campus: selected });
    close();
    // Refresh the chip
    const chipEl = document.getElementById('campus-chip');
    if (chipEl) {
      const info = CAMPUSES.find(c => c.name === selected);
      chipEl.innerHTML = `<span class="campus-chip-icon">${info ? info.emoji : '🎓'}</span> ${selected} <span style="opacity:.6;font-size:11px;">▼</span>`;
    }
    if (typeof window.onCampusChange === 'function') window.onCampusChange(selected);
    showToast(`📍 Campus set to ${selected}`);
  });
}

/* ── Toast ────────────────────────────────────────────────── */
function showToast(msg, duration) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration || 2800);
}

/* ── Build listing card ───────────────────────────────────── */
function buildCard(listing, targetPage) {
  const saved = isSaved(listing.id);
  const page  = targetPage || 'details.html';
  const card  = document.createElement('article');
  card.className = 'listing-card';
  card.innerHTML = `
    <a class="card-img-link" href="${page}?id=${listing.id}" aria-label="View ${listing.title}">
      <div class="card-img" role="img" aria-label="${listing.type}">
        <span class="card-icon">${listing.icon || '🏠'}</span>
        <span class="card-badge ${listing.featured ? 'card-badge-featured' : ''}">${listing.type}</span>
      </div>
    </a>
    <div class="card-body">
      <div class="card-top">
        <div>
          <p class="card-price">$${listing.price.toLocaleString()}<span class="card-price-unit">/${listing.priceUnit}</span></p>
          <h3 class="card-title"><a href="${page}?id=${listing.id}">${listing.title}</a></h3>
        </div>
        <button class="save-btn ${saved ? 'saved' : ''}" aria-label="${saved ? 'Unsave' : 'Save'} listing" data-id="${listing.id}">
          ${saved ? '♥' : '♡'}
        </button>
      </div>
      <p class="card-location">📍 ${listing.location}</p>
      <div class="card-meta">
        <span>${bedroomLabel(listing.bedrooms)}</span>
        <span>${listing.bathrooms} Bath</span>
        <span>${listing.sqft ? listing.sqft.toLocaleString() + ' sqft' : ''}</span>
      </div>
      <p class="card-desc">${listing.description.substring(0, 100)}…</p>
      <div class="card-footer">
        <span class="card-rating">${renderStars(listing.rating)} (${listing.reviews})</span>
        <a class="btn btn-sm btn-primary" href="${page}?id=${listing.id}">View Details</a>
      </div>
    </div>`;
  card.querySelector('.save-btn').addEventListener('click', e => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) { showToast('Please sign in to save listings'); window.location.href='auth.html'; return; }
    const now = toggleSave(listing.id);
    const btn = e.currentTarget;
    btn.textContent = now ? '♥' : '♡';
    btn.classList.toggle('saved', now);
    btn.setAttribute('aria-label', (now ? 'Unsave' : 'Save') + ' listing');
    showToast(now ? '❤️ Listing saved!' : 'Listing removed from saved');
  });
  return card;
}

/* ── Contact / Tour modal ─────────────────────────────────── */
function openContactModal(listing) {
  const existing = document.getElementById('contact-modal');
  if (existing) existing.remove();
  const user = getCurrentUser();
  const modal = document.createElement('div');
  modal.id = 'contact-modal';
  modal.className = 'modal-overlay';
  modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h2>Contact ${listing.landlord}</h2>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-landlord">
          <div class="modal-avatar">${listing.landlord.charAt(0)}</div>
          <div>
            <p class="modal-landlord-name">${listing.landlord}</p>
            <p class="modal-landlord-listing">${listing.title} · $${listing.price}/mo</p>
          </div>
        </div>
        <form id="contact-form">
          <div class="form-group">
            <label for="m-name">Your Name</label>
            <input type="text" id="m-name" value="${user ? user.name : ''}" placeholder="Jane Smith" required>
          </div>
          <div class="form-group">
            <label for="m-email">Your Email</label>
            <input type="email" id="m-email" value="${user ? user.email : ''}" placeholder="jane@university.edu" required>
          </div>
          <div class="form-group">
            <label for="m-phone">Phone (optional)</label>
            <input type="tel" id="m-phone" placeholder="(555) 000-0000">
          </div>
          <div class="form-group">
            <label for="m-msg">Message</label>
            <textarea id="m-msg" rows="4">Hi, I'm interested in your listing "${listing.title}". Is it still available?</textarea>
          </div>
          <div class="modal-actions">
            <a class="btn btn-outline" href="mailto:${listing.landlordEmail}">📧 Email</a>
            <a class="btn btn-outline" href="tel:${listing.landlordPhone}">📞 Call</a>
            <button type="submit" class="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  const close = () => { modal.remove(); document.body.style.overflow = ''; };
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  modal.querySelector('#contact-form').addEventListener('submit', e => {
    e.preventDefault();
    modal.querySelector('.modal-body').innerHTML = `
      <div class="modal-success">
        <div class="modal-success-icon">✅</div>
        <h2>Message Sent!</h2>
        <p>${listing.landlord} will get back to you shortly.</p>
        <button class="btn btn-primary btn-block" id="modal-done">Done</button>
      </div>`;
    modal.querySelector('#modal-done').addEventListener('click', close);
  });
  setTimeout(() => modal.querySelector('#m-name').focus(), 50);
}

/* ── Tour modal ───────────────────────────────────────────── */
function openTourModal(listing) {
  const existing = document.getElementById('tour-modal');
  if (existing) existing.remove();
  const user = getCurrentUser();
  const modal = document.createElement('div');
  modal.id = 'tour-modal';
  modal.className = 'modal-overlay';
  modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h2>Schedule a Tour</h2>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info"><span class="alert-icon">ℹ️</span> Tours are coordinated directly with the landlord.</div>
        <form id="tour-form">
          <div class="form-group">
            <label for="t-name">Your Name</label>
            <input type="text" id="t-name" value="${user ? user.name : ''}" required>
          </div>
          <div class="form-group">
            <label for="t-email">Your Email</label>
            <input type="email" id="t-email" value="${user ? user.email : ''}" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="t-date">Preferred Date</label>
              <input type="date" id="t-date" required>
            </div>
            <div class="form-group">
              <label for="t-time">Preferred Time</label>
              <select id="t-time">
                <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                <option>12:00 PM</option><option>1:00 PM</option><option>2:00 PM</option>
                <option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="t-note">Note (optional)</label>
            <textarea id="t-note" rows="2" placeholder="Any questions or notes for the landlord?"></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="tour-cancel">Cancel</button>
            <button type="submit" class="btn btn-green">Request Tour</button>
          </div>
        </form>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  // set min date to today
  modal.querySelector('#t-date').min = new Date().toISOString().split('T')[0];
  const close = () => { modal.remove(); document.body.style.overflow = ''; };
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.querySelector('#tour-cancel').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  modal.querySelector('#tour-form').addEventListener('submit', e => {
    e.preventDefault();
    modal.querySelector('.modal-body').innerHTML = `
      <div class="modal-success">
        <div class="modal-success-icon">🗓</div>
        <h2>Tour Requested!</h2>
        <p>${listing.landlord} will confirm your tour shortly. Check your email for details.</p>
        <button class="btn btn-primary btn-block" id="tour-done">Done</button>
      </div>`;
    modal.querySelector('#tour-done').addEventListener('click', close);
  });
}

/* ── Protect pages ────────────────────────────────────────── */
function requireAuth(redirectBack) {
  if (!getCurrentUser()) {
    window.location.href = 'auth.html' + (redirectBack ? '?next=' + encodeURIComponent(window.location.href) : '');
    return false;
  }
  return true;
}
function requireRealtor() {
  const u = getCurrentUser();
  if (!u || u.type !== 'realtor') {
    showToast('This feature is for registered realtors only.');
    return false;
  }
  return true;
}
