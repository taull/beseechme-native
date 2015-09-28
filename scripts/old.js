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
$('#barback-menu [data-accordion]').accordion();


$(function() {
    // Now
    var now = moment();

	$('.current-date').append([
	  now.format('dddd, MMMM Do')
	].join('<br/>'));

	var oneDateLater = moment().add('days', 1);

	$('.one-date-later').append([
	  oneDateLater.format('dddd, MMMM Do')
	].join('<br/>'));

	var twoDateLater = moment().add('days', 2);

	$('.two-date-later').append([
	  twoDateLater.format('dddd, MMMM Do')
	].join('<br/>'));

	var threeDateLater = moment().add('days', 3);

	$('.three-date-later').append([
	  threeDateLater.format('dddd, MMMM Do')
	].join('<br/>'));

	var fourDateLater = moment().add('days', 4);

	$('.four-date-later').append([
	  fourDateLater.format('dddd, MMMM Do')
	].join('<br/>'));

	var fiveDateLater = moment().add('days', 5);

	$('.five-date-later').append([
	  fiveDateLater.format('dddd, MMMM Do')
	].join('<br/>'));

	var sixDateLater = moment().add('days', 6);

	$('.six-date-later').append([
	  sixDateLater.format('dddd, MMMM Do')
	].join('<br/>'));

    // Now
    var now = moment();

	$('#current-day').append([
	  now.format('ddd')
	].join('<br/>'));

	// 1 day
    var oneDayLater = moment().add('days', 1);

	$('#one-day-later').append([
	  oneDayLater.format('Do')
	].join('<br/>'));

	// 2 days
    var twoDayLater = moment().add('days', 2);

	$('#two-day-later').append([
	  twoDayLater.format('Do')
	].join('<br/>'));

	// 3 days
    var threeDayLater = moment().add('days', 3);

	$('#three-day-later').append([
	  threeDayLater.format('Do')
	].join('<br/>'));

	// 4 day
    var fourDayLater = moment().add('days', 4);

	$('#four-day-later').append([
	  fourDayLater.format('Do')
	].join('<br/>'));

	// 5 day
    var fiveDayLater = moment().add('days', 5);

	$('#five-day-later').append([
	  fiveDayLater.format('Do')
	].join('<br/>'));

	// 6 day
    var sixDayLater = moment().add('days', 6);

	$('#six-day-later').append([
	  sixDayLater.format('Do')
	].join('<br/>'));

	// Week Day Now
    var weeklyZero = moment();

	$('#weekly-zero').append([
	  weeklyZero.format('MMMM Do, YYYY')
	].join('<br/>'));

	// Week Day 1
    var weeklyOne = moment().add('days', 1);

	$('#weekly-one').append([
	  weeklyOne.format('dddd') 
	].join('<br/>'));


	// Week Day 2
    var weeklyTwo = moment().add('days', 2);

	$('#weekly-two').append([
	  weeklyTwo.format('dddd')
	].join('<br/>'));

	// Week Day 3
    var weeklyThree = moment().add('days', 3);

	$('#weekly-three').append([
	  weeklyThree.format('dddd')
	].join('<br/>'));

	// Week Day 4
    var weeklyFour = moment().add('days', 4);

	$('#weekly-four').append([
	  weeklyFour.format('dddd')
	].join('<br/>'));

	// Week Day 5
    var weeklyFive = moment().add('days', 5);

	$('#weekly-five').append([
	  weeklyFive.format('dddd')
	].join('<br/>'));

	// Week Day 6
    var weeklySix = moment().add('days', 6);

	$('#weekly-six').append([
	  weeklySix.format('dddd')
	].join('<br/>'));


// Seven Day Nav

	// Now
    var sevenDay1 = moment();

	$('#seven-day-1').append([
	  sevenDay1.format('dddd')
	].join('<br/>'));

	// Current Day Heading
    var currentDayHeading = moment();

	$('#current-day-heading').append([
	  currentDayHeading.format('dddd, MMM Do')
	].join('<br/>'));



	// 1 day
    var sevenDay2 = moment().add('days', 1);

	$('#seven-day-2').append([
	  sevenDay2.format('dddd')
	].join('<br/>'));

	// 2 days
    var sevenDay3 = moment().add('days', 2);

	$('#seven-day-3').append([
	  sevenDay3.format('dddd')
	].join('<br/>'));

	// 3 days
    var sevenDay4 = moment().add('days', 3);

	$('#seven-day-4').append([
	  sevenDay4.format('dddd')
	].join('<br/>'));

	// 4 day
    var sevenDay5 = moment().add('days', 4);

	$('#seven-day-5').append([
	  sevenDay5.format('dddd')
	].join('<br/>'));

	// 5 day
    var sevenDay6 = moment().add('days', 5);

	$('#seven-day-6').append([
	  sevenDay6.format('dddd')
	].join('<br/>'));

	// 6 day
    var sevenDay7 = moment().add('days', 6);

	$('#seven-day-7').append([
	  sevenDay7.format('dddd')
	].join('<br/>'));


	// Now
    var sevenMonth1 = moment();

	$('#seven-month-1').append([
	  sevenMonth1.format('MMMM Do')
	].join('<br/>'));

	// 1 day
    var sevenMonth2 = moment().add('days', 1);

	$('#seven-month-2').append([
	  sevenMonth2.format('MMMM Do')
	].join('<br/>'));

	// 2 days
    var sevenMonth3 = moment().add('days', 2);

	$('#seven-month-3').append([
	  sevenMonth3.format('MMMM Do')
	].join('<br/>'));

	// 3 days
    var sevenMonth4 = moment().add('days', 3);

	$('#seven-month-4').append([
	  sevenMonth4.format('MMMM Do')
	].join('<br/>'));

	// 4 day
    var sevenMonth5 = moment().add('days', 4);

	$('#seven-month-5').append([
	  sevenMonth5.format('MMMM Do')
	].join('<br/>'));

	// 5 day
    var sevenMonth6 = moment().add('days', 5);

	$('#seven-month-6').append([
	  sevenMonth6.format('MMMM Do')
	].join('<br/>'));

	// 6 day
    var sevenMonth7 = moment().add('days', 6);

	$('#seven-month-7').append([
	  sevenMonth7.format('MMMM Do')
	].join('<br/>'));

});


$( function() {
				
	$( '#cd-dropdown' ).dropdown( {
		stack : false,
		// slidingIn : 100
	} );

});

(function() {
	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
		new SelectFx(el);
	} );
})();

$('.barback-breadcrumbs').click(function(){
	$('.barback-tabs').toggleClass('barback-tabs-shift');
});




// $("#barback-menu1").flip(
// 	{speed: '300'},
// 	{reverse: true}
// 	);