function init() {
	import("./components/index.video-history.js");
	import("./components/index.wine-categories.js");
	import("./components/index.wine-types.js");
	import("./components/index.faq-accordion.js");
	import("./components/index.footer-form.js");
	import("./components/index.instagram-feed.js");
	import("./components/index.craft-wine-cart.js");
}

document.addEventListener("DOMContentLoaded", () => {
	//hamburger
	function initHamburger() {
		const hamburger = document.querySelector(".hamburger");
		const menu = document.querySelector(".header__menu");
		const social = document.querySelector(".header__block");
		const links = document.querySelectorAll(".header__menu a");

		if (!hamburger || !menu || !social) return;

		hamburger.addEventListener("click", () => {
			hamburger.classList.toggle("active");
			menu.classList.toggle("active");
			social.classList.toggle("active");
			document.body.classList.toggle("lock");
		});

		links.forEach((link) => {
			link.addEventListener("click", (e) => {
				if (link.getAttribute("href") === "#") {
					e.preventDefault();
				}
				hamburger.classList.remove("active");
				menu.classList.remove("active");
				social.classList.remove("active");
				document.body.classList.remove("lock");
			});
		});
	}

	document.addEventListener("DOMContentLoaded", initHamburger);

	document.body.addEventListener("htmx:afterSwap", (e) => {
		if (e.target.classList.contains("header")) {
			initHamburger();
		}
	});

	//slider

	$(document).ready(function () {
		initWinesSlider();
	});

	document.body.addEventListener("htmx:afterSwap", function (event) {
		if ($(event.target).find(".wines__block").length > 0) {
			initWinesSlider();
		}
	});

	// 3️⃣ Функція ініціалізації slick
	function initWinesSlider() {
		if ($(".wines__block").hasClass("slick-initialized")) {
			return;
		}

		$(".wines__block").slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			adaptiveHeight: true,
			centerMode: false,
			pauseOnHover: true,
			responsive: [
				{
					breakpoint: 1441,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: false,
						dots: true,
					},
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: false,
						dots: true,
						adaptiveHeight: true,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: false,
						dots: true,
						adaptiveHeight: true,
					},
				},
				{
					breakpoint: 425,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						dots: true,
						adaptiveHeight: true,
					},
				},
			],
		});
	}
});

document.body.addEventListener("htmx:afterOnLoad", () => {
	init();
});




document.body.addEventListener("htmx:afterSwap", (event) => {
  if (event.target.classList.contains("craft-wines")) {
    import("./components/index.craft-wine-cart.js").then((module) => {
      if (module.initCraftCart) {
        module.initCraftCart(); 
      }
    });
  }
});