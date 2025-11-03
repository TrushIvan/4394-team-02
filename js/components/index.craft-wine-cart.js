export function initCraftCart() {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".craft-wines-btn");

  let count = 0;

  cartIcon?.classList.add("hidden");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      count++;
      cartCount.textContent = count;

      
      cartIcon?.classList.remove("hidden");
    });
  });
}