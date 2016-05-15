//create a Dial to change the active DIV that will serve as page content
//<body role="application">
//    <div id="main">...</div>
//	  <div id="nextScreen">...</div>
//	  <div id="settings">...</div>
// data will be passed from the href attribute of anchor tags that are clicked
//		a different attribute can be used to pass data by specifying it (e.g. 'data-dial')
var pageDial = DialFactory.makeDial("page dial", true, 'href');
//pageDial is a Dial object named 'page dial' that is historic (integrated with browser history)

//create a state to apply to DIVs -- changes CSS class applied to DIVs under body
pageDial.addState("visible", function(selector) {
    $("body > div").removeClass('visible'); //only one of the body tag's divs should be visible
    $(selector).addClass('visible'); //make the divs that were passed to this function visible
	//only one div should be passed to this function
});

var MAIN_DIV = '#main'; //selector for main page
$(document).ready(function() {
	//anchor tags in the navigation bar will trigger the 'visible' state with their data 
    pageDial.associateElements('.nav > a', 'click', 'visible');
	//all elements with the '.wire_window' class will trigger the 'visible' state with their data
    // <a href="#settings" class="wire_window"><span class="glyphicon glyphicon-cog"></span></a>
	pageDial.associateElements('.wire_window', 'click', 'visible');
	
	
    //trigger the visible state with main page/div selector to show the first screen in the app
    pageDial.trigger(MAIN_DIV, 'visible');
});
