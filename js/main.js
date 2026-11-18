/**
 * The Urban Plate — main.js
 * Vanilla ES6+ JavaScript for site-wide interactivity.
 */

'use strict';

/* ============================================================
   1. MOBILE NAVIGATION TOGGLE
   ============================================================ */
(function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  /** Open / close the mobile nav */
  function toggleNav(forceClose = false) {
    const isOpen = navLinks.classList.contains('open');

    if (forceClose || isOpen) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    } else {
      navLinks.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.textContent = '✕';
    }
  }

  // Button click
  navToggle.addEventListener('click', () => toggleNav());

  // Close when any nav link is clicked (useful on mobile single-page nav)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleNav(true));
  });

  // Close when clicking outside the nav
  document.addEventListener('click', (e) => {
    const clickedInsideNav    = navLinks.contains(e.target);
    const clickedToggleButton = navToggle.contains(e.target);
    if (!clickedInsideNav && !clickedToggleButton) {
      toggleNav(true);
    }
  });
})();


/* ============================================================
   2. ACTIVE NAVIGATION HIGHLIGHTING
   ============================================================ */
(function initActiveNav() {
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;

    // Normalize pathname: treat "/" and "/index.html" identically
    let currentPath = window.location.pathname;

    // Strip trailing slash (except root "/")
    if (currentPath !== '/' && currentPath.endsWith('/')) {
      currentPath = currentPath.slice(0, -1);
    }

    // Extract just the filename portion
    const currentFile = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';

      // Ignore pure anchor links
      if (href.startsWith('#')) return;

      const linkFile = href.split('/').pop() || 'index.html';

      // Handle root / index.html equivalence
      const isHome = (currentFile === '' || currentFile === 'index.html') &&
                     (linkFile === 'index.html' || linkFile === '');

      if (isHome || linkFile === currentFile) {
        link.classList.add('nav-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  });
})();


/* ============================================================
   3. STICKY HEADER BEHAVIOR
   ============================================================ */
(function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const SCROLL_THRESHOLD = 80;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Run once on load in case the page is refreshed mid-scroll
  handleScroll();

  window.addEventListener('scroll', handleScroll, { passive: true });
})();


/* ============================================================
   4. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    // Ignore bare "#" with no id
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL hash without jumping
    history.pushState(null, '', targetId);
  });
})();


/* ============================================================
   5. SCROLL-TRIGGERED FADE ANIMATIONS (IntersectionObserver)
   ============================================================ */
(function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (!fadeElements.length) return;

  // Fallback for browsers without IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    fadeElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once visible — animation runs once
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,       // Trigger when 15 % of the element is visible
      rootMargin: '0px 0px -40px 0px' // Slight bottom offset for natural feel
    }
  );

  fadeElements.forEach(el => observer.observe(el));
})();


/* ============================================================
   6. DARK MODE TOGGLE
   ============================================================ */
(function initDarkMode() {
  const STORAGE_KEY = 'theme';
  const DARK_VALUE  = 'dark';
  const LIGHT_VALUE = 'light';

  // Default to signature restaurant light theme unless user explicitly saved a preference
  const savedTheme  = localStorage.getItem(STORAGE_KEY);
  const initialTheme = savedTheme || LIGHT_VALUE;

  if (initialTheme === DARK_VALUE) {
    document.documentElement.setAttribute('data-theme', DARK_VALUE);
  } else {
    document.documentElement.setAttribute('data-theme', LIGHT_VALUE);
  }

  /** Update the toggle button icon to reflect the current theme */
  function syncToggleIcon(button, isDark) {
    button.textContent = isDark ? '☀️' : '🌙';
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('title',      isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Support a toggle button already in the HTML (id="dark-mode-toggle")
    // or create one and append it to the header / nav.
    let toggle = document.getElementById('dark-mode-toggle');

    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'dark-mode-toggle';
      toggle.className = 'dark-mode-toggle';

      // Try to place it inside the header; fall back to body
      const header = document.querySelector('header') || document.body;
      header.appendChild(toggle);
    }

    // Set correct icon on page load
    const isDarkOnLoad = document.documentElement.getAttribute('data-theme') === DARK_VALUE;
    syncToggleIcon(toggle, isDarkOnLoad);

    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === DARK_VALUE;

      if (isDark) {
        document.documentElement.setAttribute('data-theme', LIGHT_VALUE);
        localStorage.setItem(STORAGE_KEY, LIGHT_VALUE);
        syncToggleIcon(toggle, false);
      } else {
        document.documentElement.setAttribute('data-theme', DARK_VALUE);
        localStorage.setItem(STORAGE_KEY, DARK_VALUE);
        syncToggleIcon(toggle, true);
      }
    });
  });
})();


/* ============================================================
   7. CURRENT YEAR IN FOOTER
   ============================================================ */
(function initCurrentYear() {
  document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.innerHTML = new Date().getFullYear();
    }
  });
})();
