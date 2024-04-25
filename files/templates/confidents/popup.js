const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', (e) => {
			const popupName = popupLink.getAttribute('href').replace('#', '');

			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];

		el.addEventListener('click', (e) => {
			popupClose(el.closest('.conf'));
			e.preventDefault();
		});
	}
}


function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.conf.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', (e) => {
			if (!e.target.closest('.conf__body')) {
				popupClose(e.target.closest('.conf'));
			}
		});
	}
}



function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}

	}
	let footer = document.querySelector('.footer');
	if (!popupActive.classList.contains('open')) {
		scrollTo(footer);
	}
}


function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.getElementsByClassName.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;

	}, timeout);
}

function bodyUnlock() {

}

function bodyUnlock() {

	setTimeout(() => {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(() => {
		unlock = true;

	}, timeout);
}

document.addEventListener('keydown', (e) => {
	if (e.wich === 27) {
		const popupActive = document.querySelector('.conf.open');
		popupClose(popupActive);
	}
});


(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

let btn = document.querySelectorAll('.popup-link');
let header = document.querySelector('.header');
btn.forEach(e => {
	e.addEventListener('click', () => {
		scrollTo(header);
	});
});

function scrollTo(e) {
	window.scroll({
		left: 0,
		top: e.offsetTop,
		behavior: "smooth"
	})
}
