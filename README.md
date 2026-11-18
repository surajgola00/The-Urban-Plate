# The Urban Plate — Contemporary Restaurant Website MVP

A responsive, multi-page front-end website for **The Urban Plate**, a contemporary dining establishment. Built with modern, semantic HTML5, CSS3, and vanilla ES6+ JavaScript with zero build steps or external library dependencies.

---

## 🌟 Key Features

### 1. Multi-Page Architecture (5 Core Pages)
- **Home (`index.html`)**: Immersive hero section with calls to action, restaurant introduction story, signature dishes showcase, Chef's Tasting Menu highlight banner, "The Urban Plate Difference" feature tiles, and opening hours summary.
- **Menu (`menu.html`)**: Interactive dining catalog featuring 22 curated dishes across Starters, Mains, Desserts, and Beverages, complete with high-resolution imagery, dietary badges (Vegetarian, Vegan, Gluten-Free), descriptions, and pricing.
- **About Us (`about.html`)**: Detailed restaurant history (est. 2015), core values (Farm to Fork, Craft & Creativity, Community First), executive chef and culinary team profiles, key achievements, and restaurant statistics.
- **Gallery (`gallery.html`)**: Visual showcase featuring 14 food, interior, and event photographs with interactive overlay previews and a lightbox viewer.
- **Contact & Reservations (`contact.html`)**: Location details, direct contact methods, formatted opening hours, interactive reservation request form with full client-side validation, and a collapsible FAQ accordion.

### 2. Meaningful JavaScript Interactivity (6 Features Implemented)
1. **Menu Category Filtering & Real-Time Search (`js/menu.js`)**:
   - Filter by category (*All*, *Starters*, *Mains*, *Desserts*, *Beverages*).
   - Live search input matching dish names and descriptions.
   - Combined search + category filtering with an accessible empty-state message when no results match.
2. **Interactive Gallery Slideshow & Lightbox (`js/gallery.js`)**:
   - Full-screen modal lightbox opening from any gallery thumbnail.
   - Next/previous slide navigation, slide counter (e.g., `3 / 14`), and clickable dot indicators.
   - Automatic image progression (autoplay) with play/pause toggle.
   - Full keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and backdrop-click to dismiss.
3. **Robust Reservation Form Validation (`js/reservation.js`)**:
   - Field-by-field client-side validation: Full Name (min 2 chars), Phone (format check), Guests (1–12), Date (future date enforcement), and Time selection.
   - Dynamic `min` date constraint automatically set to today's date.
   - Real-time error correction on input and blur.
   - Clear demo confirmation banner highlighting that the submission is for demonstration purposes only.
4. **Accessible FAQ Accordion (`contact.html`)**:
   - Smooth expand/collapse mechanics for guest inquiries.
   - Single-open behavior with synchronized `aria-expanded` and state icons (`+` / `−`).
5. **Theme Toggle: Dark Mode & Light Mode (`js/main.js` & `css/style.css`)**:
   - One-click theme switcher in the global header with icon change (☀️/🌙).
   - Theme persistence using `localStorage`.
   - Automatic detection of system preference (`prefers-color-scheme`).
6. **Responsive Mobile Navigation & Header Interactivity (`js/main.js`)**:
   - Collapsible mobile drawer navigation with hamburger/close state.
   - Dynamic sticky header effect on scroll with glassmorphism backdrop blur.
   - Automatic active navigation link detection based on current page URL.
   - Dynamic footer copyright year update.

---

## 🎨 Design System

- **Color Palette**:
  - Primary Background: `#FAF7F2` (Cream / Off-White)
  - Secondary Background: `#1C1C1E` (Dark Charcoal)
  - Accent Color: `#D4820A` (Warm Amber / Gold)
  - Text Primary: `#2C2C2E` (Deep Charcoal)
  - Text Muted: `#6B6B6B` (Subtle Gray)
- **Typography**:
  - Headings: `Playfair Display` (Classic display serif)
  - Body & UI: `Inter` (Clean, legible sans-serif)
- **Responsive Layout**:
  - Fluid containers up to 1200px max width.
  - Breakpoints at `1024px` (Tablet), `768px` (Mobile Large), and `480px` (Mobile Small).
  - Minimum 44px touch targets across interactive controls.
  - `prefers-reduced-motion` compliance for accessible animations.

---

## 📁 Project Directory Structure

```text
TheUrbanPlate/
├── index.html                   # Home page
├── menu.html                    # Menu page with live filter & search
├── about.html                   # About Us page with story, values & team
├── gallery.html                 # Photo gallery with interactive lightbox
├── contact.html                 # Contact details, reservation form & FAQ
├── README.md                    # Project documentation and guide
├── restaurant_website_prd.md    # Product Requirements Document
├── css/
│   ├── style.css                # Core design system, variables & component styles
│   └── responsive.css           # Breakpoints & mobile media queries
├── js/
│   ├── main.js                  # Global nav, dark mode, sticky header, active links
│   ├── menu.js                  # 22-item menu dataset, search & category filtering
│   ├── gallery.js               # Gallery data, lightbox modal, autoplay slideshow
│   └── reservation.js           # Client-side form validation & feedback
└── assets/
    ├── icons/                   # Custom icons directory
    └── images/                  # Local image assets directory (hero, menu, gallery, team)
```

---

## 🚀 How to Run Locally

Because this project is built with vanilla web standards, no build tools, Node.js packages, or compilers are required.

### Option 1: Direct File Open
Double-click `index.html` (or right-click and choose **Open With > Google Chrome / Microsoft Edge / Firefox / Safari**).

### Option 2: Local HTTP Server (Recommended)
Running through a local web server provides the best experience for module loading and asset resolution:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code
Right-click index.html and select "Open with Live Server"
```

Then visit `http://localhost:8000` in your web browser.

---

## 📝 Placeholder Content & Customization Guide

All restaurant details, dishes, and photography currently represent high-fidelity sample content. To customize the site for a live restaurant:

1. **Restaurant Information**:
   - Name, phone, email, and street address can be edited across the headers, footers, and `contact.html`.
2. **Menu Items**:
   - Open [`js/menu.js`](file:///C:/Users/ss033/Documents/TheUrbanPlate/js/menu.js) and update the `menuItems` array with your actual dish names, descriptions, categories, prices, and image paths.
3. **Gallery Photographs**:
   - Open [`js/gallery.js`](file:///C:/Users/ss033/Documents/TheUrbanPlate/js/gallery.js) and update the `galleryImages` array with your local high-resolution photos.
4. **Map Embed**:
   - In [`contact.html`](file:///C:/Users/ss033/Documents/TheUrbanPlate/contact.html), replace the `.map-placeholder` container with your Google Maps `<iframe>` embed code.
5. **Backend Reservation Integration**:
   - In [`js/reservation.js`](file:///C:/Users/ss033/Documents/TheUrbanPlate/js/reservation.js), replace the demo confirmation trigger with an asynchronous `fetch()` call to your booking API endpoint.

---

## ✅ Quality Assurance & Verification Checklist

- [x] **Page Navigation**: All 5 pages accessible via desktop header, mobile hamburger drawer, and site footer.
- [x] **Active Page Indicator**: Current page link highlighted with animated gold indicator and `aria-current="page"`.
- [x] **Menu Search & Filter**: Real-time name/description search works seamlessly in combination with category buttons; empty-state message displays on zero matches.
- [x] **Interactive Gallery**: Click-to-open lightbox, left/right keyboard and arrow navigation, counter, dots, and pauseable autoplay progression.
- [x] **Reservation Validation**: Required fields validated, invalid phone numbers rejected, past dates prevented with automatic `min` date constraint, and explicit demo disclaimer presented upon submission.
- [x] **FAQ Accordion**: Single-open animated accordion with ARIA state toggling.
- [x] **Theme Switching**: Dark and light mode toggle with state persistence in `localStorage`.
- [x] **Responsive Layout**: Verified for desktop (1200px+), tablet (768px–1024px), and mobile (<480px) viewports with zero horizontal overflow.
- [x] **Accessibility**: Semantic landmark elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`), valid label associations, and keyboard focus states.
