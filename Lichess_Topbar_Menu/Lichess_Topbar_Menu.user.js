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
// @version     1.4
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

    // TV history
    '#tv_history div.content {height: 250px !important;}'

);

// Topbar Menu
// thanks to RaulJose for internationalized menu entries.
if (oldmenu) {
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
}


$(document).ready(function() {
    $("#primary_nav_wrap [href]").each(function() {
        if (this.href == window.location.href) {
            $(this).addClass("current-menu-item");
        }
    });
});

// Forum part
if (window.location.pathname.indexOf("/forum") > -1) {
    $( "div#lichess:has(div#lichess_forum)" ).addClass( "nomargin-left" ).attr("style", "margin-left: 0px !important;"); //OK
    $( "#site_header" ).hide(); // .hide instead of .remove // thanks to RaulJose

}

// Tournament part
// always rated selected
if (window.location.pathname === '/tournament/new') {
    //document.evaluate("//select[@name='system']",document,null,9,null).singleNodeValue.selectedIndex=0;
    //document.evaluate("//select[@name='variant']",document,null,9,null).singleNodeValue.selectedIndex=0;
    document.evaluate("//select[@name='mode']",document,null,9,null).singleNodeValue.selectedIndex=1; //0=casual 1=rated
    //document.evaluate("//select[@name='clockTime']",document,null,9,null).singleNodeValue.selectedIndex=0;
    //document.evaluate("//select[@name='clockIncrement']",document,null,9,null).singleNodeValue.selectedIndex=1;
    //document.evaluate("//select[@name='minutes']",document,null,9,null).singleNodeValue.selectedIndex=3;
    //document.evaluate("//select[@name='minPlayers']",document,null,9,null).singleNodeValue.selectedIndex=0;
}


// Hide TV ads from some users.
// thanks to robertmaxrees from #jquery
if (streamOnAir) {
    if (window.location.pathname === '/') {

        if ($('#streams_on_air a span').length) {
            // Case sensitive
            var myArray = ["JohnDoe",
                           "JaneDoe",
                           "Jupeq"],
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
