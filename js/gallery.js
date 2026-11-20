/**
 * gallery.js — The Urban Plate
 * Handles gallery grid rendering, lightbox/slideshow, autoplay, and keyboard navigation.
 */

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
