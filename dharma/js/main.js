
$(document).ready(function () {
	var $body = $('body');
	if($body.hasClass('home-page')){
		$('.header-slider').owlCarousel({
			autoPlay: 4000,
			navigation: true,
			pagination: true,
			singleItem: true,
			transitionStyle: "fade",
			mouseDrag: false,
			touchDrag: false
		});
		$('.header-slider > .owl-controls').addClass('container');



		var $galleryItems = $('.gallery-item');
		$galleryItems.each(function (i) {
			var $galleryItem = $galleryItems.eq(i);
			var $itemPic = $galleryItem.children('img');
			var $itemLink = $galleryItem.find('.hoverlay-container >  a');

			$itemLink.attr('href',$itemPic.attr('src'));
			// console.log($itemLink);
			// console.log($itemPic);
		});

		$('.gallery-wrapper').magnificPopup({
			gallery: { enabled: true },
			delegate: '.gallery-item > .hoverlay-container > a',
			type: 'image'
		});
	}

	// Fixed Footer
	var $footer = $('footer');
	var height = $footer.outerHeight();
	$footer.prev().css({'margin-bottom': height+'px'});
});
