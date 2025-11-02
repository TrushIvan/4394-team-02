export function initCraftCart() {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const cartPopup = document.querySelector(".cart-popup-wrapper");
  const productList = document.querySelector(".product-list");
  const totalValue = document.querySelector(".total-value");
  const addToCartButtons = document.querySelectorAll(".craft-wines-btn");
  const closeBtn = document.querySelector(".close-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCart();

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".craft-wines-item");
      const name = card.querySelector(".craft-wines-name")?.textContent || "No name";
      const priceText = card.querySelector(".craft-wines-price")?.textContent || "0";
      const price = parseFloat(priceText.replace("USD", "").replace(",", ".").trim());

      cart.push({ name, price });
      saveCart();
      renderCart();
    });
  });

  cartIcon.addEventListener("click", () => {
    cartPopup.classList.add("active");
    cartIcon.classList.add("hidden");
  });

  function closeCart() {
    cartPopup.classList.remove("active");
    cartIcon.classList.remove("hidden");
  }

  closeBtn?.addEventListener("click", closeCart);

  cartPopup.addEventListener("click", (e) => {
    if (e.target === cartPopup) closeCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cartCount.textContent = cart.length;
    cart.length > 0 ? cartIcon.classList.remove("hidden") : cartIcon.classList.add("hidden");

    productList.innerHTML = "";

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("product-row");
      li.innerHTML = `
        <div class="product-details">
          <img src="././img/craft-wines/${item.name.toLowerCase().replace(/\s/g, "-")}.jpg" alt="${item.name}" class="product-img" />
          <a href="#" class="product-link">${item.name}</a>
        </div>
        <div class="product-controls">
          <div class="quantity-box">
            <input type="number" value="1" min="1" class="quantity-input" />
          </div>
          <p class="product-price">${item.price.toFixed(2)} USD</p>
          <button type="button" class="remove-btn" data-index="${index}" aria-label="Remove product">
            &times;
          </button>
        </div>
      `;
      productList.appendChild(li);
    });

   
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        cart.splice(idx, 1);
        saveCart();
        renderCart();
      });
    });

  
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalValue.textContent = `${total.toFixed(2)} USD`;
  }
}