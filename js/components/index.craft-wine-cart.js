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
document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.querySelector(".product-main-img");
  const thumbs = document.querySelectorAll(".thumb");
  const leftArrow = document.querySelector(".gallery-arrow.left");
  const rightArrow = document.querySelector(".gallery-arrow.right");

  const images = Array.from(thumbs).map(img => img.src);
  let currentIndex = 0;

  function updateImage(index) {
    mainImg.src = images[index];
    thumbs.forEach(img => img.classList.remove("active"));
    thumbs[index].classList.add("active");
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      updateImage(currentIndex);
    });
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });
});
