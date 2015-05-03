// ==UserScript==
// @id          Lichess_Topbar_Menu@https://github.com/mawekuwe/UserScripts
// @name        Lichess Topbar Menu
// @namespace   https://github.com/mawekuwe/UserScripts
// @description Restore the topbar menu
// @author      mawekuwe
// @copyright   2015+, mawekuwe
// @license     GNU GPLv3
// @homepage    https://github.com/mawekuwe/UserScripts/tree/master/Lichess_Topbar_Menu
// @homepageURL https://github.com/mawekuwe/UserScripts/tree/master/Lichess_Topbar_Menu
// @downloadURL https://github.com/mawekuwe/UserScripts/raw/master/Lichess_Topbar_Menu/Lichess_Topbar_Menu.user.js
// @updateURL   https://github.com/mawekuwe/UserScripts/raw/master/Lichess_Topbar_Menu/Lichess_Topbar_Menu.user.js
// @supportURL  https://github.com/mawekuwe/UserScripts/issues
// @contributionURL 
// @version     1.4draft
// @grant       none
// @run-at      document-end
// @include     http://*.lichess.org/*
// @icon        https://raw.githubusercontent.com/ornicar/lila/master/public/images/favicon-32-white.png
// ==/UserScript==

// changelog
// version 1.4
// Added function to highlight the current menu entry
// Added ability to hide TV ads in homepage from some users.(thanks to robertmaxrees from #jquery)
// Menu entries are now internationalized (thanks to RaulJose from lichess.org)
// Small bug fix with forum part (thanks to RaulJose from lichess.org)
// version 1.3
// Added background color menu for light/dark theme.
// Added the new hierarchy menu and the previous one as optional. (Switch the setting to true or false)
// Forum part: Uses the full width of the site when you are on the forum which involves hiding the useless and empty sidebar and the logo.
// Tournament part: Added feature to always  be rated selected when make new tournament.
// version 1.2
// Added submenus for categories Forum

// some websites helped to make this script: (legend: when sign is '+' that mean directly helped)
// + http://stackoverflow.com/questions/11820480/how-to-check-if-the-url-contains-multiple-strings-javascript-jquery
// - http://stackoverflow.com/questions/27922338/find-particular-string-from-url-in-javascript
// - http://tampermonkey.net/faq.php
// - http://hayageek.com/greasemonkey-tutorial/
// - https://duckduckgo.com/?q=userscript+if+window.location.href+regex
// - http://wiki.greasespot.net/Tutorials
// - http://api.jquery.com/css/
// + https://duckduckgo.com/?q=jquery+add+style
// + http://api.jquery.com/add/
// - http://api.jquery.com/addClass/
// + http://stackoverflow.com/questions/3269136/how-to-add-style-displayblock-to-a-element-using-jquery
// + http://stackoverflow.com/questions/883180/how-to-dynamically-add-a-style-for-text-align-using-jquery

// + https://duckduckgo.com/?q=apply+css+to+parent
// - http://stackoverflow.com/questions/9881921/jquery-apply-css-to-parent-div
// + http://stackoverflow.com/a/1014958/4070433
// + http://api.jquery.com/has-selector/
// + http://dev.w3.org/csswg/selectors-4/#has-pseudo

// + https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

// settings
var oldmenu = false; // false/true; Change it to true if you want the previous old topbar menu hierarchy
var streamOnAir = false; // turn it to true if you want to remove ads about stream from particular user. See line ~190
var newTounrnamentRated = true; // Turn it to true if you want always set a rated tournament. See line ~170


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
    // CSS Menu part
    '#nav li {display:block;float:left;list-style-type:none;width:auto;}' +
    '#primary_nav_wrap {}' +
    
    // UPPERCASE for topbar or every submenu?
    '#primary_nav_wrap > ul {text-transform: uppercase !important;}' +
    '#primary_nav_wrap > ul > li > ul {text-transform: lowercase !important;}' +

	//
    '#primary_nav_wrap ul {list-style:none;position:relative;float:left;margin:0;padding:0}' +
    '#primary_nav_wrap ul a {display:block;text-decoration:none;line-height:32px;padding:0 15px;}' +
    '#primary_nav_wrap ul li {position:relative;float:left;	margin:0;padding:0}' +
    '/*#primary_nav_wrap ul li.current-menu-item {background:#ddd}*/' +
    '#primary_nav_wrap ul ul {display:none;position:absolute;top:100%;left:0;padding:0}' +
    'body.dark #primary_nav_wrap ul ul {background-color:#252525 !important;}' +
    'body.dark #primary_nav_wrap ul li:hover {background-color:#2B2B2B !important;}' +
    'body.dark #primary_nav_wrap a.current-menu-item {font-weight: bolder !important;}' +
    'body.light #primary_nav_wrap ul ul {background-color:#d7d7d7 !important;}' +
    'body.light #primary_nav_wrap ul li:hover {background-color:white !important;}' +
    'body.light #primary_nav_wrap a.current-menu-item {font-weight: bolder !important;}' +

    '#primary_nav_wrap ul ul li {float:none;width:200px}' +
    '#primary_nav_wrap ul ul a {line-height:120%;padding:10px 15px}' +
    '#primary_nav_wrap ul ul ul {top:0;left:100%}' +
    '#primary_nav_wrap ul li:hover > ul{display:block}' +

    '.chat_panels {height: 300px !important;}' +
    // CSS Forum part
    '/*div#lichess > div#lichess_forum {margin-left: 0px !important;}*/' +
    '/*div#lichess:has(div#lichess_forum) {margin-left: 0px !important;}*/' +
    'div.nomargin-left {margin-left: 0px !important;}' +
    '/*#site_header {display: none !important;}*/' +
    '/*#primary_nav_wrap ul li.topmenu {cursor: default;}*/' +

    // TV history
    '#tv_history div.content {height: 250px !important;}'
);

// Topbar Menu
// thanks to RaulJose for internationalized menu entries.

if (oldMenu) {
    // if false this code is not executed
    $("#top").append(
        '<div><nav id="primary_nav_wrap" class="user_show">' +
        '<ul>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/">' + $("#fpmenu div.menu > section:eq(0) > *:eq(0)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/?any#hook">' + $("#fpmenu div.menu > section:eq(0) > *:eq(1)").text() + '</a></li>' +
        '        <!--<li class="dropmenu" style=""><a class="link blank_if_play" href="/games">Games</a></li>-->' +
        '        <li class="dropmenu" style=""><a href="/">trans.tournament()</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/training">' + $("#fpmenu div.menu > section:eq(1) > *:eq(1)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/opening">' + $("#fpmenu div.menu > section:eq(1) > *:eq(2)").text() + '</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/coordinate">' + $("#fpmenu div.menu > section:eq(1) > *:eq(3)").text() + '</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/video">' + $("#fpmenu div.menu > section:eq(1) > *:eq(4)").text() + '</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/tournament">' + $("#fpmenu div.menu > section:eq(0) > *:eq(2)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/simul">' + $("#fpmenu div.menu > section:eq(0) > *:eq(3)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/player">' + $("#fpmenu div.menu > section:eq(2) > *:eq(1)").text() + '</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/team">' + $("#fpmenu div.menu > section:eq(2) > *:eq(2)").text() + '</a></li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/forum">' + $("#fpmenu div.menu > section:eq(2) > *:eq(3)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/general-chess-discussion">General Chess Discussion</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/game-analysis">Game analysis</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/lichess-feedback">Lichess Feedback</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/off-topic-discussion">Off-Topic Discussion</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/tv">' + $("#fpmenu div.menu > section:eq(0) > *:eq(4)").text() + '</a></li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/qa">' + $("#fpmenu div.menu > section:eq(2) > *:eq(4)").text() + '</a></li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/editor">' + $("#fpmenu div.menu > section:eq(3) > *:eq(1)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/analysis">' + $("#fpmenu div.menu > section:eq(3) > *:eq(2)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/paste">' + $("#fpmenu div.menu > section:eq(3) > *:eq(3)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/games/search">' + $("#fpmenu div.menu > section:eq(3) > *:eq(4)").text() + '</a></li>' +
        '      </ul>' +
        '    </li>' +
        '</ul>' +
        '</nav></div>');
}
else {
    // New-menu only if false.
    $("#top").append(
        '<div><nav id="primary_nav_wrap" class="user_show">' +
        '<ul>' +
        '    <li class="topmenu link blank_if_play"><a class="link blank_if_play" href="/">' + $("#fpmenu div.menu > section:eq(0) > *:eq(0)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/?any#hook">' + $("#fpmenu div.menu > section:eq(0) > *:eq(1)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/tournament">' + $("#fpmenu div.menu > section:eq(0) > *:eq(2)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/simul">' + $("#fpmenu div.menu > section:eq(0) > *:eq(3)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/tv">' + $("#fpmenu div.menu > section:eq(0) > *:eq(4)").text() + '</a></li>' +
        '        <!--<li class="dropmenu"><a class="link blank_if_play" href="/games">Games</a></li>-->' +
        '        <!--<li class="dropmenu" style=""><a href="/">trans.tournament()</a></li>-->' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu link blank_if_play" style="cursor: default !important;"><a class="link blank_if_play" style="cursor: default !important;">' + $("#fpmenu div.menu > section:eq(1) > *:eq(0)").text() + '</a>' + // Learn
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/training">' + $("#fpmenu div.menu > section:eq(1) > *:eq(1)").text() + '</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/opening">' + $("#fpmenu div.menu > section:eq(1) > *:eq(2)").text() + '</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/coordinate">' + $("#fpmenu div.menu > section:eq(1) > *:eq(3)").text() + '</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/video">' + $("#fpmenu div.menu > section:eq(1) > *:eq(4)").text() + '</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu link blank_if_play" style="cursor: default !important;"><a class="link blank_if_play" style="cursor: default !important;">' + $("#fpmenu div.menu > section:eq(2) > *:eq(0)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/player">' + $("#fpmenu div.menu > section:eq(2) > *:eq(1)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/team">' + $("#fpmenu div.menu > section:eq(2) > *:eq(2)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum">' + $("#fpmenu div.menu > section:eq(2) > *:eq(3)").text() + '</a>' +
        '          <ul>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/general-chess-discussion">General Chess Discussion</a></li>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/game-analysis">Game analysis</a></li>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/lichess-feedback">Lichess Feedback</a></li>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/off-topic-discussion">Off-Topic Discussion</a></li>' +
        '          </ul>' +
        '        </li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/qa">' + $("#fpmenu div.menu > section:eq(2) > *:eq(4)").text() + '</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu link blank_if_play" style="cursor: default !important;"><a class="link blank_if_play" style="cursor: default !important;">' + $("#fpmenu div.menu > section:eq(3) > *:eq(0)").text() + '</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/editor">' + $("#fpmenu div.menu > section:eq(3) > *:eq(1)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/analysis">' + $("#fpmenu div.menu > section:eq(3) > *:eq(2)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/paste">' + $("#fpmenu div.menu > section:eq(3) > *:eq(3)").text() + '</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/games/search">' + $("#fpmenu div.menu > section:eq(3) > *:eq(4)").text() + '</a></li>' +
        '      </ul>' +
        '    </li>' +
        '</ul>' +
        '</nav></div>');
    //$( "li.topmenu" ).attr("style", "cursor: default !important;");
}

//http://stackoverflow.com/a/15833068/4070433
$(document).ready(function() {
    $("#primary_nav_wrap [href]").each(function() {
    if (this.href == window.location.href) {
        $(this).addClass("current-menu-item");
        }
    });
});

// Forum part
//if (window.location.href.indexOf("forum") > -1) {//OK
//if (window.location.href === 'http://en.lichess.org/forum') { //NOK
//if (window.location.pathname === '/forum') { //NOK
if (window.location.pathname.indexOf("/forum") > -1) { //OK
//if (window.location.href.indexOf("/forum") > -1) { //OK
    //alert(window.location.pathname); //OK
    $( "div#lichess:has(div#lichess_forum)" ).addClass( "nomargin-left" ).attr("style", "margin-left: 0px !important;"); //OK
    //$( "#site_header" ).addClass( "test" ).attr("style", "display: none !important;"); //OK
    //$( "#site_header" ).show();
    //$( "#site_header" ).hide(); //OK
//    $( "#site_header" ).remove(); //OK but bug with popup profile
    $( "#site_header" ).hide(); //thanks to RaulJose

}

//$( "div#lichess_forum" ).parents( "div#lichess" ).css("margin-left", "0px !important"); //NOK
//$( "div#lichess:has(div#lichess_forum)" ).addClass( "nomargin-left" ); //OK
//$( 'div#lichess:has(div#lichess_forum)' ).css({'margin-left': '0px !important','property':'value'}); //NOK

//if (window.location.href === 'http://my.awesome.we/bsite.html') { $('.myElementClass').css('text-align','center'); }
//$('.myElementClass').css('text-align','center');

// Tournament part
// always rated selected
// + https://duckduckgo.com/?q=if+window.location+indexof+%3D+with+slash+through+it
// + https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
// + https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/pathname
// + https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/url

//if (window.location.href === 'lichess.org/tournament/new') { //NOK
//if (window.location.href === 'http://en.lichess.org/tournament/new') { //OK
if (window.location.pathname === '/tournament/new') { //OK
//if (window.location.pathname.indexOf("/tournament/new") > -1) { //OK
//if (window.location.href.indexOf("/tournament/new") > -1) { //OK
//alert(window.location.pathname); //OK
//        document.evaluate("//select[@name='system']",document,null,9,null).singleNodeValue.selectedIndex=0;
//        document.evaluate("//select[@name='variant']",document,null,9,null).singleNodeValue.selectedIndex=0;
        document.evaluate("//select[@name='mode']",document,null,9,null).singleNodeValue.selectedIndex=1; //0=casual 1=rated
//        document.evaluate("//select[@name='clockTime']",document,null,9,null).singleNodeValue.selectedIndex=0;
//        document.evaluate("//select[@name='clockIncrement']",document,null,9,null).singleNodeValue.selectedIndex=1;
//        document.evaluate("//select[@name='minutes']",document,null,9,null).singleNodeValue.selectedIndex=3;
//        document.evaluate("//select[@name='minPlayers']",document,null,9,null).singleNodeValue.selectedIndex=3;
    }
}


//http://www.pressinganswer.com/751995/check-if-variable-contains-any-characters-in-array


/////////////////////////////////////////////////////////////////////////////
//In JavaScript, everything is truthy or falsy and for numbers, 0 means false, everything else true. So you could write:
//if ($(selector).length)
//and you don't need that > 0 part.
/////////////////////////////////////////////////////////////////////////////


// Hide TV ads from some users.
// thanks to robertmaxrees from #jquery
//http://fiddle.jshell.net/yrq6tb81/6/
//http://fiddle.jshell.net/ehfupx92/16/
//http://fiddle.jshell.net/ehfupx92/19/
// want it check only in root url like for this example there: http://fiddle.jshell.net/
if (streamOnAir) {
    if (window.location.pathname === '/') {

        //to test on fiddle
        //if (window.location.pathname === '/_display/') {

        if ($('#streams_on_air a span').length) {
            // list of most users streams:
            // BlitzStream, ZugAddict, kingscrusher, Amazingoid, Chessmotion, ChessWhiz
            // Case sensitive
            var myArray = ["JohnDoe",
                           "ChessWhiz",
                           "Chessmotion",
                           "Amazingoid",
                           "ZugAddict",
                           "kingscrusher",
                           "BlitzStream"],
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
                hasValue = myArray.some(function(currentValue) {
                    return $('#streams_on_air a span:contains(' + currentValue + ')').length > 0;
                });
            if (hasValue) {
                $("#streams_on_air").remove();
                console.log('#streams_on_air removed');
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////
// http://api.jquery.com/contains-selector/
//if ($( "#streams_on_air:contains('BlitzStream')" )) { $( "div#streams_on_air" ).remove(); }
// http://fiddle.jshell.net/ehfupx92/11/
// http://fiddle.jshell.net/ehfupx92/12/
// if ( $( "#streams_on_air a span:contains('Target')" ).length ) { $( "#streams_on_air" ).remove(); } //OK
// 

//if ( $( "#streams_on_air a span:contains('Target')" ).text() ) { $( "#streams_on_air" ).remove(); } //OK
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// in JS
// http://fiddle.jshell.net/robertmaxrees/ehfupx92/9/ 
// fork http://fiddle.jshell.net/357r79wv/
//var streamsOnAir = document.getElementById('streams_on_air'),
//    theSpan = streamsOnAir.getElementsByTagName('span')[0];
//if (theSpan.textContent.indexOf('Target') > -1) {
//    streamsOnAir.parentElement.removeChild(streamsOnAir);
//};
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// in JS but not what I wanted exactly
// http://jsfiddle.net/bsuf908x/
//<div id="#theid">Target that can't be removed
//    <span>free Target to remove</span>
//</div>
//var parent = document.getElementById('#theid'),
//    spans = parent.getElementsByTagName('span');
//spans.length && (parent.parentNode.removeChild(parent))
/////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
//*[@id="streams_on_air"]/a/span

//if ($( "span:contains('Some Word')" )) { $( "div#streams_on_air" ).remove(); }
//if ($( "div#timeline div.entries div.entry:contains('andonuts')" )) { $( "div#site_header" ).remove(); }; //NOK
//if ($( "#timeline:contains('something')" )) { $( "div#site_header" ).remove() }
//if ($( "span:contains('ZugAddict')" )) { $( "div#streams_on_air" ).remove(); }

//if('#divId').text().indexOf("this string/part of this string") != -1)
//{} else {}

//if( $('div.entry').text().indexOf("andonuts") != -1) {
//    $( "div#site_header" ).remove();
//}

// if( $('span').text().indexOf("BlitzStream") != -1) {$( "#streams_on_air" ).remove();}

//if (document.evaluate("//div[@id='streams_on_air']"/a/span/text().indexOf("this string/part of this string") != -1) { $( "#streams_on_air" ).remove(); }
//if (document.evaluate("//div[@id='streams_on_air']/a/span/").text().indexOf("BlitzStream") != -1) { $( "#streams_on_air" ).remove();}

//http://www.javascriptag.com/238_13284383/
// Other Answer1
// How about this:
//if ($('.entry:contains("andonuts")').length > 0 ){$( "#site_header" ).remove();}

// Alternatively you could do this:
// if( $('div.entry').text().indexOf("andonuts") !== -1 ) {  $( "#site_header" ).remove();}


//$( "div:contains('John')" ).css( "text-decoration", "underline" );
/////////////////////////////////////////////////////////////////////////////
