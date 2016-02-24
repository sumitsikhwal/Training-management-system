$(document).ready(function(){
	
	var fixmeTop = $('#navList').offset().top;       // get initial position of the element

	$(window).scroll(function() {                  // assign scroll event listener

    var currentScroll = $(window).scrollTop();  // get current position

    if (currentScroll >= fixmeTop) {			// apply position: fixed if you
        $('#navList').addClass("fix-after-scroll");
    } else {            // apply position: static
        $('#navList').removeClass("fix-after-scroll");
    }

	});
});