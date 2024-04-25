

$(document).ready(function () {
	$('.nav__icon').click(function (e) {
		$('.nav__icon, .nav__body').toggleClass('active');
		$('body').toggleClass('lock');

	})





})

const links = document.querySelectorAll('.nav__link[data-goto]');

if (links.length > 0) {
	links.forEach(link => {
		link.addEventListener("click", onMenu)
	})

	function onMenu(e) {
		$('.nav__icon, .nav__body').toggleClass('active');
		$('body').toggleClass('lock');
		const link = e.target;

		if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
			const gotoBlock = document.querySelector(link.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
