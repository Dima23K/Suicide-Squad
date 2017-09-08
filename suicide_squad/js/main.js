(function (window, $) {
	'use strict';

	// Cache document for fast access.
	var document = window.document;


	/************** Toggle Menu *********************/
	$('a.toggle-menu').click(function(){
        $(".menu").slideToggle(400);
		return false;
    });




    /************** Open Different Pages *********************/
	$(".menu a").click(function(){
		var id =  $(this).attr('class');
		id = id.split('-');
		$("#menu-container .content").hide();
		$("#menu-container #menu-"+id[1]).addClass("animated fadeInDown").show();
		return false;
	});

	$(".menu a.homebutton").click(function(){
		$(".menu").slideUp();
	});


	$(window).resize(function(){
		if ($(window).width() <= 769){	
			$(".menu a").click(function(){
				$(".menu").hide();
				return false;
			});
		}	
	});

	/*
	var dt = window.atob('IC0gPGEgcmVsPSJub2ZvbGxvdyIgaHJlZj0iaHR0cDovL3d3dy50ZW1wbGF0ZW1vLmNvbS9wcmV2aWV3L3RlbXBsYXRlbW9fNDEwX2NpcmNsZSI+Q2lyY2xlPC9hPiBieSA8YSByZWw9Im5vZm9sbG93IiBocmVmPSJodHRwOi8vd3d3LnRlbXBsYXRlbW8uY29tIj5GcmVlIFRlbXBsYXRlczwvYT4='); 
	var y = document.getElementById('footer-text');
	y.innerHTML += dt;
	*/

	/************** Tabs *********************/
	$('ul.tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and it's associated content
		var $active, $content, $links = $(this).find('a');

		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');

		$content = $($active[0].hash);

		// Hide the remaining content
		$links.not($active).each(function () {
		$(this.hash).hide();  
		});

		// Bind the click event handler
		$(this).on('click', 'a', function(e){
		// Make the old tab inactive.
		$active.removeClass('active');
		$content.hide();

		// Update the variables with the new link and content
		$active = $(this);
		$content = $(this.hash);

		// Make the tab active.
		$active.addClass('active');
		$content.slideToggle();

		// Prevent the anchor's default click action
		e.preventDefault();
		});
	});


	/************** LightBox *********************/
	$(function(){
		$('[data-rel="lightbox"]').lightbox();
	});


})(window, jQuery);
var Gallery = (function() {
    var colors = ['#34495E', '#2E4053', '#283747', '#212F3C', '#1B2631', '#2C3E50', '#273746'];
    var scrollTimeId;
    var posLeft = 0;

    function Gallery(config) {
        this.list = $(config.list);
        this.items = this.list.find('li');
        this.itemWidth = this.items.outerWidth();
    };

    Gallery.prototype = {
        constructor: Gallery,

        init: function() {
            this.setGalleryWidth();
            this.setItemsColor();
            this.eventManager();

            return this;
        },

        eventManager: function() {
            var _this = this;

            $(document).on('mousewheel DOMMouseScroll', function(event) {
                clearTimeout(scrollTimeId);
                scrollTimeId = setTimeout(onScrollEventHandler.bind(this, event, _this.itemWidth), 0);
            });
        },

        getRandomColor: function() {
            return colors[Math.floor(Math.random() * colors.length)];
        },

        setItemsColor: function() {
            var _this = this;

            $.each(this.items, function(index, item) {
                 item.style.backgroundColor = _this.getRandomColor();
            });
        },

        setGalleryWidth: function() {
            this.list.css('width', this.getGalleryWidth());
        },

        getGalleryWidth: function() {
            var width = 0;

            this.items.each(function(index, item) {
                width += $(this).outerWidth();
            });

            return width;
        }
    };

    function onScrollEventHandler(event, width) {
        // Firefox, please, stop it
         if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            if (event.originalEvent.detail > 0) {
                posLeft += width / 2;
                $('html').scrollLeft(posLeft);
            } else {
                posLeft -= width / 2;
                $('html').scrollLeft(posLeft);
            }
         } else {
            if (event.originalEvent.wheelDelta > 0)  {
                this.body.scrollLeft -= width / 2;
            } else {
                this.body.scrollLeft += width / 2;
            }
         }
        event.preventDefault();
    };

    return Gallery;
})();


$(document).ready(function() {
    var gallery = new Gallery({
        list: '.gallery'
    }).init();
});


