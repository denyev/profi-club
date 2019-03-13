'use strict';

import './vendor';

const tabletScreenWidth = window.matchMedia('(min-width: 992px)');

/**
 * Toggle navigation.
 */
try {
	let navigationToggle = () => {
		const navigation = document.querySelector('.header__navigation');
		const toggle = document.querySelector('.header__toggle .toggle');
		let navModifier = 'header__navigation--closed';
		let toggleModifier = 'toggle--active';

		if (tabletScreenWidth.matches) {
			navigation.classList.remove(navModifier);
			toggle.classList.remove(toggleModifier);
		} else {
			navigation.classList.add(navModifier);
			toggle.addEventListener('click', () => {
				if (navigation.classList.contains(navModifier)) {
					navigation.classList.remove(navModifier);
					toggle.classList.add(toggleModifier);
				} else {
					navigation.classList.add(navModifier);
					toggle.classList.remove(toggleModifier);
				}
			});
		}
	};

	window.onload = () => {
		navigationToggle();
	};

	window.onresize = () => {
		navigationToggle();
	};
} catch(error) {
	console.error(error);
}

/**
 * Slider range.
 */
try {
	$(() => {
		const slider_range = $('.filters__slider');
		const slider_amount = $('.filters__amount');
		let slider_currency = '$';

		slider_range.slider({
			range: true,
			min: 0,
			max: 12700,
			values: [0, 7230],
			slide: (event, ui) => {
				slider_amount.val(slider_currency + ui.values[0] + ' - ' + slider_currency + ui.values[1]);
			},
			classes: {
				'ui-slider': 'filters__slider',
				'ui-slider-handle': 'filters__slider-handle',
				'ui-slider-range': 'filters__slider-range'
			},
		});
		slider_amount.val(slider_currency + slider_range.slider('values', 0) +
			' - ' + slider_currency + slider_range.slider('values', 1));
	});
} catch(error) {
	console.error(error);
}
