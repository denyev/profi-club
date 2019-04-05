'use strict';

import './vendor';

const tabletScreenWidth = window.matchMedia('(min-width: 992px)');

/**
 * Polyfill for IE11 missing NodeList.forEach
 */
(() => {
	if ('NodeList' in window && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (let i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
})();

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
 * switchMenuItem('.menu .menu__item', 'menu__item--active');
 * ```
 */
const switchMenuItem = (itemClass, activeClassName) => {
	let items = [...document.querySelectorAll(itemClass)];

	try {
		items.forEach((item) => {
			item.addEventListener('click', () => {
				let activeElement = document.querySelector(itemClass + '.' + activeClassName);

				activeElement.classList.remove(activeClassName);
				item.classList.add(activeClassName);
			});
		});
	} catch(error) {
		console.error(error);
	}
};

let galleryOptions = {
	items: 1,
	margin: 0,
	stagePadding: 0,
	loop: true,
	autoplay: 2000,
	autoplayHoverPause: true,
	dots: false,
	nav: false
};

const initGallery = (options) => {
	let gallery = $('.gallery');
	let prevButton = $('.gallery__arrow--left');
	let nextButton = $('.gallery__arrow--right');
	let defaults = {
		onInitialized: (event) => {
			slideCounter(event, '.gallery__count');
			setOwlStageHeight(gallery);
		},
		onTranslated: (event) => {
			slideCounter(event, '.gallery__count');
			setOwlStageHeight(gallery);
		},
		onResized: () => {
			setOwlStageHeight(gallery);
		},
	};

	options = $.extend(defaults, options);

	try {
		gallery.addClass('owl-carousel');

		gallery.owlCarousel(options);

		prevButton.on('click', () => {
			gallery.owlCarousel().trigger('prev.owl.carousel');
		});

		nextButton.on('click', () => {
			gallery.owlCarousel().trigger('next.owl.carousel');
		});
	} catch(error) {
		console.error(error);
	}
};

/**
 * @typedef {Object[]} event - The observable event.
 */

/**
 * Slide counter.
 * @param {event} event
 * @param {string} counter - The class name of the element
 *+ in which the ounter value should be displayed.
 * @example
 * ```
 * slideCounter(event, '.main-slider__count');
 * ```
 */
const slideCounter = (event, counter) => {
	let items = event.item.count;
	let item = event.item.index + 1;
	const zero = 0;
	const maxNumber = 10;

	try {
		if(item > items) {
			item = item - items;
		}

		if(item < maxNumber) {
			item = `${zero}${item}`;
		}

		if(items < maxNumber) {
			items = `${zero}${items}`;
		}

		$(counter).text(item + ' / ' + items);
	} catch(error) {
		console.error(error);
	}
};

const setOwlStageHeight = (carousel) => {
	let active = carousel.find('.owl-item.active .gallery__item-wrapper > .gallery__item');
	let setHeight = (active, carousel) => {
		let maxHeight = parseInt(active.height());

		carousel.css('height', maxHeight);
		carousel.find('.owl-stage-outer').css('height', maxHeight);
	};

	try {
		if(active.length > 0) {
			setHeight(active, carousel);
		} else {
			active = carousel.find('.owl-item.active > .gallery__item');

			setHeight(active, carousel);
		}
	} catch(error) {
		console.error(error);
	}
};

const destroyGallery = () => {
	let gallery = $('.gallery');

	gallery.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
	gallery.find('.owl-stage-outer').children().unwrap();
	gallery.find('.gallery__item-wrapper').children().unwrap();
	gallery.find('.gallery__item-container').children().unwrap();
};

const reorganizeGallery = () => {
	let items = $('.gallery .gallery__item');
	let step = 3;

	try {
		if (tabletScreenWidth.matches) {
			destroyGallery();

			for (let i = 0; i < items.length; i += step) {
				items.slice(i, i + step).wrapAll('<div class="gallery__item-wrapper"></div>');
			}

			let wrappers = $('.gallery__item-wrapper .gallery__item');
			let offset = 1;
			step = 2;

			for (let i = 0; i < wrappers.length; i += step + offset) {
				wrappers.slice(i, i + step).wrapAll('<div class="gallery__item-container"></div>');
			}

			initGallery(galleryOptions);
		} else {
			destroyGallery();
			initGallery(galleryOptions);
		}
	} catch(error) {
		console.error(error);
	}
};

const staffSlider = () => {
	let slider = $('.staff-slider__list');
	let prevButton = $('.staff-slider__arrow--left');
	let nextButton = $('.staff-slider__arrow--right');

	try {
		slider.owlCarousel({
			items: 1,
			margin: 30,
			stagePadding: 47,
			loop: true,
			autoplay: 2000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsive: {
				0: {
					items: 1
				},
				576: {
					items: 2
				},
				992: {
					items: 3,
					margin: 33,
					stagePadding: 0,
					dots: true,
					dotsEach: true
				}
			},
			onInitialized: setControlsTopPosition,
			onTranslated: setControlsTopPosition,
			onResized: setControlsTopPosition
		});

		prevButton.on('click', () => {
			slider.owlCarousel().trigger('prev.owl.carousel');
		});

		nextButton.on('click', () => {
			slider.owlCarousel().trigger('next.owl.carousel');
		});
	} catch(error) {
		console.error(error);
	}
};

/**
 * Positioning slider controls.
 */
const setControlsTopPosition = () => {
	let currentSlideImage = document.querySelector('.staff-slider__list .owl-item.active .staff-slider__img');
	let controlsTopPosition = Math.floor(currentSlideImage.height / 2);
	let controls = document.querySelector('.staff-slider__controls');

	try {
		controls.style.top = `${controlsTopPosition}px`;
	} catch(error) {
		console.error(error);
	}
};

const videoSlider = () => {
	let slider = $('.video-slider__list');

	try {
		slider.owlCarousel({
			items: 1,
			margin: 30,
			stagePadding: 47,
			loop: true,
			autoplay: 2000,
			autoplayHoverPause: true,
			dots: false,
			nav: false,
			responsive: {
				992: {
					margin: 0,
					stagePadding: 0
				},
				1366: {
					items: 2,
					margin: 33,
					stagePadding: 0
				}
			},
			onInitialized: () => {
				let sliderCaption = $('.video-slider__caption');

				sliderCaption.matchHeight();
				slideCounter(event, '.main-slider__count');
			},
			onTranslated: (event) => {
				$.fn.matchHeight._update();
				slideCounter(event, '.main-slider__count');
			},
			onResized: () => {
				$.fn.matchHeight._update();
				setVideoSize($('.video-slider__video'));
			}
		});
	} catch(error) {
		console.error(error);
	}
};

const setVideoSize = (video) => {
	try {
		if(tabletScreenWidth.matches) {
			video.css('width', '404');
			video.css('height', '562');
		} else {
			video.css('width', '226');
			video.css('height', '314');
		}
	} catch(error) {
		console.error(error);
	}
};

const blockquoteSlider = () => {
	let slider = $('.blockquote-slider');

	try {
		slider.owlCarousel({
			items: 1,
			margin: 17,
			loop: true,
			autoplay: 2000,
			autoplayHoverPause: true,
			dots: true,
			nav: false,
			responsive: {
				992: {
					margin: 33,
					dots: false
				}
			}
		});
	} catch(error) {
		console.error(error);
	}

	mainSliderControls(slider);
};

const setHeightBlockquoteSliderItem = () => {
	let item = $('.blockquote-slider__item');
	let target = $('.video-slider__video.lazyloaded');

	try {
		if(tabletScreenWidth.matches) {
			item.matchHeight({
				target: target
			});
		}
	} catch(error) {
		console.error(error);
	}
};

const mainSliderControls = (slider) => {
	let mainSlider = $('.main-slider');
	let prevButton = slider.closest(mainSlider).find('.main-slider__arrow--left');
	let nextButton = slider.closest(mainSlider).find('.main-slider__arrow--right');

	try {
		if(tabletScreenWidth.matches) {
			prevButton.on('click', () => {
				slider.owlCarousel().trigger('prev.owl.carousel');
			});

			nextButton.on('click', () => {
				slider.owlCarousel().trigger('next.owl.carousel');
			});
		}
	} catch(error) {
		console.error(error);
	}
};

window.onload = () => {
	reorganizeGallery();

	staffSlider();

	videoSlider();

	blockquoteSlider();

	// Toggles the navigation menu
	switchToggle({wrapperName: 'header__navigation', handlerName: 'toggle'});

	// Toggles the filters
	switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});

	// Toggles the view of job list items.
	switchJobView(tabletScreenWidth);

	switchMenuItem('.intro__top-menu .top-menu .top-menu__link', 'top-menu__link--active');

	switchMenuItem('.main__menu .top-menu .top-menu__link', 'top-menu__link--active');

	document.addEventListener('lazyloaded', () => {
		setControlsTopPosition();
		setOwlStageHeight($('.gallery'));
		setVideoSize($('.video-slider__video'));
		setHeightBlockquoteSliderItem();
	});
};

window.onresize = () => {
	reorganizeGallery();

	// Toggles the navigation menu
	switchToggle({wrapperName: 'header__navigation', handlerName: 'toggle'});

	// Toggles the filters
	switchToggle({wrapperName: 'filters__form', handlerName: 'filters__toggle'});

	// Toggles the view of job list items.
	switchJobView(tabletScreenWidth);
};
