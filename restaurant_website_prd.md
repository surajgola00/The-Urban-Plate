# Product Requirements Document (PRD)

## The Urban Plate --- Restaurant Website MVP

**Document version:** 1.0\
**Status:** Draft\
**Product type:** Responsive, multi-page restaurant website\
**Primary objective:** Deliver a polished restaurant website MVP that
satisfies the supplied project requirements for multiple pages,
navigation, visual design, and at least three meaningful JavaScript
features.

------------------------------------------------------------------------

## 1. Product Overview

The Urban Plate is a proposed restaurant website that presents the
restaurant, showcases its food and ambience, helps visitors explore the
menu, and allows them to submit a table-reservation request.

The MVP is intended to be a front-end website. A production backend,
database, payment processing, and live reservation management are
outside the initial scope.

The restaurant name, menu items, prices, contact details, address,
opening hours, and images are sample content and must be replaceable
with the actual restaurant's information.

## 2. Goals and Success Criteria

### 2.1 Goals

-   Present the restaurant with a clear and attractive online identity.
-   Provide several meaningful pages connected through consistent
    navigation.
-   Make the menu easy to browse, search, and filter.
-   Let visitors submit a reservation request through a validated form.
-   Provide a responsive experience on desktop, tablet, and mobile.
-   Demonstrate at least three meaningful JavaScript features.

### 2.2 MVP success criteria

The MVP is considered complete when:

1.  All five planned pages are accessible through the main navigation.
2.  Navigation links work correctly from every page.
3.  The layout adapts to common desktop, tablet, and mobile screen
    sizes.
4.  Menu search and category filtering work with the displayed menu
    data.
5.  The reservation form validates required fields and shows a clear
    success or error message.
6.  The gallery slideshow works using previous/next controls and/or
    automatic progression.
7.  The FAQ accordion opens and closes its answers.
8.  No major broken links, unusable controls, or layout overflow remain.

## 3. Target Users

### Primary users

-   People discovering the restaurant for the first time.
-   Customers checking dishes, prices, and restaurant information.
-   Visitors who want to view food and restaurant photographs.
-   Customers who want to contact the restaurant or request a table.

### User needs

-   Understand what the restaurant offers.
-   Find a particular dish or browse menu categories.
-   Learn about the restaurant's story and ambience.
-   Find its location, contact details, and opening hours.
-   Submit a reservation request without confusion.

## 4. Scope

### 4.1 In scope --- MVP

-   Five responsive pages: Home, Menu, About Us, Gallery, and Contact &
    Reservations.
-   Shared header, navigation, and footer.
-   Restaurant branding and consistent visual design.
-   Menu cards with sample dish data, categories, and prices.
-   Menu search and category filtering.
-   Gallery with an interactive slideshow.
-   Reservation form with client-side validation.
-   FAQ accordion.
-   Responsive mobile navigation.
-   Contact information and map embed placeholder.
-   Basic accessibility and usability practices.

### 4.2 Out of scope --- future enhancements

-   User accounts and customer login.
-   Backend API and database.
-   Live table availability and reservation management.
-   Email or SMS reservation notifications.
-   Online ordering, cart, checkout, and payment gateway.
-   Admin dashboard for managing dishes, prices, bookings, and gallery
    images.
-   Customer reviews and loyalty programme.
-   Delivery partner integration.
-   Analytics and marketing automation.

## 5. Information Architecture

The website will contain the following pages:

  -----------------------------------------------------------------------
  Page                    Route / File            Purpose
  ----------------------- ----------------------- -----------------------
  Home                    `/` or `index.html`     Introduce the
                                                  restaurant and guide
                                                  visitors to key
                                                  actions.

  Menu                    `/menu` or `menu.html`  Display dishes and let
                                                  visitors search and
                                                  filter them.

  About Us                `/about` or             Explain the
                          `about.html`            restaurant's story,
                                                  values, and team.

  Gallery                 `/gallery` or           Showcase food,
                          `gallery.html`          interiors, and events.

  Contact & Reservations  `/contact` or           Display contact details
                          `contact.html`          and accept reservation
                                                  requests.
  -----------------------------------------------------------------------

Every page must provide access to the main navigation and footer.

## 6. Functional Requirements

### FR-01: Global Navigation

-   Display the restaurant logo/name and navigation links.
-   Provide links to Home, Menu, About Us, Gallery, and Contact.
-   Highlight or otherwise indicate the current page.
-   On smaller screens, collapse navigation into a menu button.
-   Ensure all navigation controls are keyboard accessible.

**Acceptance criteria:** A visitor can reach every main page from the
navigation on desktop and mobile.

### FR-02: Home Page

The home page must include:

-   Hero section with a strong food or restaurant image.
-   Restaurant name and short tagline.
-   Primary calls to action: **Explore Menu** and **Book a Table**.
-   Short restaurant introduction.
-   Featured dishes section.
-   Special offer or highlight section (sample content is acceptable).
-   Footer with contact and navigation information.

**Acceptance criteria:** Visitors can identify the restaurant,
understand its offering, and navigate to the menu or reservation page.

### FR-03: Menu Page

The menu page must include:

-   Menu categories such as Starters, Main Course, Desserts, and
    Beverages.
-   Dish cards containing an image, name, short description, category,
    and price.
-   Search field to find dishes by name.
-   Category controls to filter dishes.
-   A clear empty state when no dishes match the search/filter.

**Acceptance criteria:** Search and category filters update the visible
dishes correctly. Search and category filters should work together.

### FR-04: About Us Page

The About Us page must include:

-   Restaurant story and introduction.
-   Restaurant philosophy or values.
-   Chef/team introduction (sample content may be used).
-   Reasons to choose the restaurant.
-   Relevant restaurant or food imagery.

**Acceptance criteria:** The page communicates the restaurant's identity
and is visually consistent with the rest of the website.

### FR-05: Gallery Page

The gallery must:

-   Display a collection of food, interior, and event images.
-   Provide an interactive slideshow or image viewer.
-   Include previous and next controls.
-   Support automatic image progression if enabled.
-   Allow visitors to pause or manually control the slideshow.
-   Provide meaningful alternative text for images.

**Acceptance criteria:** Visitors can move between images without
reloading the page. Controls must be usable on touch screens and with a
keyboard.

### FR-06: Contact & Reservations Page

The page must display:

-   Restaurant phone number and email address (sample details until
    confirmed).
-   Restaurant address (sample details until confirmed).
-   Opening hours.
-   Map embed or clearly marked map placeholder.
-   Reservation form.

The reservation form should contain:

  Field              Requirement
  ------------------ -----------------------------------------------------
  Full name          Required
  Phone number       Required; validate the expected number format
  Number of guests   Required; select from a reasonable range
  Reservation date   Required; must not be in the past
  Preferred time     Required; select from available sample time options

On submission:

-   Validate all required fields.
-   Show clear, field-specific validation messages.
-   Prevent submission when invalid.
-   Show a confirmation message when valid.
-   Do not imply that a real table has been booked.

**MVP limitation:** The form only demonstrates client-side validation
and confirmation. It does not save a reservation or check actual table
availability. The confirmation must say that the request is a demo or
has not been sent to the restaurant.

### FR-07: FAQ Accordion

-   Display common questions about opening hours, reservations, menu
    options, and location.
-   Allow visitors to expand and collapse answers.
-   Use clear visual and accessible state indicators.

**Acceptance criteria:** Each question can be opened and closed, and the
interaction works on mobile and desktop.

### FR-08: Responsive Design

-   Support desktop, tablet, and mobile layouts.
-   Ensure text remains readable and controls remain usable.
-   Prevent horizontal overflow.
-   Resize images while preserving appropriate aspect ratios.
-   Use a mobile-friendly navigation pattern.

**Acceptance criteria:** Core content and actions remain accessible at
narrow viewport widths.

## 7. JavaScript Feature Requirements

The MVP will implement at least five meaningful JavaScript features.

  -----------------------------------------------------------------------
  Feature                 Description             Priority
  ----------------------- ----------------------- -----------------------
  Menu category filtering Show dishes from the    Must have
                          selected category.      

  Menu search             Search dishes by name   Must have
                          and optionally          
                          description.            

  Reservation form        Validate inputs and     Must have
  validation              show success/error      
                          feedback.               

  Gallery slideshow       Navigate images         Must have
                          manually and optionally 
                          automatically.          

  FAQ accordion           Expand and collapse     Should have
                          answers.                

  Dark mode               Optional theme toggle;  Could have
                          persist preference with 
                          LocalStorage if         
                          implemented.            
  -----------------------------------------------------------------------

The first five features are the planned MVP implementation. Dark mode is
optional and must not delay completion of core requirements.

## 8. Design and UX Requirements

### 8.1 Visual direction

Use a premium, contemporary restaurant aesthetic.

Suggested design system:

  Element                Direction
  ---------------------- ------------------------------------------------------
  Primary background     Cream / off-white
  Secondary background   Dark charcoal
  Accent colour          Warm orange or muted gold
  Headings               Playfair Display or a similar display serif
  Body text              Inter or another readable sans-serif
  Buttons                Clear labels, visible hover/focus states
  Cards                  Food photography, concise descriptions, clear prices
  Spacing                Consistent spacing and generous section separation

These are design recommendations, not fixed brand requirements.

### 8.2 Layout principles

-   Use a consistent header and footer across pages.
-   Establish a clear visual hierarchy.
-   Use readable font sizes and sufficient colour contrast.
-   Use high-quality, appropriately sized images.
-   Keep calls to action visually distinct.
-   Avoid excessive animations and decorative elements.
-   Provide visible hover and keyboard-focus states.

### 8.3 Accessibility basics

-   Use semantic HTML elements.
-   Associate form labels with their inputs.
-   Provide useful alternative text for meaningful images.
-   Ensure interactive controls are keyboard accessible.
-   Do not rely on colour alone to communicate errors or status.
-   Maintain sufficient text/background contrast.

## 9. Technical Requirements

### Recommended MVP stack

For an assignment where JavaScript implementation is being assessed:

-   **HTML5** --- page structure and semantic content.
-   **CSS3** --- layout, styling, and responsive design.
-   **Vanilla JavaScript (ES6+)** --- interactions and validation.

Optional tools:

-   Google Maps embed for location display.
-   LocalStorage for remembering a theme preference.
-   Git and GitHub for version control.
-   GitHub Pages or Vercel for static deployment.

React + Vite may be used if the project team prefers a component-based
architecture, but it is not necessary for this MVP.

### Data handling

-   Menu content may be stored in a local JavaScript array or static
    JSON file.
-   Gallery image paths may be maintained in a local array.
-   No database is required for the MVP.
-   Do not store sensitive customer information in LocalStorage.
-   Reservation form submissions must not be represented as confirmed
    bookings.

## 10. Suggested Project Structure

For a plain HTML, CSS, and JavaScript implementation:

``` text
the-urban-plate/
├── index.html
├── menu.html
├── about.html
├── gallery.html
├── contact.html
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── menu/
│   │   ├── gallery/
│   │   └── team/
│   └── icons/
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── menu.js
│   ├── gallery.js
│   └── reservation.js
└── README.md
```

The structure may be adjusted if React + Vite is selected.

## 11. Non-Functional Requirements

-   **Performance:** Optimise image sizes and avoid unnecessary scripts.
-   **Reliability:** Navigation and interactive features should work
    consistently.
-   **Usability:** Common actions should be easy to discover and
    understand.
-   **Maintainability:** Keep page structure, styling, and JavaScript
    logically organised.
-   **Compatibility:** Test in current versions of Chrome, Firefox, and
    Edge.
-   **Responsiveness:** Test desktop, tablet, and mobile viewport sizes.
-   **Privacy:** Do not collect or persist real customer data in this
    front-end-only MVP.

## 12. Testing and Quality Assurance

Use the following checklist before delivery:

### Pages and navigation

-   [ ] All five pages load correctly.
-   [ ] Main navigation links work from every page.
-   [ ] Logo links to the home page.
-   [ ] Footer links work.
-   [ ] Mobile navigation opens and closes correctly.

### Menu

-   [ ] All sample menu items display correctly.
-   [ ] Category filtering works.
-   [ ] Search works.
-   [ ] Search and category filtering work together.
-   [ ] Empty search results show a helpful message.

### Gallery and FAQ

-   [ ] Gallery images load.
-   [ ] Previous and next controls work.
-   [ ] Automatic slideshow behaves correctly if enabled.
-   [ ] FAQ items expand and collapse.

### Reservations

-   [ ] Required fields are validated.
-   [ ] Invalid phone numbers are rejected.
-   [ ] Past dates are rejected.
-   [ ] Invalid submissions do not show success.
-   [ ] Valid submissions show a clear demo confirmation.
-   [ ] The UI does not claim that a real reservation is confirmed.

### Responsive and accessibility checks

-   [ ] No horizontal overflow on mobile.
-   [ ] Text and buttons are readable and usable.
-   [ ] Images have appropriate alternative text.
-   [ ] Forms have associated labels.
-   [ ] Keyboard focus is visible.

## 13. Delivery Plan

  -----------------------------------------------------------------------
  Phase                   Work                    Output
  ----------------------- ----------------------- -----------------------
  1\. Foundation          Confirm restaurant      Basic design direction
                          identity, content,      and project setup
                          colours, and page       
                          structure.              

  2\. Page development    Build the five pages    Complete static website
                          and shared              
                          navigation/footer.      

  3\. Interactions        Add search, filtering,  Functional JavaScript
                          form validation,        features
                          slideshow, and FAQ      
                          accordion.              

  4\. Responsive styling  Refine desktop, tablet, Responsive website
                          and mobile layouts.     

  5\. QA and deployment   Test all pages and      Tested, accessible MVP
                          interactions; deploy    link and source code
                          the site.               
  -----------------------------------------------------------------------

## 14. Future Roadmap

After the MVP is accepted, the following features can be considered:

1.  Backend API for reservation requests.
2.  Database-backed menu and restaurant information.
3.  Admin dashboard to manage dishes, prices, images, and reservations.
4.  Email or SMS notifications for reservation requests.
5.  Live table availability and booking confirmation.
6.  Online ordering, cart, and payment integration.
7.  Customer reviews and loyalty features.

These enhancements should be planned separately and are not required for
MVP acceptance.

## 15. Assumptions and Open Decisions

The following details must be confirmed before the final website content
is prepared:

-   Actual restaurant name and logo.
-   Restaurant type and cuisine.
-   Brand colours and visual references.
-   Menu categories, dish names, descriptions, and prices.
-   Restaurant address, phone number, and email.
-   Opening hours.
-   Actual food, interior, and team photographs.
-   Whether the reservation form should remain a front-end demo or later
    connect to a backend.

Until these details are supplied, **The Urban Plate** and all restaurant
information should be treated as placeholder content.

------------------------------------------------------------------------

## 16. MVP Definition of Done

The project is ready for submission when:

-   [ ] Five meaningful pages are implemented.
-   [ ] Every important page is accessible through navigation.
-   [ ] The design includes appropriate colours, readable fonts, images,
    buttons, sections, cards where suitable, and consistent spacing.
-   [ ] At least three meaningful JavaScript features work; the planned
    target is five.
-   [ ] The reservation form validates input and clearly communicates
    its demo-only behaviour.
-   [ ] The website works on desktop and mobile.
-   [ ] The QA checklist has been completed.
-   [ ] A README explains how to run the project and identifies any
    placeholder content.

**Final MVP deliverable:** A responsive, multi-page restaurant website
with a browsable menu, restaurant information, an interactive gallery,
contact details, and a validated demo reservation form.
