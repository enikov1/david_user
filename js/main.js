$(function () {

	// Добавляем sticky класс при скролле

	$(window).scroll(function() {

		let posi = 140,
			sticky_block = $('.sticky-block');

		($(this).scrollTop() >= posi) ? sticky_block.addClass('active') : sticky_block.removeClass('active');

	});

	// 

	// Слайдер

	function glidePage(event) {
		let countSliderMax = event.slick("getSlick").slideCount,
			countSliderActiveNum = event.slick('slickCurrentSlide') + 1,
			countSliderText = countSliderActiveNum + ' of ' + countSliderMax;

		$('[data-slider-pageCount]').attr('data-slider-pageCount', countSliderText);
		$('[data-slider-pageCount]').html(countSliderText);
	}

	let carousel_image = $('.carousel-items');

	if(carousel_image) {
		carousel_image.slick({
			// infinite: false,
			accessibility: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			appendArrows: carousel_image.parent(),
			prevArrow: '<div class="absolute h-full top-0 left-3"><button data-slider-prev="true" class="absolute z-10 at-center-y left-0 ml-1 w-12 h-12 bg-white shadow border-gray-200 border-2 rounded-full text-center" type="button"><img class="relative -top-px w-3 inline-block" src="./img/svg/icon-left-arrow-black.svg" width="12" height="20"></button></div>',
			nextArrow: '<div class="absolute h-full top-0 right-16"><button data-slider-next="true" class="absolute z-10 at-center-y left-0 ml-1 w-12 h-12 bg-white shadow border-gray-200 border-2 rounded-full text-center" type="button"><img class="relative -top-px w-3 inline-block" src="./img/svg/icon-right-arrow.svg" width="12" height="20"></button></div>',
		});

		glidePage(carousel_image);

		$('[data-slider-prev]').on('click', function() {
			carousel_image.slick('slickPrev');
			glidePage(carousel_image);
		});

		$('[data-slider-next]').on('click', function() {
			carousel_image.slick('slickNext');
			glidePage(carousel_image);
		});

		$('[data-slider-active]').on('click', function() {
			$('.carousel-items .carousel-slide').eq(carousel_image.slick('slickCurrentSlide') + 1).find('img').click();
		});
	}

	let carousel_card = $('#carousel-card');

	if(carousel_card) {
		carousel_card.slick({
			// infinite: false,
			accessibility: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			swipeToSlide: true,
			appendArrows: carousel_card.parent(),
			prevArrow: '<div class="absolute h-full top-0 left-3"><button data-card-prev="true" class="absolute z-10 at-center-y left-0 ml-1 w-12 h-12 bg-white shadow border-gray-200 border-2 rounded-full text-center" type="button"><img class="relative -top-px w-3 inline-block" src="./img/svg/icon-left-arrow-black.svg" width="12" height="20"></button></div>',
			nextArrow: '<div class="absolute h-full top-0 right-16"><button data-card-next="true" class="absolute z-10 at-center-y left-0 ml-1 w-12 h-12 bg-white shadow border-gray-200 border-2 rounded-full text-center" type="button"><img class="relative -top-px w-3 inline-block" src="./img/svg/icon-right-arrow.svg" width="12" height="20"></button></div>',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});

		$('[data-card-prev]').on('click', function() {
			carousel_card.slick('slickPrev');
		});

		$('[data-card-next]').on('click', function() {
			carousel_card.slick('slickNext');
		});
	}

	// glightbox

	const lightbox = GLightbox({
		touchNavigation: true,
		loop: true,
		autoplayVideos: true
	});

	// Показываем полное описаине на странице объекта

	// $('#show-info').on('click', function() {

	// 	let _self = $(this),
	// 		textButton = _self.find('span');

	// 	_self.toggleClass('expanded');

	// 	$('.article-content-text').toggleClass('active');

	// 	(_self.hasClass('expanded')) ? textButton.text('Show less') : textButton.text('Show more');
	// });


	let ellipsesText = "...";
	let expandText = "Show more";
	let collapseText = "Show less";
	$('.expandable-text').each(function() {
		let content = $(this).html();
		let collapseLimit = $(this).data('collapse-limit');
		if(content.length > collapseLimit) {
		let collapsedContent = content.substr(0, collapseLimit);
		let expandedContent = content.substr(collapseLimit-1, content.length - collapseLimit);
			$(this).empty();
			$(this).append($('<p />').addClass('collapsed-content').html(collapsedContent + '<span class="ellipses">...</span>'));
			// $(this).append($('<span />').addClass('ellipses').html(ellipsesText));
			$(this).append($('<p />').addClass('expanded-content').html(expandedContent));
			// $(this).append($('<button />').addClass('trigger').html(expandText));
		}
	});

	$(".article-content-trigger").on('click', function(){
		if($('.expanded-content').is(":visible")) {
			$(this).removeClass('expanded');
			$(this).find('span').text(expandText);
		} else {
			$(this).addClass('expanded');
			$(this).find('span').text(collapseText);
		}
		$(this).siblings('.expandable-text').find('.ellipses').toggle();
		$(this).siblings('.expandable-text').find('.expanded-content').toggle();
	});

	// 

	// Показываем скрытые элементы в блоке "Key features"

	$('.expandable-trigger').on('click', function() {
		$('.article-table-preview').toggleClass('collapsed');

		$(this).toggleClass('expandable-hidden expandable-active');

		($(this).hasClass('expandable-active')) ? $(this).find('span').text('See less key features') : $(this).find('span').text('See more key features');
	});

	// 

	// Делаем submit активным только при вводе символов

	$('.search-reference .field').keyup(function() {
		let count = $(this).val().length,
			button = $(this).next('button');

		if(count > 3) button.removeClass('disabled').removeAttr('disabled').addClass('btn-blue');
		else button.addClass('disabled').attr('disabled').removeClass('btn-blue');
	});

	$('#search-reference-sm-target .field').keyup(function() {
		let count = $(this).val().length,
			button = $('#input-search-ref-sm');

		if(count > 3) button.removeClass('disabled').removeAttr('disabled').addClass('btn-blue');
		else button.addClass('disabled').attr('disabled').removeClass('btn-blue');
	});

	// 

	// Показываем блок Share

	$('#open-share').on('click', function() {
		$('#share-panel').toggle();

		$('#modal-share').fadeIn();
	});

	$(window).on('resize', function() {
		$('#modal-share').fadeOut();
		$('#share-panel').fadeOut();
	});

	$('[data-target-copy-link="true"]').on('click', function() {
		$('[data-trigger-copy-link="true"]').removeClass('hidden');

		setTimeout(function() {
			$('[data-trigger-copy-link="true"]').addClass('hidden');
		}, 2000);
	});

	$('#modal-share button').on('click', function() {
		$(this).parent('#modal-share').fadeOut();
	});

	// 

	// Фильтр поиска

	

	function loadSearchResult(elem) {
		let search_width = elem.closest('.search').width(),
			search_left = elem.offset().left,
			search_top = elem.offset().top + 53;
		
		$('#autosuggest-1').css({
			'position': 'absolute',
			'top': search_top,
			'left': search_left,
			'width':search_width,
			'z-index': '99',
			'display': 'block',
		});

		$('#autosuggest-1').find('.autosuggest-item').on('click', function() {
			let textSearch = $(this).find('.leading-tight span:first-child').text();

			$('.form-search-input').val(textSearch);
			$('.form-search-input').closest('.search').find('.form-reset').removeClass('hidden');
		});

		$('.form-reset').on('click', function() {
			$(this).addClass('hidden');
		});

	}

	$('.form-reset').on('click', function() {
		$('#autosuggest-1').fadeOut();
	});

	$('.form-search-input').on('input', function() {
		loadSearchResult($(this));

		if($(this).val().length == 0) $(this).closest('.search').find('.form-reset').addClass('hidden');
	});

		

	$('.search-dropdown-btn').each(function() {

		const btn = $(this);
		let count = 0;

		btn.on('click', function(e){

			let target_null = e.target.closest('.search-dropdown-content');

			if(target_null == null) {
				
				if($(this).closest('.search-dropdown').hasClass('active')) {
					$(this).closest('.search-dropdown').removeClass('active');
				} else {
					$('.search-dropdown.active').removeClass('active');
					$(this).closest('.search-dropdown').addClass('active');
				}

			}
			
		});

		btn.find('.checkbox-field-input').each(function() {

			let _this = $(this);

			_this.on('change', function() {
				if(_this.is(':checked')) {
					count++;
				 } else {
					 count--;
					 if(count == 0) {
						 btn.find('.count-checked-event').fadeOut();
					 }
				 }

				 if(count >= 1) {
					btn.find('.count-checked-event').css('display', 'flex').text(count);
				 }
			});
		});

		btn.find('.select-field').each(function() {

			let _this = $(this),
				select_count = _this.closest('.search-dropdown-content').find('.select-field').length;

			_this.on('change', function() {
				
				
				

				if(_this.val() != "default" && !_this.hasClass('selected')) {

					if(count < select_count) count++;
					_this.addClass('selected');
					
				 } else {
					//  _this.removeClass('selected');
					 if(_this.val() == "default") {
						 _this.removeClass('selected');
						 count--;
					 }
					
					 
					 if(count == 0) {
						 btn.find('.count-checked-event').fadeOut();
					 }
				 }

				 if(count >= 1) {
					btn.find('.count-checked-event').css('display', 'flex').text(count);
				 }
			});
		});

	});

	
		let div = $(".search-dropdown-content");

		$(document).mouseup(function (e){
			if($('.search-dropdown').hasClass('active')) {
				// console.log(e.target.closest('.search-dropdown-btn-wrap'));
				if(e.target.closest('.search-dropdown-btn-wrap') == null) {
					if(!div.is(e.target) && div.has(e.target).length === 0) {
						$('.search-dropdown.active').removeClass('active');
					}
				}
			}
			
		});

	

	

	// Active search form

	$('#active-refence-search').on('click', function() {
		$('.search-dropdown.active').removeClass('active');

		$('#search-default').hide();
		$('.search-reference').fadeIn();
	});

	$('#return-default-search').on('click', function() {
		$('.search-reference').hide();
		$('#search-default').fadeIn();
		
	});

	$('#active-refence-search-sm').on('click', function() {
		$('#search-reference-sm-target').css('display', 'flex');
	});

	$('#close-search-reference-sm').on('click', function() {
		$('#search-reference-sm-target').css('display', 'none');
	});

	// Mobile
	
	$('[data-target-recomended]').on('click', function() {
		$('[data-trigger-recomended]').fadeIn();
	});

	$('[data-target-sort]').on('click', function() {
		$('[data-trigger-sort]').fadeIn();
	});

	// Close popup

	$('.panel-dropup-close').on('click', function() {
		$('[data-mobile-modal]').fadeOut();
	});
	

	// Order by

	$('#button-list-drop').on('click', function() {

		$(this).toggleClass('rounded-full rounded-tl-xl rounded-tr-xl').find('#button-list-arrow').toggleClass('active');

		$('#list-drop').toggleClass('hidden');
	});

	// 

	// Окно подписки

	// if($('#modal-subs')) {
	// 	setTimeout(function() {
	// 		$('#modal-subs').fadeIn();
	// 	}, 7000);

	// 	$('#close-modal-subs').on('click', function() {
	// 		$('#modal-subs').fadeOut();
	// 	});

	// 	$(document).mouseup(function (e){
	// 		var div = $("#modal-subs .rounded-card");
	// 		if (!div.is(e.target)
	// 			&& div.has(e.target).length === 0) {
	// 			$('#modal-subs').fadeOut();
	// 		}
	// 	});
	// }

	

	// 

	// Показываем блоки у верхнего меню

	$('a[data-target="drop.trigger"]').parent().hover(function() {

		$(this).children('a').addClass('trigger-menu').next('div').removeAttr('hidden');
	}, function() {
		$(this).children('a').removeClass('trigger-menu').next('div').attr('hidden', 'true');
	});

	// 

	// Открытие списков

	$('.sm-menu-item button').on('click', function() {
		$(this).next('div').toggle();
	});

	// 

	// Скрываем блок "Welcome to the new, sunnier Kyero"

	$('#close-welcome-block').on('click', function() {
		$('#welcome-block').fadeOut();

		// .....
	});

	//

	// Табы

	$('.tabs-wrap').on('click', '.btn-tab:not(.active)', function() {

		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().parent().find('.tab-list ul').removeClass('active').eq($(this).index()).addClass('active');
	});

	// 

	// Выбор языка в футере

	$('.select-trigger').each(function() {

		$(this).on('click', function() {
			$(this).closest('.select').toggleClass('select-active').end().next('.select-items').toggleClass('hidden');
		});
	});

	// 

	// Выбор языка

	$('.language-select').on('click', function() {
		$('.language-panel').toggleClass('hidden');
	});

	$('.language-panel').find('a').each(function() {
		$(this).on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});
	});

	// 

	// Открытие и закрытие меню на мобильных

	$('#menu-animation-trigger').on('click', function() {
		$('.menu-animation').addClass('active');
	});

	$('.menu-animation-close').on('click', function() {
		$('.menu-animation').removeClass('active');
	});

	// 

	// Active "Make an enquiry"

	$('[data-trigger-make]').on('click', function() {

		$('#modal_form_message').toggleClass('a-hidden flex');

	});

	$('#modal_form_message-close').on('click', function() {
		$('#modal_form_message').toggleClass('a-hidden flex');
	});

	// 

	// Active "A different question"

	$('[data-target-show-textarea]').on('click', function() {

		let _this = $(this);
		let _id = _this.attr('data-target-show-textarea');
		let _target = $(_id);

		_target.toggleClass('hidden');
		$(this).toggle();
	});

	// 

	

	// validate

	let form_validate = $('#form_validate_1,#form_validate_2,#form_validate_3,#form_validate_4');

	form_validate.submit(function(e) {
		e.preventDefault();
	});

	form_validate.each(function() {
		let _this = $(this);

		_this.find('[data-checked="more_details"]').on('change', function() {
			if(!$(this).is(':checked')) {
				_this.find('[data-toggle="more_details"]').removeClass('hidden');
				_this.find('button[type="submit"]').attr('disabled', true);
			} else {
				_this.find('[data-toggle="more_details"]').addClass('hidden');
				_this.find('button[type="submit"]').attr('disabled', false);
			}
		});
	});
	
	$('#form_validate_1').validate({
		rules: {
			name: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
			tel: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name",
			email: "Please provide a valid email address",
			tel: "Please enter valid phone number"
		},
		highlight: function(element, errorClass, validClass) {
			$(element).prev('label').addClass('error');
			$(element).parent().closest('.telField').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).prev('label').removeClass('error');
			$(element).parent().closest('.telField').removeClass('error');
		}
	});

	$('#form_validate_2').validate({
		ignore: [],
		rules: {
			name: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
			tel: {
				required: true
			},
			checkbox3: {
				required: true,
				// maxlength: 0
			}
		},
		messages: {
			name: "Please enter your name",
			email: "Please provide a valid email address",
			tel: "Please enter valid phone number"
			// checkbox3: ""
		},
		highlight: function(element, errorClass, validClass) {
			$(element).prev('label').addClass('error');
			$(element).parent().closest('.telField').addClass('error');
			console.log(element);
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).prev('label').removeClass('error');
			$(element).parent().closest('.telField').removeClass('error');
		}
	});
	$('#form_validate_3').validate({
		rules: {
			name: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
			tel: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name",
			email: "Please provide a valid email address",
			tel: "Please enter valid phone number"
		},
		highlight: function(element, errorClass, validClass) {
			$(element).prev('label').addClass('error');
			$(element).parent().closest('.telField').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).prev('label').removeClass('error');
			$(element).parent().closest('.telField').removeClass('error');
		}
	});
	$('#form_validate_4').validate({
		rules: {
			name: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
			tel: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name",
			email: "Please provide a valid email address",
			tel: "Please enter valid phone number"
		},
		highlight: function(element, errorClass, validClass) {
			$(element).prev('label').addClass('error');
			$(element).parent().closest('.telField').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).prev('label').removeClass('error');
			$(element).parent().closest('.telField').removeClass('error');
		}
	});

	$('[name=tel]').bind('change keyup input click', function () {
        if (this.value.match(/[^+\d]/g)) {
            this.value = this.value.replace(/[^+\d]/g, '');
        }
    });
	
	// tippy

	$('.tippy-show').each(function() {
		tippy(document.querySelectorAll('.tippy-show'));
	});

	

	$('[data-target-textarea]').on('change', function() {
		let _this = $(this);
		let _id = _this.attr('data-target-textarea');
		let _target = $(_id);

		(_this.is(':checked')) ? _target.removeClass('hidden') : _target.addClass('hidden');
	});

	// modal_button

	function stopVideo() {
		$("iframe").each(function() {
        	$(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
	}

	$('.media-preview-close').on('click', function() {
		$('.media-preview-overlay').removeClass('active');

		stopVideo();
	});

	$(document).mouseup(function (e) {
		var container = $(".media-preview-modal");
		if (container.has(e.target).length === 0){
			container.parent().removeClass('active');
			stopVideo();
		}
	});

	$('[data-component="video_preview"]').on('click', function() {
		$('[data-modal="video_preview"]').addClass('active');
	});
	$('[data-component="virtual_tour"]').on('click', function() {
		$('[data-modal="virtual_tour"]').addClass('active');
	});

	// accordion

	$('.accordion-trigger').on('click', function() {
		let _this = $(this),
			_parent = _this.parent();
		_parent.toggleClass('accordion-open accordion-hide');
		
	});
});