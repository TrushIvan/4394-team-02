export function initCraftCart() {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const cartPopup = document.querySelector(".cart-popup-wrapper");
  const productList = document.querySelector(".product-list");
  const totalValue = document.querySelector(".total-value");
  const emptySection = document.querySelector(".empty-cart-section");
  const addToCartButtons = document.querySelectorAll(".craft-wines-btn");
  const closeBtn = document.querySelector(".close-btn");

  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCart();


  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".craft-wines-item");
      const name = card.querySelector(".craft-wines-name")?.textContent || "No name";
      const priceText = card.querySelector(".craft-wines-price")?.textContent || "0";
      const price = parseFloat(priceText.replace(",", "."));

      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

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
    if (cart.length > 0) {
      cartIcon.classList.remove("hidden");
    }
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

    if (cart.length === 0) {
    
      emptySection.style.display = "block";
      if (productList) productList.style.display = "none";
      if (totalValue) totalValue.textContent = "0 USD";
      cartIcon?.classList.add("hidden");
      return;
    } else {
     
      emptySection.style.display = "none";
      if (productList) productList.style.display = "block";
      cartIcon?.classList.remove("hidden");
    }


    productList.innerHTML = "";

    
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("product-row");
      li.innerHTML = `
        <div class="product-details">
          <img src="././img/craft-wines/craft-wines-${item.name.toLowerCase().replace(/\s/g, "-")}.jpg"
               alt="${item.name}" class="product-img" />
          <a href="#" class="product-link">${item.name}</a>
        </div>
        <div class="product-controls">
          <div class="quantity-box">
            <input type="number" value="${item.qty}" min="1"
                   class="quantity-input" data-index="${index}" />
          </div>
          <p class="product-price">${(item.price * item.qty).toFixed(2)} USD</p>
          <button type="button" class="remove-btn" data-index="${index}" aria-label="Remove product">
            &times;
          </button>
        </div>
      `;
      productList.appendChild(li);
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", () => {
        const idx = input.getAttribute("data-index");
        cart[idx].qty = parseInt(input.value) || 1;
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        cart.splice(idx, 1);
        saveCart();
        renderCart();
      });
    });

    const total = cart.reduce((sum, item) => sum + item.

price * item.qty, 0);
    totalValue.textContent = `${total.toFixed(2)} USD`;
  }
}