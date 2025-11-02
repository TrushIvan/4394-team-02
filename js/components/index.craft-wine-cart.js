document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".craft-wines-btn");
  const cartPopup = document.querySelector(".cart-popup-wrapper");
  const closeBtn = document.querySelector(".close-btn");

  console.debug("cartIcon:", cartIcon, "cartCount:", cartCount, "buttons:", addToCartButtons.length, "cartPopup:", cartPopup, "closeBtn:", closeBtn);

  let cart = [];

 
  if (!addToCartButtons || addToCartButtons.length === 0) {
    console.warn("No Add to cart buttons found (.craft-wines-btn).");
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".craft-wines-item");
      if (!card) {
        console.warn("Button not inside .craft-wines-item");
        return;
      }

     
      const name = card.querySelector(".craft-wines-name")?.textContent || "No name";
      const priceText = card.querySelector(".craft-wines-price")?.textContent || "0";

      const cleaned = priceText.replace(/USD/i, "").replace(/\s/g, "").replace(",", ".").trim();
      const price = parseFloat(cleaned) || 0;

      cart.push({ name, price });


      if (cartIcon) {
        cartIcon.classList.remove("hidden");
      } else {
    
        console.warn("#cart-icon not found");
      }

      if (cartCount) {
        cartCount.textContent = cart.length;
      }

      console.debug("Cart now:", cart);
    });
  });


  if (cartIcon && cartPopup) {
    cartIcon.addEventListener("click", () => {
      cartPopup.classList.add("active");
    });
  } else {
    console.warn("cartIcon or cartPopup missing — can't attach click to show popup");
  }

  if (closeBtn && cartPopup) {
    closeBtn.addEventListener("click", () => {
      cartPopup.classList.remove("active");
    });
  }

  if (cartPopup) {
    cartPopup.addEventListener("click", (e) => {
      if (e.target === cartPopup) {
        cartPopup.classList.remove("active");
      }
    });
  }
});