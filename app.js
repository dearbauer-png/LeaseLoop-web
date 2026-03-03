/* ============================================================
   LeaseLoop — Shared App JavaScript
   ============================================================ */

// ── Saved Listings (localStorage) ──────────────────────────
function getSavedIds() {
  try {
    return JSON.parse(localStorage.getItem("ll_saved") || "[]");
  } catch {
    return [];
  }
}

function setSavedIds(ids) {
  localStorage.setItem("ll_saved", JSON.stringify(ids));
}

function isSaved(id) {
  return getSavedIds().includes(id);
}

function toggleSave(id) {
  const ids = getSavedIds();
  const idx = ids.indexOf(id);
  if (idx === -1) {
    ids.push(id);
  } else {
    ids.splice(idx, 1);
  }
  setSavedIds(ids);
  return idx === -1; // returns true if now saved
}

// ── URL Params ──────────────────────────────────────────────
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

// ── Bedroom label helper ─────────────────────────────────────
function bedroomLabel(n) {
  return n === 0 ? "Studio" : n === 1 ? "1 Bed" : `${n} Beds`;
}

// ── Render star rating ───────────────────────────────────────
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = "";
  for (let i = 0; i < full; i++) s += "★";
  if (half) s += "½";
  return `<span class="stars">${s}</span> <span class="rating-num">${rating}</span>`;
}

// ── Build a listing card element ─────────────────────────────
function buildCard(listing, targetPage) {
  const saved = isSaved(listing.id);
  const page = targetPage || "details.html";

  const card = document.createElement("article");
  card.className = "listing-card";
  card.innerHTML = `
    <a class="card-img-link" href="${page}?id=${listing.id}" aria-label="View ${listing.title}">
      <div class="card-img" role="img" aria-label="${listing.type} listing">
        <span class="card-icon">${listing.icon}</span>
        <span class="card-badge">${listing.type}</span>
      </div>
    </a>
    <div class="card-body">
      <div class="card-top">
        <div>
          <p class="card-price">$${listing.price.toLocaleString()}<span class="card-price-unit">/${listing.priceUnit}</span></p>
          <h3 class="card-title"><a href="${page}?id=${listing.id}">${listing.title}</a></h3>
        </div>
        <button class="save-btn ${saved ? "saved" : ""}"
          aria-label="${saved ? "Unsave" : "Save"} listing"
          data-id="${listing.id}">
          ${saved ? "♥" : "♡"}
        </button>
      </div>
      <p class="card-location">📍 ${listing.location}</p>
      <div class="card-meta">
        <span>${bedroomLabel(listing.bedrooms)}</span>
        <span>${listing.bathrooms} Bath</span>
        <span>${listing.sqft.toLocaleString()} sqft</span>
      </div>
      <p class="card-desc">${listing.description.substring(0, 100)}…</p>
      <div class="card-footer">
        <span class="card-rating">${renderStars(listing.rating)} (${listing.reviews})</span>
        <a class="btn btn-sm btn-primary" href="${page}?id=${listing.id}">View Details</a>
      </div>
    </div>`;

  // save toggle
  card.querySelector(".save-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const nowSaved = toggleSave(listing.id);
    const btn = e.currentTarget;
    btn.textContent = nowSaved ? "♥" : "♡";
    btn.classList.toggle("saved", nowSaved);
    btn.setAttribute("aria-label", (nowSaved ? "Unsave" : "Save") + " listing");
  });

  return card;
}

// ── Contact modal helper ─────────────────────────────────────
function openContactModal(listing) {
  // Remove existing modal if any
  const existing = document.getElementById("contact-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "contact-modal";
  modal.className = "modal-overlay";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Contact landlord");
  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" aria-label="Close">&times;</button>
      <h2 class="modal-title">Contact Landlord</h2>
      <div class="modal-landlord">
        <div class="modal-avatar">${listing.landlord.charAt(0)}</div>
        <div>
          <p class="modal-landlord-name">${listing.landlord}</p>
          <p class="modal-landlord-listing">${listing.title}</p>
        </div>
      </div>
      <form class="modal-form" id="contact-form">
        <div class="form-group">
          <label for="msg-name">Your Name</label>
          <input type="text" id="msg-name" placeholder="Jane Smith" required>
        </div>
        <div class="form-group">
          <label for="msg-email">Your Email</label>
          <input type="email" id="msg-email" placeholder="jane@university.edu" required>
        </div>
        <div class="form-group">
          <label for="msg-body">Message</label>
          <textarea id="msg-body" rows="4" placeholder="Hi, I'm interested in this listing. Is it still available?">${"Hi, I'm interested in your listing \"" + listing.title + "\". Is it still available?"}</textarea>
        </div>
        <div class="modal-actions">
          <a class="btn btn-outline" href="mailto:${listing.landlordEmail}">
            📧 Email Directly
          </a>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </div>
      </form>
    </div>`;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  const close = () => {
    modal.remove();
    document.body.style.overflow = "";
  };

  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });

  modal.querySelector("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("msg-name").value.trim();
    if (!name) return;
    modal.querySelector(".modal-box").innerHTML = `
      <div class="modal-success">
        <div class="modal-success-icon">✅</div>
        <h2>Message Sent!</h2>
        <p>${listing.landlord} will get back to you shortly at the email you provided.</p>
        <button class="btn btn-primary" id="modal-done">Done</button>
      </div>`;
    modal.querySelector("#modal-done").addEventListener("click", close);
  });

  // Focus first input
  setTimeout(() => modal.querySelector("#msg-name").focus(), 50);
}
