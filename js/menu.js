/**
 * menu.js — The Urban Plate
 * Handles menu data, rendering, filtering, and live search.
 */

// ─── Menu Data ────────────────────────────────────────────────────────────────

const menuItems = [
  // ── Starters ──────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Truffle Arancini",
    category: "starters",
    description:
      "Crispy golden risotto balls infused with black truffle and melted mozzarella, served with a roasted tomato dipping sauce.",
    price: "₹425",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian"],
  },
  {
    id: 2,
    name: "Saffron Chicken Tikka",
    category: "starters",
    description:
      "Tender chicken thighs marinated in saffron, yoghurt and warming spices, chargrilled in a tandoor and finished with a squeeze of lime.",
    price: "₹495",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&auto=format",
    tags: [],
  },
  {
    id: 3,
    name: "Burrata & Heritage Tomatoes",
    category: "starters",
    description:
      "Creamy Italian burrata on a bed of vibrant heritage tomatoes, drizzled with aged balsamic, fresh basil oil and flaky sea salt.",
    price: "₹525",
    image: "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "gluten-free"],
  },
  {
    id: 4,
    name: "Prawn & Avocado Cocktail",
    category: "starters",
    description:
      "Atlantic king prawns with silky avocado, little gem lettuce and a tangy Marie Rose sauce, served in a chilled glass.",
    price: "₹595",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&auto=format",
    tags: ["gluten-free"],
  },
  {
    id: 5,
    name: "Wild Mushroom Soup",
    category: "starters",
    description:
      "A velvety blend of porcini, chestnut and shiitake mushrooms with thyme cream, topped with a swirl of truffle oil and crusty sourdough croutons.",
    price: "₹375",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian"],
  },
  {
    id: 6,
    name: "Crispy Calamari",
    category: "starters",
    description:
      "Lightly dusted squid rings fried to a perfect crisp, served with a zesty lemon aioli and fresh rocket salad.",
    price: "₹475",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop&auto=format",
    tags: [],
  },

  // ── Mains ─────────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Pan-Seared Sea Bass",
    category: "mains",
    description:
      "Fillet of line-caught sea bass with a crispy skin, resting on saffron-scented crushed potatoes with a caper and brown butter sauce.",
    price: "₹950",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop&auto=format",
    tags: ["gluten-free"],
  },
  {
    id: 8,
    name: "Slow-Braised Lamb Shank",
    category: "mains",
    description:
      "Fall-off-the-bone lamb shank braised in red wine and rosemary for six hours, served with velvety minted mash and seasonal greens.",
    price: "₹1,150",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",
    tags: ["gluten-free"],
  },
  {
    id: 9,
    name: "Butter Chicken",
    category: "mains",
    description:
      "Classic north Indian curry — succulent chicken simmered in a rich, spiced tomato and cream sauce. Served with fragrant basmati rice and warm naan.",
    price: "₹650",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&auto=format",
    tags: [],
  },
  {
    id: 10,
    name: "Wild Mushroom Risotto",
    category: "mains",
    description:
      "Carnaroli risotto stirred with porcini, chestnut mushrooms, aged Parmesan and a generous knob of butter — simple, indulgent, perfect.",
    price: "₹595",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "gluten-free"],
  },
  {
    id: 11,
    name: "Herb-Crusted Rack of Lamb",
    category: "mains",
    description:
      "Two-bone rack of lamb encrusted with Dijon mustard, parsley and garlic breadcrumbs, served with dauphinoise potato and redcurrant jus.",
    price: "₹1,250",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop&auto=format",
    tags: [],
  },
  {
    id: 12,
    name: "Lemon & Herb Roast Chicken",
    category: "mains",
    description:
      "Half a free-range chicken roasted to golden perfection with lemon, thyme and garlic, accompanied by triple-cooked chips and dressed watercress.",
    price: "₹695",
    image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=400&h=300&fit=crop&auto=format",
    tags: ["gluten-free"],
  },
  {
    id: 13,
    name: "Aubergine & Chickpea Tagine",
    category: "mains",
    description:
      "A fragrant Moroccan-inspired tagine of smoky aubergine, chickpeas, preserved lemon and warming ras-el-hanout, served with herbed couscous.",
    price: "₹545",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "vegan"],
  },
  {
    id: 14,
    name: "Atlantic Salmon en Croûte",
    category: "mains",
    description:
      "Fresh salmon fillet wrapped in golden puff pastry with a spinach and cream cheese filling, served with hollandaise and new potatoes.",
    price: "₹995",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format",
    tags: [],
  },

  // ── Desserts ───────────────────────────────────────────────────────────────
  {
    id: 15,
    name: "Mango Kulfi",
    category: "desserts",
    description:
      "Traditional Indian frozen dessert made with condensed milk, fresh Alphonso mango and pistachios — served on a stick with rose petal sugar.",
    price: "₹295",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "gluten-free"],
  },
  {
    id: 16,
    name: "Chocolate Fondant",
    category: "desserts",
    description:
      "Warm dark chocolate fondant with a molten centre, served with a scoop of Madagascar vanilla ice cream and a dusting of cocoa.",
    price: "₹365",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian"],
  },
  {
    id: 17,
    name: "Classic Crème Brûlée",
    category: "desserts",
    description:
      "Silky Tahitian vanilla custard baked low and slow, topped with a perfectly caramelised amber sugar crust. A timeless French classic.",
    price: "₹345",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "gluten-free"],
  },
  {
    id: 18,
    name: "Shahi Kesar Phirni & Date Pudding",
    category: "desserts",
    description:
      "A royal Indian indulgence — rich Kashmiri saffron phirni paired with warm spiced date sponge and topped with silver vark and crushed pistachios.",
    price: "₹345",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian"],
  },

  // ── Beverages ──────────────────────────────────────────────────────────────
  {
    id: 19,
    name: "Elderflower Spritz",
    category: "beverages",
    description:
      "Refreshing blend of elderflower cordial, fresh cucumber, mint and sparkling water over ice — light, floral and perfectly balanced.",
    price: "₹245",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "vegan", "non-alcoholic"],
  },
  {
    id: 20,
    name: "Masala Chai Latte",
    category: "beverages",
    description:
      "A warming blend of Assam tea, freshly ground cardamom, cinnamon, ginger and cloves, topped with velvety steamed oat milk.",
    price: "₹195",
    image: "https://images.unsplash.com/photo-1651789276450-2ba99bf5f270?w=400&h=500&fit=crop&auto=format",
    tags: ["vegetarian", "non-alcoholic"],
  },
  {
    id: 21,
    name: "Fresh Mango Lassi",
    category: "beverages",
    description:
      "Chilled, smooth and lightly sweetened — blended ripe Alphonso mango with creamy yoghurt and a hint of cardamom. Pure summer in a glass.",
    price: "₹225",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop&auto=format",
    tags: ["vegetarian", "gluten-free", "non-alcoholic"],
  },
  {
    id: 22,
    name: "Single-Origin Cold Brew Coffee",
    category: "beverages",
    description:
      "Smooth, low-acid cold brew steeped for 18 hours using Ethiopian Yirgacheffe beans, served over ice with a splash of oat milk.",
    price: "₹265",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format",
    tags: ["vegan", "gluten-free", "non-alcoholic"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// ─── Render ───────────────────────────────────────────────────────────────────

/**
 * Render an array of menu items into #menu-grid.
 * Shows an empty-state message when the array is empty.
 * @param {Array<Object>} items - Filtered menu items to display.
 */
function renderMenuItems(items) {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  // Empty state
  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>No dishes found. Try a different search or category.</p>
      </div>`;
    return;
  }

  // Build cards
  grid.innerHTML = items
    .map((item) => {
      const badgesHTML = item.tags
        .map((tag) => `<span class="card-badge">${capitalise(tag)}</span>`)
        .join("");

      return `
        <div class="card menu-card" data-id="${item.id}" data-category="${item.category}">
          <div class="card-img">
            <img
              src="${item.image}"
              alt="${item.name}"
              loading="lazy"
            />
            <span class="card-tag">${capitalise(item.category)}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-desc">${item.description}</p>
            <div class="card-footer">
              <span class="card-price">${item.price}</span>
              ${badgesHTML}
            </div>
          </div>
        </div>`;
    })
    .join("");
}

// ─── Filter & Search ──────────────────────────────────────────────────────────

/**
 * Read the active category filter and live search query,
 * filter menuItems accordingly, then re-render the grid.
 */
function filterAndRender() {
  // Active category
  const activeBtn = document.querySelector(".filter-btn.active");
  const activeCategory = activeBtn ? activeBtn.dataset.category : "all";

  // Live search query
  const searchInput = document.getElementById("menu-search");
  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = menuItems.filter((item) => {
    // Category filter
    const categoryMatch =
      activeCategory === "all" || item.category === activeCategory;

    // Search filter (name or description)
    const searchMatch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);

    return categoryMatch && searchMatch;
  });

  renderMenuItems(filtered);
}

// ─── Event Listeners ──────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // ── Category filter buttons ──────────────────────────────────────────────
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all, set on clicked
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterAndRender();
    });
  });

  // ── Live search ──────────────────────────────────────────────────────────
  const searchInput = document.getElementById("menu-search");
  if (searchInput) {
    searchInput.addEventListener("input", filterAndRender);
  }

  // ── Initial render ───────────────────────────────────────────────────────
  // Ensure the "All" button is marked active, then render everything.
  const allBtn = document.querySelector('.filter-btn[data-category="all"]');
  if (allBtn) {
    filterBtns.forEach((b) => b.classList.remove("active"));
    allBtn.classList.add("active");
  }

  renderMenuItems(menuItems);
});
