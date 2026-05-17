// ===== State =====
let allItems = [];
let activeCategory = "all";
let searchQuery = "";

// ===== DOM refs =====
const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const navBtns = document.querySelectorAll(".nav-btn");
const searchInput = document.getElementById("searchInput");

// ===== Modal elements =====
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalQtyBadge = document.getElementById("modalQtyBadge");

// ===== Fetch items =====
async function fetchItems() {
  try {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allItems = await res.json();
    render();
  } catch (err) {
    console.error("Failed to load items:", err);
    grid.innerHTML = `<p class="empty-state">Could not load products. Make sure the server is running.</p>`;
  }
}

// ===== Format price =====
function formatPrice(price) {
  return "Rp" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ===== Render =====
function render() {
  let items = allItems;

  // Filter by category
  if (activeCategory !== "all") {
    items = items.filter((i) => i.category === activeCategory);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query),
    );
  }

  if (items.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  grid.innerHTML = items.map(buildCard).join("");
}

// ===== Build card HTML =====
function buildCard(item) {
  const qtyClass = getQtyClass(item.quantity);
  const qtyLabel = getQtyLabel(item.quantity);

  return `
    <article class="card" data-id="${item.id}">
      <img
        class="card-img"
        src="${item.image}"
        alt="${item.name}"
        loading="lazy"
      />
      <div class="card-body">
        <p class="card-category">${item.category}</p>
        <h3 class="card-name">${item.name}</h3>
        <div class="card-footer">
          <span class="card-price">${formatPrice(item.price)}</span>
          <span class="card-qty">
            <span class="qty-badge ${qtyClass}">${qtyLabel}</span>
          </span>
        </div>
      </div>
    </article>
  `;
}

function getQtyClass(qty) {
  if (qty === 0) return "out-of-stock";
  if (qty <= 5) return "low-stock";
  return "in-stock";
}

function getQtyLabel(qty) {
  if (qty === 0) return "Sold out";
  if (qty <= 5) return `Only ${qty} left`;
  return `${qty} in stock`;
}

// ===== Category filtering =====
navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    navBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    render();
  });
});

// ===== Search =====
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  render();
});

// ===== Product click — open modal =====
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  const item = allItems.find((i) => i.id === parseInt(id));
  if (!item) return;

  openModal(item);
});

function openModal(item) {
  modalImg.src = item.image;
  modalImg.alt = item.name;
  modalCategory.textContent = item.category;
  modalName.textContent = item.name;
  modalPrice.textContent = formatPrice(item.price);

  const qtyClass = getQtyClass(item.quantity);
  const qtyLabel = getQtyLabel(item.quantity);
  modalQtyBadge.className = `qty-badge ${qtyClass}`;
  modalQtyBadge.textContent = qtyLabel;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Close button
modalClose.addEventListener("click", closeModal);

// Click outside modal to close
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Escape key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
    closeModal();
  }
});

// ===== Boot =====
fetchItems();
