'use strict';

import './vendor';

const tabletScreenWidth = window.matchMedia('(min-width: 992px)');

/**
 * Search form.
 */
try {
	const searchFields = Array.prototype.slice.call(document.querySelectorAll('.search__field'));

	searchFields.forEach((searchField) => {
		searchField.addEventListener('change', () => {
			let fieldValue = searchField.value;

			if (fieldValue.length !== 0) {
				searchField.classList.add('js-hasvalue');
			} else {
				searchField.classList.remove('js-hasvalue');
			}
		});
	});
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
		if(wrapper) {
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
		}
	} catch(error) {
		console.error(error);
	}
};

/**
 * Toggles the view of job list items.
 *
 * @param {Object} breakPointValue - The result of the method of `Window.matchMedia()`.
 * @example
 * ```javascript
 * switchJobView(window.matchMedia('(min-width: 992px)'));
 * ```
 */
let switchJobView = (breakPointValue) => {
	let wrapper = document.querySelector('.catalog__list');
	let handlers = document.querySelectorAll('.catalog__view-btn');
	let handlerList = document.querySelector('.catalog__view-btn--list');
	let handlerGrid = document.querySelector('.catalog__view-btn--grid');
	let wrapperModifier = 'catalog__list--grid';
	let handlerModifier = 'catalog__view-btn--active';

	try{
		if(wrapper) {
			if (breakPointValue.matches) {
				// Default view.
				wrapper.classList.remove(wrapperModifier);
				handlerGrid.classList.remove(handlerModifier);
				handlerList.classList.add(handlerModifier);
				handlers.forEach((handler) => {
					handler.addEventListener('click', (event) => {
						event.preventDefault();
						if (handlerGrid.classList.contains(handlerModifier)) {
							// View, `handlerList` is pressed.
							wrapper.classList.remove(wrapperModifier);
							handlerGrid.classList.remove(handlerModifier);
							handlerList.classList.add(handlerModifier);
						} else {
							// View, `handlerGrid` is pressed.
							wrapper.classList.add(wrapperModifier);
							handlerGrid.classList.add(handlerModifier);
							handlerList.classList.remove(handlerModifier);
						}
					});
				});
			} else {
				wrapper.classList.remove(wrapperModifier);
				handlerList.classList.remove(handlerModifier);
				handlerGrid.classList.remove(handlerModifier);
			}
		}
	} catch(error) {
		console.error(error);
	}
};

/**
 * Toggles active item modifier for menu items.
 *
 * @param {string} itemClass - A menu item class name.
 * @param {string} activeClassName - The name of the active menu item modifier.
 * @example
 * ```
 * switchTopMenu('.menu__item', 'menu__item--active');
 * ```
 */
const switchMenuItem = (itemClass, activeClassName) => {
	let items = [...document.querySelectorAll(itemClass)];

	try {
		items.forEach((item) => {
			item.addEventListener('click', () => {
				let activeElement = document.querySelector('.' + activeClassName);

				activeElement.classList.remove(activeClassName);
				item.classList.add(activeClassName);
			});
		});
	} catch(error) {
		console.error(error);
	}
};

switchMenuItem('.top-menu__link', 'top-menu__link--active');

const gallery = () => {
	try {
		$('.gallery').owlCarousel({
			items: 1,
			loop: true,
			dotsClass: false,
			nav: true,
			navContainerClass: 'gallery__controls',
			navClass: [
				'gallery__arrow gallery__arrow--left',
				'gallery__arrow gallery__arrow--right'
			]
		});
	} catch(error) {
		console.error(error);
	}
};

gallery();

window.onload = () => {
	// Toggles the navigation menu
	switchToggle({wrapperName: 'header__navigation', handlerName: 'toggle'});

	// Toggles the filters
	switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});

	// Toggles the view of job list items.
	switchJobView(tabletScreenWidth);
};

window.onresize = () => {
	// Toggles the navigation menu
	switchToggle({wrapperName: 'header__navigation', handlerName: 'toggle'});

	// Toggles the filters
	switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});

	// Toggles the view of job list items.
	switchJobView(tabletScreenWidth);
};
