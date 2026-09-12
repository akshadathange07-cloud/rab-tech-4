const state = {
  products: [],
  category: localStorage.getItem("productCategory") || "all",
  query: localStorage.getItem("productSearch") || "",
  sort: localStorage.getItem("productSort") || "default",
  cart: JSON.parse(localStorage.getItem("productCart") || "[]")
};

const grid = document.querySelector("#productGrid");
const loading = document.querySelector("#loading");
const errorBanner = document.querySelector("#errorBanner");
const errorText = document.querySelector("#errorText");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const cartCount = document.querySelector("#cartCount");
const apiStatus = document.querySelector("#apiStatus");

searchInput.value = state.query;
sortSelect.value = state.sort;

function saveState() {
  localStorage.setItem("productSearch", state.query);
  localStorage.setItem("productSort", state.sort);
  localStorage.setItem("productCategory", state.category);
  localStorage.setItem("productCart", JSON.stringify(state.cart));
}

function updateCartCount() {
  cartCount.textContent = state.cart.length;
}

function titleCase(text) {
  return text.replace(/\b\w/g, c => c.toUpperCase());
}

function filteredProducts() {
  let items = [...state.products];

  if (state.category !== "all") {
    items = items.filter(p => p.category === state.category);
  }

  if (state.query.trim()) {
    const q = state.query.toLowerCase().trim();
    items = items.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  switch (state.sort) {
    case "price-low": items.sort((a,b) => a.price - b.price); break;
    case "price-high": items.sort((a,b) => b.price - a.price); break;
    case "rating": items.sort((a,b) => b.rating.rate - a.rating.rate); break;
    case "name": items.sort((a,b) => a.title.localeCompare(b.title)); break;
  }
  return items;
}

function renderProducts() {
  const items = filteredProducts();
  grid.innerHTML = "";

  emptyState.hidden = items.length !== 0;
  grid.hidden = items.length === 0;

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "product-content";
    content.innerHTML = `
      <span class="category">${titleCase(product.category)}</span>
      <h2></h2>
      <p class="description"></p>
      <div class="rating">★ ${product.rating.rate} <small>(${product.rating.count} reviews)</small></div>
      <div class="product-bottom">
        <strong>$${product.price.toFixed(2)}</strong>
        <button class="add-btn" type="button">Add to cart</button>
      </div>
    `;
    content.querySelector("h2").textContent = product.title;
    content.querySelector(".description").textContent = product.description;

    content.querySelector(".add-btn").addEventListener("click", () => {
      state.cart.push(product.id);
      saveState();
      updateCartCount();
      const button = content.querySelector(".add-btn");
      button.textContent = "✓ Added";
      setTimeout(() => button.textContent = "Add to cart", 1000);
    });

    card.append(image, content);
    grid.appendChild(card);
  });
}

function setActiveTab() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === state.category);
  });
}

function showError(message) {
  errorText.textContent = message;
  errorBanner.hidden = false;
  loading.hidden = true;
  grid.hidden = true;
  apiStatus.textContent = "Offline";
}

async function loadProducts() {
  errorBanner.hidden = true;
  loading.hidden = false;
  grid.hidden = true;
  emptyState.hidden = true;
  apiStatus.textContent = "Connecting…";

  try {
    state.products = await fetchProducts();
    apiStatus.textContent = "Connected ✓";
    loading.hidden = true;
    setActiveTab();
    renderProducts();
  } catch (error) {
    showError("The public API could not be reached. Check your connection and click Retry.");
    console.error(error);
  }
}

searchInput.addEventListener("input", event => {
  state.query = event.target.value;
  saveState();
  renderProducts();
});

sortSelect.addEventListener("change", event => {
  state.sort = event.target.value;
  saveState();
  renderProducts();
});

document.querySelector("#categoryTabs").addEventListener("click", event => {
  const tab = event.target.closest(".tab");
  if (!tab) return;
  state.category = tab.dataset.category;
  saveState();
  setActiveTab();
  renderProducts();
});

document.querySelector("#retryBtn").addEventListener("click", loadProducts);

document.querySelector("#cartBtn").addEventListener("click", () => {
  alert(`You have ${state.cart.length} saved item(s) in your local cart.`);
});

updateCartCount();
setActiveTab();
loadProducts();
