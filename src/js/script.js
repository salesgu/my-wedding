(function($) {
	'use strict';

	/*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
	// Check ie and version
	function isIE() {
		var myNav = navigator.userAgent.toLowerCase();
		return myNav.indexOf('msie') != -1
			? parseInt(myNav.split('msie')[1], 10)
			: false;
	}

	// Toggle mobile navigation
	function toggleMobileNavigation() {
		var navbar = $('.navigation-holder');
		var openBtn = $('.navbar-header .open-btn');
		var closeBtn = $('.navigation-holder .close-navbar');
		var navLinks = $("#navbar > ul > li > a[href^='#']");

		openBtn.on('click', function() {
			if (!navbar.hasClass('slideInn')) {
				navbar.addClass('slideInn');
			}
			return false;
		});

		closeBtn.on('click', function() {
			if (navbar.hasClass('slideInn')) {
				navbar.removeClass('slideInn');
			}
			return false;
		});

		navLinks.on('click', function() {
			if (navbar.hasClass('slideInn')) {
				navbar.removeClass('slideInn');
			}
			return false;
		});
	}

	toggleMobileNavigation();

	// Function for toggle a class for small menu
	function toggleClassForSmallNav() {
		var windowWidth = window.innerWidth;
		var mainNav = $('#navbar > ul');

		if (windowWidth <= 991) {
			mainNav.addClass('small-nav');
		} else {
			mainNav.removeClass('small-nav');
		}
	}

	toggleClassForSmallNav();

	// Function for small menu
	function smallNavFunctionality() {
		var windowWidth = window.innerWidth;
		var mainNav = $('.navigation-holder');
		var smallNav = $('.navigation-holder > .small-nav');
		var subMenu = smallNav.find('.sub-menu');
		var megamenu = smallNav.find('.mega-menu');
		var menuItemWidthSubMenu = smallNav.find('.menu-item-has-children > a');

		if (windowWidth <= 991) {
			subMenu.hide();
			megamenu.hide();
			menuItemWidthSubMenu.on('click', function(e) {
				var $this = $(this);
				$this.siblings().slideToggle();
				e.preventDefault();
				e.stopImmediatePropagation();
			});
		} else if (windowWidth > 991) {
			mainNav.find('.sub-menu').show();
			mainNav.find('.mega-menu').show();
		}
	}

	smallNavFunctionality();

	// function for active menuitem
	function activeMenuItem($links) {
		var top = $(window).scrollTop(),
			windowHeight = $(window).height(),
			documentHeight = $(document).height(),
			cur_pos = top + 2,
			sections = $('section'),
			nav = $links,
			nav_height = nav.outerHeight();

		sections.each(function() {
			var top = $(this).offset().top - nav_height,
				bottom = top + $(this).outerHeight();

			if (cur_pos >= top && cur_pos <= bottom) {
				nav
					.find('> ul > li > a')
					.parent()
					.removeClass('current-menu-item');
				nav
					.find("a[href='#" + $(this).attr('id') + "']")
					.parent()
					.addClass('current-menu-item');
			} else if (cur_pos === 2) {
				nav
					.find('> ul > li > a')
					.parent()
					.removeClass('current-menu-item');
			}
		});
	}

	// smooth-scrolling
	function smoothScrolling($scrollLinks, $topOffset) {
		var links = $scrollLinks;
		var topGap = $topOffset;

		links.on('click', function() {
			if (
				location.pathname.replace(/^\//, '') ===
					this.pathname.replace(/^\//, '') &&
				location.hostname === this.hostname
			) {
				var target = $(this.hash);
				target = target.length
					? target
					: $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate(
						{
							scrollTop: target.offset().top - topGap
						},
						1000,
						'easeInOutExpo'
					);
					return false;
				}
			}
			return false;
		});
	}

	// Parallax background
	function bgParallax() {
		if ($('.parallax').length) {
			$('.parallax').each(function() {
				var height = $(this).position().top;
				var resize = height - $(window).scrollTop();
				var parallaxSpeed = $(this).data('speed');
				var doParallax = -(resize / parallaxSpeed);
				var positionValue = doParallax + 'px';
				var img = $(this).data('bg-image');

				$(this).css({
					backgroundImage: 'url(' + img + ')',
					backgroundPosition: '50%' + positionValue,
					backgroundSize: 'cover'
				});

				if (window.innerWidth < 768) {
					$(this).css({
						backgroundPosition: 'center center'
					});
				}
			});
		}
	}

	bgParallax();

	// Hero slider background setting
	function sliderBgSetting() {
		if ($('.hero-slider .slide-item').length) {
			$('.hero-slider .slide-item').each(function() {
				var $this = $(this);
				var img = $this.find('.slider-bg').attr('src');

				$this.css({
					backgroundImage: 'url(' + img + ')',
					backgroundSize: 'cover',
					backgroundPosition: 'center center'
				});
			});
		}
	}

	//Setting hero slider
	function heroSlider() {
		if ($('.hero-slider').length) {
			$('.hero-slider').slick({
				arrows: false,
				dots: false,
				fade: true,
				speed: 1000,
				autoplay: true,
				autoplaySpeed: 3000
			});
		}
	}

	// set two coloumn height equial
	function setTwoColEqHeight($col1, $col2) {
		var firstCol = $col1,
			secondCol = $col2,
			firstColHeight = $col1.innerHeight(),
			secondColHeight = $col2.innerHeight();

		if (firstColHeight > secondColHeight) {
			secondCol.css({
				height: firstColHeight + 1 + 'px'
			});
		} else {
			firstCol.css({
				height: secondColHeight + 1 + 'px'
			});
		}
	}

	function popupSaveTheDateCircle() {
		var saveTheDateCircle = $('.save-the-date');
		saveTheDateCircle.addClass('popup-save-the-date');
	}

	/*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
	function preloader() {
		if ($('.preloader').length) {
			$('.preloader')
				.delay(100)
				.fadeOut(500, function() {
					//active wow
					wow.init();

					if ($('.save-the-date').length) {
						popupSaveTheDateCircle();
					}

					//Active heor slider
					heroSlider();
				});
		}
	}

	/*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
	var wow = new WOW({
		boxClass: 'wow', // default
		animateClass: 'animated', // default
		offset: 0, // default
		mobile: true, // default
		live: true // default
	});

	/*------------------------------------------
        = ACTIVE POPUP GALLERY
    -------------------------------------------*/
	if ($('.gallery-fancybox').length) {
		$('.fancybox').fancybox({
			openEffect: 'elastic',
			closeEffect: 'elastic',
			wrapCSS: 'project-fancybox-title-style'
		});
	}

	/*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
	if ($('.video-play-btn').length) {
		$('.video-play-btn').on('click', function() {
			$.fancybox({
				href: this.href,
				type: $(this).data('type'),
				title: this.title,
				helpers: {
					title: { type: 'inside' },
					media: {}
				},

				beforeShow: function() {
					$('.fancybox-wrap').addClass('gallery-fancybox');
				}
			});
			return false;
		});
	}

	/*------------------------------------------
        = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	/*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
	if ($('.popup-gallery').length) {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',

			gallery: {
				enabled: true
			},

			zoom: {
				enabled: true,

				duration: 300,
				easing: 'ease-in-out',
				opener: function(openerElement) {
					return openerElement.is('img')
						? openerElement
						: openerElement.find('img');
				}
			}
		});
	}

	/*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
	if ($('.popup-image').length) {
		$('.popup-image').magnificPopup({
			type: 'image',
			zoom: {
				enabled: true,

				duration: 300,
				easing: 'ease-in-out',
				opener: function(openerElement) {
					return openerElement.is('img')
						? openerElement
						: openerElement.find('img');
				}
			}
		});
	}

	/*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
	function sortingGallery() {
		if ($('.sortable-gallery .gallery-filters').length) {
			var $container = $('.gallery-container');
			$container.isotope({
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			$('.gallery-filters li a').on('click', function() {
				$('.gallery-filters li .current').removeClass('current');
				$(this).addClass('current');
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
				return false;
			});
		}
	}

	sortingGallery();

	/*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
	function masonryGridSetting() {
		if ($('.masonry-gallery').length) {
			var $grid = $('.masonry-gallery').masonry({
				itemSelector: '.grid',
				columnWidth: '.grid',
				percentPosition: true
			});

			$grid.imagesLoaded().progress(function() {
				$grid.masonry('layout');
			});
		}
	}

	masonryGridSetting();

	/*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

	// Function for clone an element for sticky menu
	function cloneNavForSticyMenu($ele, $newElmClass) {
		$ele
			.addClass('original')
			.clone()
			.insertAfter($ele)
			.addClass($newElmClass)
			.removeClass('original');
	}

	// clone home style 1 navigation for sticky menu
	if ($('.header-style-1 .navigation').length) {
		cloneNavForSticyMenu($('.header-style-1 .navigation'), 'sticky');
	}

	// clone home style 1 navigation for sticky menu
	if ($('.header-style-2 .navigation').length) {
		cloneNavForSticyMenu($('.header-style-2 .navigation'), 'sticky-2');
	}

	// Function for sticky menu
	function stickIt($stickyClass, $toggleClass, $topOffset) {
		if ($(window).scrollTop() >= $topOffset) {
			var orgElement = $('.original');
			var widthOrgElement = orgElement.css('width');

			$stickyClass.addClass($toggleClass);

			$stickyClass
				.css({
					width: widthOrgElement
				})
				.show();

			$('.original').css({
				visibility: 'hidden'
			});
		} else {
			$('.original').css({
				visibility: 'visible'
			});

			$stickyClass.removeClass($toggleClass);
		}
	}

	/*-------------------------------------------------------
        = COUPLE SECTION IMAGE BG SETTING
    -----------------------------------------------------*/
	if ($('.wedding-couple-section .gb').length) {
		var imgHolder = $('.wedding-couple-section .gb .img-holder');

		imgHolder.each(function() {
			var $this = $(this);
			var imgHolderPic = $this.find('img').attr('src');

			$this.css({
				backgroundImage: 'url(' + imgHolderPic + ')',
				backgroundSize: 'cover',
				backgroundPosition: 'center center'
			});
		});
	}

	/*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
	if ($('#clock').length) {
		$('#clock').countdown('2021/06/05', function(event) {
			var $this = $(this).html(
				event.strftime(
					'' +
						'<div class="box"><div>%D</div> <span>Dias</span> </div>' +
						'<div class="box"><div>%H</div> <span>Horas</span> </div>' +
						'<div class="box"><div>%M</div> <span>Minutos</span> </div>' +
						'<div class="box"><div>%S</div> <span>Segundos</span> </div>'
				)
			);
		});
	}

	/*------------------------------------------
        = STORY SLIDER
    -------------------------------------------*/
	if ($('.story-slider').length) {
		$('.story-slider').owlCarousel({
			items: 1,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			smartSpeed: 1000,
			loop: true
		});
	}

	/*------------------------------------------
        = GIFT REGISTRATION SLIDER
    -------------------------------------------*/
	if ($('.gif-registration-slider').length) {
		// $('.gif-registration-slider').owlCarousel({
		// 	items: 2,
		// 	dots: false,
		// 	autoplay: true,
		// 	autoplayTimeout: 3000,
		// 	smartSpeed: 1000,
		// 	loop: true,
		// 	margin: 20,
		// 	stagePadding: 10,
		// 	responsive: {
		// 		0: {
		// 			items: 1
		// 		},
		// 		480: {
		// 			items: 2
		// 		},
		// 		768: {
		// 			items: 3
		// 		}
		// 	}
		// });
	}

	/*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
	function normalizeName(value) {
		return value
			.trim()
			.toLowerCase()
			.replace(/[áàãâä]/g, 'a')
			.replace(/[éèêë]/g, 'e')
			.replace(/[íìîï]/g, 'i')
			.replace(/[óòõôö]/g, 'o')
			.replace(/[úùûü]/g, 'u')
			.replace(/[ç]/g, 'c')
			.replace(/_+/, '_');
	}

	if ($('#rsvp-form').length) {
		const db = firebase.firestore();
		const familiesRef = db.collection('families');
		var family = null;

		$('#rsvp-form').validate({
			rules: {
				name: {
					required: true
				}
			},

			messages: {
				name: 'Por favor, digite o seu nome completo'
			},

			submitHandler: function(form) {
				const $guests = $('#guests-names');
				const guests = $guests.text();

				if (
					$guests.is(':visible') &&
					confirm('Deseja confirmar a presença para ' + guests)
				) {
					$('#loader').css('display', 'inline-block');
					$('#guests')
						.stop()
						.slideUp('slow');

					gtag('event', 'rsvp_submitted');

					familiesRef
						.doc(family.id)
						.update({ confirmed: true })
						.then(function() {
							$('.confirm-presence-input').val('');
							$('#guests')
								.stop()
								.slideUp('fast');
							$('.submit-btn').hide();
							$('#loader').hide();
							$('#success')
								.html(
									'A presença para <strong>' +
										guests +
										'</strong> foi confirmada, obrigado!'
								)
								.stop()
								.slideDown('slow');
							form.reset();
							gtag('event', 'rsvp_submitted_success');
						})
						.catch(function() {
							$('#loader').hide();
							$('#error')
								.stop()
								.slideDown('slow');
							setTimeout(function() {
								$('#error')
									.stop()
									.slideUp('slow');
							}, 3000);
							gtag('event', 'rsvp_submitted_error');
						});
				}

				return false; // required to block normal submit since you used ajax
			}
		});

		/*------------------------------------------
      = RSVP FIND FAMILY
  -------------------------------------------*/
		const params = new URLSearchParams(location.search);
		const guestParam = params.get('guest');
		const $confirmPresenceInput = $('.confirm-presence-input');
		const $searchFamily = $('.search-family-btn');

		function findAndConfirmPresence() {
			const value = normalizeName($confirmPresenceInput.val());

			$('#success, #error, #guests')
				.stop()
				.slideUp('fast');
			$('.submit-btn').hide();

			familiesRef
				.where('normalizedNames', 'array-contains', value)
				.get()
				.then(function(querySnapshot) {
					family = null;

					querySnapshot.forEach(function(doc) {
						if (doc.id) {
							family = doc.data().normalizedNames.indexOf(value) !== -1 && {
								id: doc.id,
								...doc.data()
							};
							return false;
						}
					});

					if (family) {
						if (family.confirmed) {
							$('#success')
								.html('A presença da sua família já foi confirmada!')
								.stop()
								.slideDown('slow');
						} else {
							const lastName = family.names.pop();
							const result =
								family.names.join(', ') +
								(family.names.length > 0 ? ' e ' : '') +
								lastName;

							$('#guests-names').html(result);

							$('#guests')
								.stop()
								.slideDown('slow');
							$('.submit-btn').show();
						}
					} else {
						$('#loader').hide();
						$('#error span').html(
							'Não achamos nenhum registro, por favor confira seu nome completo e tente novamente.'
						);
						$('#error')
							.stop()
							.slideDown('slow');
					}
				})
				.catch(function() {
					$('#loader').hide();
					$('#error span').html(
						'Ocorreu algum erro, por favor confira seu nome e tente novamente.'
					);
					$('#error')
						.stop()
						.slideDown('slow');
				});
		}

		if (guestParam) {
			familiesRef
				.doc(guestParam)
				.get()
				.then(docRef => {
					const family = docRef.data();

					if (family) {
						$confirmPresenceInput.val(family.names[0]);
						findAndConfirmPresence();
						setTimeout(() => {
							$('[href="#rsvp"]').trigger('click');
						}, 1000);
					} else {
						console.log('no data');
					}
				});
		}

		$searchFamily.on('click', findAndConfirmPresence);
	}

	/*------------------------------------------
        = TOGGLE MUSUC BIX
    -------------------------------------------*/
	if ($('.music-box').length) {
		var musicBtn = $('.music-box-toggle-btn'),
			musicBox = $('.music-holder');

		musicBtn.on('click', function() {
			musicBox.toggleClass('toggle-music-box');
			return false;
		});
	}

	/*------------------------------------------
        = BACK TO TOP
    -------------------------------------------*/
	if ($('.back-to-top-btn').length) {
		$('.back-to-top-btn').on('click', function() {
			$('html,body').animate(
				{
					scrollTop: 0
				},
				2000,
				'easeInOutExpo'
			);
			return false;
		});
	}

	/*------------------------------------------
        = BLOG MEDIA CAROUSEL
    -------------------------------------------*/
	if ($('.media-carousel').length) {
		$('.media-carousel').owlCarousel({
			items: 1,
			smartSpeed: 500,
			nav: true,
			navText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			],
			dots: false
		});
	}

	/*------------------------------------------
        = WATER RIPPLE
    -------------------------------------------*/
	if ($('.ripple').length) {
		$('.ripple').ripples({
			resolution: 512,
			dropRadius: 20, //px
			perturbance: 0.04
		});

		// Automatic drops
		setInterval(function() {
			var $el = $('.ripple');
			var x = Math.random() * $el.outerWidth();
			var y = Math.random() * $el.outerHeight();
			var dropRadius = 20;
			var strength = 0.04 + Math.random() * 0.04;

			$el.ripples('drop', x, y, dropRadius, strength);
		}, 400);
	}

	/*------------------------------------------
        = PARTICLE GROUND
    -------------------------------------------*/
	if ($('.particleground').length) {
		$('.particleground').particleground({
			dotColor: '#78c1b3',
			lineColor: '#5e9a8e',
			lineWidth: 0.7,
			particleRadius: 6
		});
	}

	/*------------------------------------------
        = VIDEO BACKGROUND
    -------------------------------------------*/
	if ($('#video-background').length) {
		$('#video-background').YTPlayer({
			showControls: false,
			playerVars: {
				modestbranding: 0,
				autoplay: 1,
				controls: 1,
				showinfo: 0,
				wmode: 'transparent',
				branding: 0,
				rel: 0,
				autohide: 0,
				origin: window.location.origin
			}
		});
	}

	/*------------------------------------------
        = SURFACE SHADER
    -------------------------------------------*/
	if ($('.surface-shader').length) {
		//$('.surface-shader')
	}

	/*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
	$(window).on('load', function() {
		preloader();

		sliderBgSetting();

		toggleMobileNavigation();

		smallNavFunctionality();

		//set the couple section groom bride two col equal height
		if ($('.wedding-couple-section').length) {
			setTwoColEqHeight(
				$('.wedding-couple-section .gb .img-holder'),
				$('.wedding-couple-section .gb .details')
			);
		}

		smoothScrolling(
			$("#navbar > ul > li > a[href^='#']"),
			$('.header-style-1 .navigation').innerHeight()
		);
	});

	/*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
	$(window).on('scroll', function() {
		bgParallax();

		activeMenuItem($('.navigation-holder'));

		if ($('.header-style-1').length) {
			stickIt(
				$('.sticky'),
				'sticky-on',
				$('.header-style-1 .navigation').offset().top
			);
		}

		if ($('.header-style-2').length) {
			stickIt($('.sticky-2'), 'sticky-on', 300);
		}
	});

	/*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
	$(window).on('resize', function() {
		toggleClassForSmallNav();
		//smallNavFunctionality();

		clearTimeout($.data(this, 'resizeTimer'));
		$.data(
			this,
			'resizeTimer',
			setTimeout(function() {
				smallNavFunctionality();
			}, 200)
		);
	});

	$('[data-toggle="tooltip"]').tooltip();

	/*==========================================================================
        TRACKING
    ==========================================================================*/
	$('[data-gift-list-name]').on('click', function() {
		const listName = $(this).data('gift-list-name');

		gtag('event', 'page_view', {
			page_title: listName
		});
	});

	$('.menu-item').on('click', function() {
		const page = $(this)
			.attr('href')
			.replace('#', '');

		gtag('event', 'page_view', {
			page_title: page
		});
	});
})(window.jQuery);
