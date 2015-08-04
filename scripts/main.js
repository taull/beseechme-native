'use strict';

//Initialize Parse

Parse.initialize("AfNszK8Rd7zcsyJhCHpyoRCPM338C6aiylN6mgC6", "XpbpBBz1LrLGmW45ZQOHHolJz1iQIeMoMjRSulII");



$('.header-right').click(function(){
	$('#nav-icon1').toggleClass('open');
	$('.settings-column').toggleClass('toggle-bottom-slideout');
	// $('.middle-column').toggleClass('container-shift-left');
	$('.header-left').toggleClass('hidden');
	// $('.header-right').toggleClass('hidden');

});

$('.bar-back').click(function(){
	// $('#nav-icon1').toggleClass('open');
	$('.settings-column').toggleClass('toggle-bottom-slideout');
	// $('.middle-column').toggleClass('container-shift-left');
	// $('.header-left').toggleClass('hidden');
	// $('.header-right').toggleClass('hidden');

});

$('.bar-info').click(function(){
	$('.info-slideout').toggleClass('toggle-right-slideout');
	// $('.header-left').toggleClass('hidden');
});

$('.bar-info-back').click(function(){
	$('.info-slideout').toggleClass('toggle-right-slideout');
	// $('.header-left').toggleClass('hidden');
});

$('.bar-sunday').click(function(){
	$('.sunday-slideout').toggleClass('toggle-right-slideout');
	// $('.header-left').toggleClass('hidden');
});

$('.bar-sunday-back').click(function(){
	$('.sunday-slideout').toggleClass('toggle-right-slideout');
	// $('.header-left').toggleClass('hidden');
});

$('.bar-avatar').click(function(){
	// $('#nav-icon1').toggleClass('open');
	$('.right-slideout2').toggleClass('toggle-right-slideout');
	// $('.middle-column').toggleClass('container-shift-left');
	// $('.header-left').toggleClass('hidden');
});

$('.bar-avatar-back').click(function(){
	$('.right-slideout2').toggleClass('toggle-right-slideout');
	// $('.header-left').toggleClass('hidden');
});


$('.bar-calendar').click(function(){
	// $('#nav-icon1').toggleClass('open');
	$('.calendar-slideout').toggleClass('toggle-right-slideout');
	// $('.middle-column').toggleClass('container-shift-left');
	// $('.header-left').toggleClass('hidden');
});

$('.bar-calendar-back').click(function(){
	// $('#nav-icon1').toggleClass('open');
	$('.calendar-slideout').toggleClass('toggle-right-slideout');
	// $('.middle-column').toggleClass('container-shift-left');
	// $('.header-left').toggleClass('hidden');
});
// $('.add-beer').click(function(){
// 	$('.left-slideout').toggleClass('toggle-left-slideout');
// 	$('.middle-column').toggleClass('container-shift-right');
// 	$('.beer-plus').toggleClass('rotate');
// 	$('.header-right').toggleClass('hidden');
// });

$('.header-left').click(function(){
	$('.bar-search').toggleClass('search-shift');
	// $('.profile-options').toggleClass('search-shift');

	// $('.middle-column').toggleClass('container-shift-right');
	// $('.beer-plus').toggleClass('rotate');
	$('.header-right').toggleClass('hidden');
});

// $('.location-arrow').click(function(){
// 	$('.left-slideout').toggleClass('toggle-left-slideout');
// 	$('.middle-column').toggleClass('container-shift-right');
// 	$('.header-right').toggleClass('hidden');
// 	$('.location-arrow').toggleClass('location-arrow-cancel');

// });
// $('.bar-sunday').click(function(){
// 	$('#nav-icon1').toggleClass('open');
// 	$('.right-slideout1').toggleClass('toggle-right-slideout');
// 	// $('.middle-column').toggleClass('container-shift-left');
// 	$('.header-left').toggleClass('hidden');
// });

$(function() {
    $('#basicExample').timepicker();
});
