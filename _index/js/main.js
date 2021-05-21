$(function () {

	// Добавляем sticky класс при скролле

	$(window).scroll(function() {

		let posi = 140,
			sticky_block = $('.sticky-block');

		($(this).scrollTop() >= posi) ? sticky_block.addClass('active') : sticky_block.removeClass('active');
	});

	// Фильтр поиска

	

	function loadSearchResult(elem) {
		let search_width = elem.closest('.search').width(),
			search_left = elem.offset().left,
			search_top = elem.offset().top + 53,
			window_wrap = $('#autosuggest-1');
		
		window_wrap.css({
			'position': 'absolute',
			'top': search_top,
			'left': search_left,
			'width':search_width,
			'z-index': '99',
			'display': 'block',
		});

		window_wrap.find('.autosuggest-item').on('click', function() {
			let textSearch = $(this).find('.leading-tight span:first-child').text();

			$('.form-search-input').val(textSearch);
			$('.form-search-input').closest('.search').find('.form-reset').removeClass('hidden');

			window_wrap.fadeOut();
		});

		$('.form-reset').on('click', function() {
			$(this).addClass('hidden');
		});

		$(document).mouseup(function (e) {
			let _target = $(".autosuggest-overlay, .search");
			if (_target.has(e.target).length === 0){
				window_wrap.fadeOut();
			}
		});

	}

	$('.form-reset').on('click', function() {
		$('#autosuggest-1').fadeOut();
	});

	$('.form-search-input').on('input', function() {
		loadSearchResult($(this));

		if($(this).val().length == 0) {
			$(this).closest('.search').find('.form-reset').addClass('hidden');
			$('#autosuggest-1').fadeOut();
		}
	});

		


	// Close popup

	$('.panel-dropup-close').on('click', function() {
		$('[data-mobile-modal]').fadeOut();
	});
	

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
	

	const button_language_select = $('.language-select'),
		  wrap_language_select = $('.language-panel');

	button_language_select.on('click', function() {
		wrap_language_select.toggleClass('hidden');
	});

	$(document).click(function (e) {
		console.log(button_language_select.is(e.target));
		if ( !button_language_select.is(e.target) && !wrap_language_select.is(e.target) && wrap_language_select.has(e.target).length === 0) {
			wrap_language_select.addClass('hidden');
			// button_language_select.removeClass('hidden');
		};
	});

	wrap_language_select.find('a').each(function() {
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

});