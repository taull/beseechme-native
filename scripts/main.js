'use strict';

//Initialize Parse

Parse.initialize("AfNszK8Rd7zcsyJhCHpyoRCPM338C6aiylN6mgC6", "XpbpBBz1LrLGmW45ZQOHHolJz1iQIeMoMjRSulII");



$('#nav-toggle').click(function(){
	$('#nav-icon1').toggleClass('open');
	$('.slideout').toggleClass('toggle-slideout');
	$('.profile-container').toggleClass('profile-container-shift');
	$('.profile-right').toggleClass('profile-right-shift');


});
