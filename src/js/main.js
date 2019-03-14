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
 *
 * @param {Object} options - Function arguments.
 * @param {string} options.wrapperName - The class name for the wrapper.
 * @param {string} options.handlerName - The class name for the handler.
 * @param {string} [options.wrapperModifierName=closed] - The wrapper modifier name.
 * @param {string} [options.handlerModifierName=active] - The handler modifier name.
 * @param {number} [options.breakPoint=992] - The media query at which modifiers should be removed.
 * @example
 * ```javascript
 * switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});
 * ```
 * @example
 * ```javascript
 * let options = {
 *      wrapperName: 'filters__form',
 *      handlerName: 'filters__toggle'
 *      wrapperModifierName: 'closed',
 *      handlerModifierName: 'active',
 *      breakPoint: 992
 * };
 * switchToggle(options);
 * ```
 */
let switchToggle = (options) => {
	let defaults = {
		wrapperModifierName: 'closed',
		handlerModifierName: 'active',
		breakPoint: 992
	};

	options = $.extend(defaults, options);

	let wrapper = document.querySelector('.' + options.wrapperName);
	let handler = document.querySelector('.' + options.handlerName);
	let wrapperModifier = options.wrapperName + '--' + options.wrapperModifierName;
	let handlerModifier = options.handlerName + '--' + options.handlerModifierName;
	let breakPoint = window.matchMedia('(min-width: ' + options.breakPoint + 'px)');

	try{
		if (breakPoint.matches) {
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
	switchToggle({wrapperName: 'header__navigation', handlerName: 'toggle'});

	// Toggles the filters
	switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});
};

window.onresize = () => {
	// Toggles the navigation menu
	switchToggle({wrapperName: 'header__navigation', handlerName: 'toggle'});

	// Toggles the filters
	switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});
};
