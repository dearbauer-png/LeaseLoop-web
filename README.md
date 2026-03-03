# 🔄 LeaseLoop — Student Housing Marketplace

> Student housing, simplified. Find apartments, subleases, and roommates near your campus.

---

## 🚀 What Do I Do Now?

### Option 1 — Open it directly in your browser (easiest)
Just double-click **`index.html`** in the project folder. It opens straight in your browser — no install needed.

### Option 2 — Run a local dev server (recommended)
```bash
# Python (usually already installed on Mac/Linux)
python3 -m http.server 3000

# Then open → http://localhost:3000
```
```bash
# Node (if you have it installed)
npx serve .

# Then open → http://localhost:3000
```

---

## 🗺 Site Map

| File | What It Does |
|------|-------------|
| `index.html` | **Homepage** — hero search, featured listings, campus grid, roommate finder teaser |
| `auth.html` | **Login / Register** — choose Student or Realtor account type |
| `listings.html` | **Browse Listings** — filter by campus, type, price, beds; post a listing (Realtor only) |
| `details.html` | **Property Details** — full info, contact landlord, schedule a tour |
| `roommates.html` | **Roommate Finder** — swipe-style matching (like/pass), build your profile |
| `dashboard.html` | **Your Dashboard** — Realtor: manage listings; Student: saved homes + matches |

---

## 🔑 Try It with Demo Accounts

No sign-up required to browse, but to test the full experience use these built-in accounts:

| Role | Email | Password | What you can do |
|------|-------|----------|-----------------|
| **Student** | `student@demo.com` | `demo123` | Save listings, find roommates, view dashboard |
| **Realtor** | `realtor@demo.com` | `demo123` | Post listings, manage status (Available/Pending/Leased), delete listings |

> Or just click **Sign Up** and create your own account — everything saves in your browser automatically.

---

## ✨ Features Walkthrough

### For Students
1. **Set Your Campus** — click the campus chip (top-right of any page) to pick your school
2. **Browse & Filter** — go to Listings, use the filter bar (type, bedrooms, price range, sort)
3. **Save Favorites** — click the heart/bookmark on any listing card
4. **Find a Roommate** — go to `roommates.html`, fill out your profile, swipe through profiles
5. **Contact Landlords** — open any listing and click **Contact Landlord** or **Schedule Tour**

### For Realtors
1. **Register** as a Realtor on `auth.html`
2. **Post a Property** — go to Listings → click **Post a Listing** (top-right)
3. **Manage Listings** — go to Dashboard to update status or delete listings

---

## 🏫 Supported Campuses

| Campus | City |
|--------|------|
| 🤘 UT Austin | Austin, TX |
| 🐻 Baylor | Waco, TX |
| 🐾 Texas A&M | College Station, TX |
| 🐸 TCU | Fort Worth, TX |
| 🏛 SMU | Dallas, TX |
| 🦅 UNT | Denton, TX |
| 🔴 Texas Tech | Lubbock, TX |
| 🏙 U of Houston | Houston, TX |

> **Adding a new campus:** Open `data.js` and add an entry to the `CAMPUSES` array. It will automatically appear everywhere — the switcher modal, dropdowns, and campus cards on the homepage.

---

## 🌐 Deploying (Free Options)

### GitHub Pages (fastest)
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` / `root`
4. Your site will be live at `https://yourusername.github.io/LeaseLoop-web/`

### Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
2. Drag the entire project folder onto the page
3. Done — you get a live URL instantly

### Vercel
```bash
npm i -g vercel
vercel
```

---

## 🗂 Project Structure

```
LeaseLoop-web/
├── index.html          # Homepage
├── auth.html           # Login / Register
├── listings.html       # Browse + post listings
├── details.html        # Single listing view
├── roommates.html      # Roommate finder (swipe-style)
├── dashboard.html      # User dashboard
├── styles.css          # All styles (responsive, mobile-first)
├── data.js             # Mock listings, roommate profiles, campus data
├── auth.js             # Auth, saved listings, user data (localStorage)
└── app.js              # Shared navbar + mobile menu bootstrap
```

---

## 🛣 Suggested Next Steps

These are things you could add to grow the platform:

- [ ] **Real backend** (Supabase, Firebase) — swap localStorage for a real database so listings persist for everyone
- [ ] **Photo uploads** — let realtors upload real property photos (Cloudinary or Supabase Storage)
- [ ] **Messaging system** — in-app chat between students and realtors
- [ ] **Map view** — show listings on a map (Google Maps or Mapbox)
- [ ] **Email notifications** — notify realtors when a student contacts them
- [ ] **Add more campuses** — just edit `CAMPUSES` in `data.js`
- [ ] **Stripe payments** — featured listing upgrades or application fees
- [ ] **Mobile app** — wrap in React Native / Expo once the web version is solid

---

## 📝 Notes

- All data is stored in **browser localStorage** — it's local to your machine and great for demos/testing. When you add a real backend, swap the localStorage calls in `auth.js` for API calls.
- Passwords are stored in plaintext in localStorage (demo only). A production app would hash passwords server-side with bcrypt/argon2.

---

*Built with vanilla HTML, CSS & JavaScript — no frameworks, no build step, no dependencies.*
