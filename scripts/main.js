'use strict';

//Initialize Parse

Parse.initialize("AfNszK8Rd7zcsyJhCHpyoRCPM338C6aiylN6mgC6", "XpbpBBz1LrLGmW45ZQOHHolJz1iQIeMoMjRSulII");



$('#nav-toggle').click(function(){
	$('#nav-icon1').toggleClass('open');
	// $('.slideout').toggleClass('toggle-slideout');
});

$('.add-beer').click(function(){
	$('.slideout').toggleClass('toggle-slideout');
	$('.profile-column').toggleClass('container-shift');
	$('.beer-plus').toggleClass('rotate');
	$('.header-right').toggleClass('hidden');
});

$('.beer-plus').click(function(){
	$('.slideout').toggleClass('toggle-slideout');
	$('.profile-column').toggleClass('container-shift');
	$('.beer-plus').toggleClass('rotate');
	$('.header-right').toggleClass('hidden');
});

