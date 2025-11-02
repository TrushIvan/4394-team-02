document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".craft-wines-btn");
  const cartPopup = document.querySelector(".cart-popup-wrapper");
  const closeBtn = document.querySelector(".close-btn");

  let cart = [];

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".craft-wines-item");
      const name = card.querySelector(".craft-wines-name")?.textContent || "No name";
      const priceText = card.querySelector(".craft-wines-price")?.textContent || "0";

      const price = parseFloat(priceText.replace("USD", "").replace(",", ".").trim());

      cart.push({ name, price });

      cartIcon.classList.remove("hidden");
      cartCount.textContent = cart.length;
    });
  });

  cartIcon.addEventListener("click", () => {
    cartPopup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    cartPopup.classList.remove("active");
  });

  cartPopup.addEventListener("click", (e) => {
    if (e.target === cartPopup) {
      cartPopup.classList.remove("active");
    }
  });
});