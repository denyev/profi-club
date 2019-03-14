'use strict';

import './vendor';

const tabletScreenWidth = window.matchMedia('(min-width: 992px)');

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
 * Action, when user press the toggle.
 * @param {string} wrapperName - a class name for the wrapper.
 * @param {string} handlerName - a class name for the handler.
 * @param {string} wrapperModifierName = 'closed' - a wrapper modifier name.
 * @param {string} handlerModifierName = 'active' - a handler modifier name.
 * @example
 * ```javascript
 * switchToggle('filters__form', 'filters__toggle');
 * ```
 */
let switchToggle = (wrapperName, handlerName, wrapperModifierName = 'closed', handlerModifierName = 'active') => {
	const wrapper = document.querySelector('.' + wrapperName);
	const handler = document.querySelector('.' + handlerName);
	let wrapperModifier = wrapperName + '--' + wrapperModifierName;
	let handlerModifier = handlerName + '--' + handlerModifierName;

	try{
		if (tabletScreenWidth.matches) {
			wrapper.classList.remove(wrapperModifier);
			handler.classList.remove(handlerModifier);
		} else {
			wrapper.classList.add(wrapperModifier);
			handler.addEventListener('click', (event) => {
				event.preventDefault();
				if (wrapper.classList.contains(wrapperModifier)) {
					wrapper.classList.remove(wrapperModifier);
					handler.classList.add(handlerModifier);
				} else {
					wrapper.classList.add(wrapperModifier);
					handler.classList.remove(handlerModifier);
				}
			});
		}
	} catch(error) {
		console.error(error);
	}
};

window.onload = () => {
	// Toggles the navigation menu
	switchToggle('header__navigation', 'toggle');

	// Toggles the filters
	switchToggle('filters__form', 'filters__toggle');
};

window.onresize = () => {
	// Toggles the navigation menu
	switchToggle('header__navigation', 'toggle');

	// Toggles the filters
	switchToggle('filters__form', 'filters__toggle');
};
