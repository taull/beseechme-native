'use strict';

//Initialize Parse

Parse.initialize("AfNszK8Rd7zcsyJhCHpyoRCPM338C6aiylN6mgC6", "XpbpBBz1LrLGmW45ZQOHHolJz1iQIeMoMjRSulII");



// $('.header-right').click(function(){
// 	$('#nav-icon1').toggleClass('open');
// 	$('.settings-column').toggleClass('toggle-bottom-slideout');
// 	$('.header-left').toggleClass('hidden');
// 	// $('.body-overlay').toggleClass('hidden');
// 	// $('.body-container').toggleClass('unscrollable');
// 	// $('.narrow-container').toggleClass('unscrollable');
// 	// $('.body-container').toggleClass('body-shift');

// 	$('.settings-slideout').removeClass('container-shift-left');
//     setTimeout(function(){
// 		$('.info-slideout').removeClass('toggle-right-slideout');
// 		$('.right-slideout2').removeClass('toggle-right-slideout');
// 	}, 250);

// });



// $('.bar-back').click(function(){
// 	// $('#nav-icon1').toggleClass('open');
// 	$('.settings-column').toggleClass('toggle-bottom-slideout');
// 	// $('.middle-column').toggleClass('container-shift-left');
// 	// $('.header-left').toggleClass('hidden');
// 	// $('.header-right').toggleClass('hidden');

// });


// $('.barback-breadcrumbs').click(function(){
// 	$('.barback-tabs').toggleClass('barback-breadcrumbs-shift');
// });

// $('.bar-info').click(function(){
// 	$('.info-slideout').toggleClass('toggle-right-slideout');
// 	$('.settings-slideout').toggleClass('container-shift-left');

// 	// $('.header-left').toggleClass('hidden');
// });

// $('.bar-info-back').click(function(){
// 	$('.info-slideout').toggleClass('toggle-right-slideout');
// 	// $('.header-left').toggleClass('hidden');
// 	$('.settings-slideout').toggleClass('container-shift-left');

// });



// $('.bar-avatar').click(function(){
// 	// $('#nav-icon1').toggleClass('open');
// 	$('.right-slideout2').toggleClass('toggle-right-slideout');
// 	// $('.middle-column').toggleClass('container-shift-left');
// 	// $('.header-left').toggleClass('hidden');
// 	$('.settings-slideout').toggleClass('container-shift-left');

// });

// $('.bar-avatar-back').click(function(){
// 	$('.right-slideout2').toggleClass('toggle-right-slideout');
// 	// $('.header-left').toggleClass('hidden');
// 	$('.settings-slideout').toggleClass('container-shift-left');

// });

// // CALENDAR SLIDEOUT

// $('.bar-calendar').click(function(){
// 	$('.calendar-column').toggleClass('toggle-right-slideout');
// 	$('.settings-slideout').toggleClass('container-shift-left');
// });

// $('.bar-calendar-back').click(function(){
// 	$('.calendar-column').toggleClass('toggle-right-slideout');
// 	$('.settings-slideout').toggleClass('container-shift-left');
// });

// $('.bar-sunday').click(function(){
// 	$('.sunday-slideout').toggleClass('toggle-right-slideout');
// 	$('.calendar-slideout').toggleClass('container-shift-left');
// });

// $('.bar-sunday-back').click(function(){
// 	$('.sunday-slideout').toggleClass('toggle-right-slideout');
// 	$('.calendar-slideout').toggleClass('container-shift-left');
// });

// $('.add-beer').click(function(){
// 	$('.left-slideout').toggleClass('toggle-left-slideout');
// 	$('.middle-column').toggleClass('container-shift-right');
// });


var OriginalHeight1 = $('#business-status1').height();

$('.header-left').click(function(){
	$('.bottom-slideout').toggleClass('bottom-slideout-shift');
	// $('.header-right').toggleClass('hidden');
	$('#business-status1').val('');
	$('#business-status1').height(OriginalHeight1);
});



// $('.shotglass').click(function(){
// 	$('.shot-empty').toggleClass('shot-fill');
// });


// $('.feed-favorite').click(function(){
// 	$('.fa-star').toggleClass('favorited-post');
// });

// Backend Tabs Trigger

$('.backend-tabs-trigger').click(function(){
	$('.backend-tabs').toggleClass('hidden');
});

// Add Comment on Feed

var OriginalHeight = $('#business-status').height();

$('.addcomment-container').click(function(){
	$('.profile-tools').toggleClass('profile-tools-shift');
	$('#business-status').val('');
	$('#business-status').height(OriginalHeight);
});


// from a jQuery collection
autosize($('#business-status'));

autosize($('#business-status1'));


$('.accordion').accordion({
    "transitionSpeed": 400
});

$('#only-one [data-accordion]').accordion();

