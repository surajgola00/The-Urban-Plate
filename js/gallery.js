/**
 * gallery.js — The Urban Plate
 * Handles gallery grid rendering, lightbox/slideshow, autoplay, and keyboard navigation.
 */

/* =========================================================
   1. GALLERY DATA
   ========================================================= */

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop&auto=format",
    alt: "Elegantly plated salmon dish with seasonal vegetables",
    caption: "Pan-Seared Salmon"
  },
  {
    src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop&auto=format",
    alt: "Artisan charcuterie and cheese board",
    caption: "Artisan Charcuterie Board"
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&auto=format",
    alt: "Slow-braised lamb shank with garnish",
    caption: "Braised Lamb Shank"
  },
  {
    src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop&auto=format",
    alt: "Wild mushroom risotto with parmesan",
    caption: "Wild Mushroom Risotto"
  },
  {
    src: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&h=600&fit=crop&auto=format",
    alt: "Decadent chocolate fondant with vanilla ice cream",
    caption: "Chocolate Fondant"
  },
  {
    src: "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=600&fit=crop&auto=format",
    alt: "Vibrant burrata with heritage tomatoes",
    caption: "Burrata & Heritage Tomatoes"
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format",
    alt: "Warmly lit dining room with beautiful table settings",
    caption: "The Main Dining Room"
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    alt: "Intimate restaurant interior with elegant decor",
    caption: "The Garden Room"
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format",
    alt: "Open kitchen with chefs at work",
    caption: "Chef's Counter"
  },
  {
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop&auto=format",
    alt: "Cosy outdoor terrace with ambient lighting",
    caption: "The Terrace"
  },
  {
    src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&h=600&fit=crop&auto=format",
    alt: "Elegantly set tables for a private dining event",
    caption: "Private Dining Event"
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&auto=format",
    alt: "Corporate lunch event with plated starters",
    caption: "Corporate Dining"
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop&auto=format",
    alt: "Live cooking demonstration and culinary artistry curated by Mehak",
    caption: "Mehak's Chef Table Experience"
  },
  {
    src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&h=600&fit=crop&auto=format",
    alt: "Handcrafted desserts and pastries on display",
    caption: "Pastry Selection"
  }
];

/* =========================================================
   2. INJECT LIGHTBOX STYLES
   ========================================================= */

(function injectStyles() {
  const style = document.createElement("style");
  style.id = "lightbox-styles";
  style.textContent = `
    /* ---- Lightbox Overlay ---- */
    .lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.92);
      align-items: center;
      justify-content: center;
      animation: lbFadeIn 0.25s ease;
    }
    .lightbox.active {
      display: flex;
    }
    @keyframes lbFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ---- Lightbox Content Wrapper ---- */
    .lightbox-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 960px;
      padding: 0 60px;
      box-sizing: border-box;
      flex-direction: column;
    }

    /* ---- Close Button ---- */
    .lightbox-close {
      position: absolute;
      top: -48px;
      right: 0;
      background: none;
      border: 2px solid rgba(255,255,255,0.4);
      color: #fff;
      font-size: 1.3rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .lightbox-close:hover {
      background: rgba(255,255,255,0.15);
      border-color: #fff;
    }

    /* ---- Prev / Next Arrows ---- */
    .lightbox-prev,
    .lightbox-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.1);
      border: 2px solid rgba(255,255,255,0.3);
      color: #fff;
      font-size: 2.4rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      z-index: 10;
    }
    .lightbox-prev { left: 4px; }
    .lightbox-next { right: 4px; }
    .lightbox-prev:hover,
    .lightbox-next:hover {
      background: rgba(255,255,255,0.25);
      border-color: #fff;
    }

    /* ---- Image Wrapper ---- */
    .lightbox-img-wrap {
      width: 100%;
      text-align: center;
    }
    #slideshow-img {
      max-width: 100%;
      max-height: 65vh;
      object-fit: contain;
      border-radius: 6px;
      display: block;
      margin: 0 auto;
      transition: opacity 0.25s ease;
    }
    #slideshow-img.fading {
      opacity: 0;
    }

    /* ---- Caption ---- */
    .slide-caption {
      color: rgba(255,255,255,0.85);
      font-size: 0.95rem;
      margin: 10px 0 0;
      letter-spacing: 0.03em;
    }

    /* ---- Footer Bar ---- */
    .lightbox-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 14px;
      flex-wrap: wrap;
    }
    .slide-counter {
      color: rgba(255,255,255,0.65);
      font-size: 0.85rem;
      min-width: 50px;
      text-align: center;
    }

    /* ---- Autoplay Button ---- */
    .autoplay-btn {
      background: none;
      border: 2px solid rgba(255,255,255,0.35);
      color: #fff;
      font-size: 1rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .autoplay-btn:hover {
      background: rgba(255,255,255,0.15);
      border-color: #fff;
    }

    /* ---- Dot Indicators ---- */
    .dots-container {
      display: flex;
      gap: 7px;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 300px;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      border: none;
      padding: 0;
    }
    .dot.active {
      background: #fff;
      transform: scale(1.3);
    }
    .dot:hover:not(.active) {
      background: rgba(255,255,255,0.65);
    }

    /* ---- Gallery Grid Items ---- */
    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 6px;
      cursor: pointer;
      aspect-ratio: 4 / 3;
      background: #1a1a1a;
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease, filter 0.4s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.07);
      filter: brightness(0.75);
    }
    .gallery-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      padding: 12px;
      background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%);
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
    .gallery-caption {
      color: #fff;
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.03em;
      text-shadow: 0 1px 4px rgba(0,0,0,0.6);
    }

    /* ---- Responsive ---- */
    @media (max-width: 600px) {
      .lightbox-content {
        padding: 0 44px;
      }
      .lightbox-prev { left: 0; }
      .lightbox-next { right: 0; }
      #slideshow-img { max-height: 55vh; }
    }
  `;
  document.head.appendChild(style);
})();

/* =========================================================
   3. INJECT LIGHTBOX HTML
   ========================================================= */

(function injectLightboxHTML() {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image viewer");

  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" id="close-slideshow" aria-label="Close">&#x2715;</button>
      <button class="lightbox-prev" id="prev-btn" aria-label="Previous image">&#8249;</button>
      <div class="lightbox-img-wrap">
        <img id="slideshow-img" src="" alt="">
        <p class="slide-caption" id="slide-caption"></p>
      </div>
      <button class="lightbox-next" id="next-btn" aria-label="Next image">&#8250;</button>
      <div class="lightbox-footer">
        <span class="slide-counter" id="slide-counter">1 / ${galleryImages.length}</span>
        <button class="autoplay-btn" id="autoplay-btn" aria-label="Toggle autoplay">&#9208;</button>
        <div class="dots-container" id="dots-container"></div>
      </div>
    </div>
  `;

  document.body.appendChild(lightbox);
})();

/* =========================================================
   4. SLIDESHOW STATE
   ========================================================= */

let currentIndex = 0;
let isPlaying = false;
let autoplayInterval = null;

const total = galleryImages.length;

/* =========================================================
   5. DOM REFERENCES  (resolved after DOMContentLoaded)
   ========================================================= */

let lightboxEl, slideshowImg, slideCaption, slideCounter,
    dotsContainer, autoplayBtn;

/* =========================================================
   6. CORE SLIDESHOW FUNCTIONS
   ========================================================= */

/**
 * Render dot indicators inside #dots-container.
 */
function buildDots() {
  dotsContainer.innerHTML = "";
  galleryImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === currentIndex ? " active" : "");
    dot.setAttribute("aria-label", `Go to image ${i + 1}`);
    dot.addEventListener("click", () => {
      stopAutoplay();
      showSlide(i);
    });
    dotsContainer.appendChild(dot);
  });
}

/**
 * Update the active dot to match currentIndex.
 */
function updateDots() {
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

/**
 * Transition to a specific slide by index.
 * @param {number} index - Zero-based image index.
 */
function showSlide(index) {
  currentIndex = ((index % total) + total) % total; // safe wrap
  const image = galleryImages[currentIndex];

  // Fade transition
  slideshowImg.classList.add("fading");
  setTimeout(() => {
    slideshowImg.src = image.src;
    slideshowImg.alt = image.alt;
    slideshowImg.classList.remove("fading");
  }, 220);

  slideCaption.textContent = image.caption;
  slideCounter.textContent = `${currentIndex + 1} / ${total}`;
  updateDots();
}

/**
 * Advance to the next slide.
 */
function nextSlide() {
  showSlide((currentIndex + 1) % total);
}

/**
 * Go back to the previous slide.
 */
function prevSlide() {
  showSlide((currentIndex - 1 + total) % total);
}

/* =========================================================
   7. LIGHTBOX OPEN / CLOSE
   ========================================================= */

/**
 * Open the lightbox at a given index and start autoplay.
 * @param {number} index - Index of the clicked thumbnail.
 */
function openSlideshow(index) {
  buildDots();
  showSlide(index);
  lightboxEl.classList.add("active");
  document.body.style.overflow = "hidden"; // prevent background scroll
  startAutoplay();
  // Move focus into the lightbox for accessibility
  document.getElementById("close-slideshow").focus();
}

/**
 * Close the lightbox and clean up.
 */
function closeSlideshow() {
  lightboxEl.classList.remove("active");
  document.body.style.overflow = "";
  stopAutoplay();
}

/* =========================================================
   8. AUTOPLAY
   ========================================================= */

/** Update the autoplay button icon to reflect current state. */
function updateAutoplayIcon() {
  // ⏸ when playing, ▶ when paused
  autoplayBtn.innerHTML = isPlaying ? "&#9208;" : "&#9654;";
  autoplayBtn.setAttribute("aria-label", isPlaying ? "Pause autoplay" : "Start autoplay");
}

/**
 * Start the autoplay interval (4-second cadence).
 */
function startAutoplay() {
  if (isPlaying) return;
  isPlaying = true;
  autoplayInterval = setInterval(nextSlide, 4000);
  updateAutoplayIcon();
}

/**
 * Stop the autoplay interval.
 */
function stopAutoplay() {
  if (!isPlaying) return;
  isPlaying = false;
  clearInterval(autoplayInterval);
  autoplayInterval = null;
  updateAutoplayIcon();
}

/**
 * Toggle between play and pause.
 */
function toggleAutoplay() {
  if (isPlaying) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
}

/* =========================================================
   9. GALLERY GRID RENDERING
   ========================================================= */

/**
 * Populate the #gallery-grid element with thumbnail cards.
 */
function renderGalleryGrid() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) {
    console.warn("gallery.js: #gallery-grid element not found in the DOM.");
    return;
  }

  galleryImages.forEach((image, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-index", index);
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `View: ${image.caption}`);

    item.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-caption">${image.caption}</span>
      </div>
    `;

    // Click to open lightbox
    item.addEventListener("click", () => openSlideshow(index));

    // Keyboard accessibility: Enter or Space activates
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSlideshow(index);
      }
    });

    grid.appendChild(item);
  });
}

/* =========================================================
   10. EVENT LISTENERS
   ========================================================= */

function attachEventListeners() {
  // Navigation buttons
  document.getElementById("prev-btn").addEventListener("click", () => {
    stopAutoplay();
    prevSlide();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    stopAutoplay();
    nextSlide();
  });

  // Close button
  document.getElementById("close-slideshow").addEventListener("click", closeSlideshow);

  // Autoplay toggle
  autoplayBtn.addEventListener("click", toggleAutoplay);

  // Click backdrop (outside content) to close
  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) closeSlideshow();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightboxEl.classList.contains("active")) return;
    switch (e.key) {
      case "ArrowLeft":
        stopAutoplay();
        prevSlide();
        break;
      case "ArrowRight":
        stopAutoplay();
        nextSlide();
        break;
      case "Escape":
        closeSlideshow();
        break;
    }
  });
}

/* =========================================================
   11. INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM references
  lightboxEl    = document.getElementById("lightbox");
  slideshowImg  = document.getElementById("slideshow-img");
  slideCaption  = document.getElementById("slide-caption");
  slideCounter  = document.getElementById("slide-counter");
  dotsContainer = document.getElementById("dots-container");
  autoplayBtn   = document.getElementById("autoplay-btn");

  // Render the thumbnail grid
  renderGalleryGrid();

  // Wire up all controls
  attachEventListeners();
});
