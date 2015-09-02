'use strict';

//Initialize Parse

Parse.initialize("AfNszK8Rd7zcsyJhCHpyoRCPM338C6aiylN6mgC6", "XpbpBBz1LrLGmW45ZQOHHolJz1iQIeMoMjRSulII");


// from a jQuery collection
autosize($('#business-status'));


$('.accordion').accordion({
    "transitionSpeed": 400
});

$('#only-one [data-accordion]').accordion();

