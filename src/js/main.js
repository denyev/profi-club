'use strict';

import './vendor';

const tabletScreenWidth = window.matchMedia('(min-width: 992px)');

/**
 * Toggle navigation.
 */

let navigationToggle = () => {
	try {
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
				console.log(toggleModifier);
				if (navigation.classList.contains(navModifier)) {
					navigation.classList.remove(navModifier);
					toggle.classList.add(toggleModifier);
				} else {
					navigation.classList.add(navModifier);
					toggle.classList.remove(toggleModifier);
				}
			});
		}
	} catch(error) {
		console.error(error);
	}
};

/**
 * Search form.
 */
try {
	const searchFields = document.querySelectorAll('.search__field');

	for (let i = 0; i < searchFields.length; i++) {
		let searchField = searchFields[i];

		searchField.addEventListener('change', () => {
			let fieldValue = parseInt(searchField.value, 10);

			if (fieldValue.length !== 0) {
				searchField.classList.add('js-hasvalue');
			} else {
				searchField.classList.remove('js-hasvalue');
			}
		});
	}
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

/**
 * Toggle filters
 */
let filtersToggle = () => {
	try{
		const wrapper = document.querySelector('.filters__form');
		const toggle = document.querySelector('.filters__toggle');
		let wrapperModifier = 'filters__form--closed';
		let toggleModifier = 'filters__toggle--active';

		if (tabletScreenWidth.matches) {
			wrapper.classList.remove(wrapperModifier);
			toggle.classList.remove(toggleModifier);
		} else {
			wrapper.classList.add(wrapperModifier);
			toggle.addEventListener('click', () => {
				if (wrapper.classList.contains(wrapperModifier)) {
					wrapper.classList.remove(wrapperModifier);
					toggle.classList.add(toggleModifier);
				} else {
					wrapper.classList.add(wrapperModifier);
					toggle.classList.remove(toggleModifier);
				}
			});
		}
	} catch(error) {
		console.error(error);
	}
};

window.onload = () => {
	navigationToggle();
	filtersToggle();
};

window.onresize = () => {
	navigationToggle();
	filtersToggle();
};

