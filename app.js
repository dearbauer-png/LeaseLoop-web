/* ============================================================
   LeaseLoop — app.js  (thin shared bootstrapper)
   Most shared logic lives in auth.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialise navbar on every page
  if (typeof initNavbar === 'function') initNavbar();

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
});
