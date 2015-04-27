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
// @version     1.3draft
// @grant       none
// @run-at      document-end
// @include     http://*.lichess.org/*
// @match       http://*.lichess.org/*
// ==/UserScript==

// changelog
// version 1.3
// fixed background color menu for light/dark theme.
// Added new hierarchy menu and the previous one as optionnal.
// Uses the full width of the site where you are on the forum which involves hiding the useless and empty sidebar and the logo.
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
    '#primary_nav_wrap ul {list-style:none;position:relative;float:left;margin:0;padding:0}' +
    '#primary_nav_wrap ul a {display:block;text-decoration:none;line-height:32px;padding:0 15px;}' +
    '#primary_nav_wrap ul li {position:relative;float:left;	margin:0;padding:0}' +
    '/*#primary_nav_wrap ul li.current-menu-item {background:#ddd}*/' +
    'body.dark #primary_nav_wrap ul li:hover {background-color:#252525 !important;}' +
    'body.light #primary_nav_wrap ul li:hover {background-color:#d7d7d7 !important;}' +
    '#primary_nav_wrap ul ul {display:none;position:absolute;top:100%;left:0;padding:0}' +
    'body.dark #primary_nav_wrap ul ul {background-color:#2B2B2B !important;}' +
    'body.light #primary_nav_wrap ul ul {background-color:white !important;}' +
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
    '/*#primary_nav_wrap ul li.topmenu {cursor: default;}*/'
);

// Forum part
if (window.location.href.indexOf("forum") > -1) {
    $( "div#lichess:has(div#lichess_forum)" ).addClass( "nomargin-left" ).attr("style", "margin-left: 0px !important;"); //OK
    //$( "#site_header" ).addClass( "test" ).attr("style", "display: none !important;"); //OK
    //$( "#site_header" ).show();
    //$( "#site_header" ).hide(); //OK
    $( "#site_header" ).remove(); //OK
}

//$( "div#lichess_forum" ).parents( "div#lichess" ).css("margin-left", "0px !important"); //NOK
//$( "div#lichess:has(div#lichess_forum)" ).addClass( "nomargin-left" ); //OK
//$( 'div#lichess:has(div#lichess_forum)' ).css({'margin-left': '0px !important','property':'value'}); //NOK

//if (window.location.href === 'http://my.awesome.we/bsite.html') { $('.myElementClass').css('text-align','center'); }
//$('.myElementClass').css('text-align','center');

if (oldmenu) {
    // if false this code is not executed
    $("#top").append(
        '<div><nav id="primary_nav_wrap" class="user_show">' +
        '<ul>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/">Play</a>' +
        '      <ul>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/?any#hook">Create a game</a></li>' +
        '        <!--<li class="dropmenu" style=""><a class="link blank_if_play" href="/games">Games</a></li>-->' +
        '        <li class="dropmenu" style=""><a href="/">trans.tournament()</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/training">Training</a>' +
        '      <ul>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/opening">Openings</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/coordinate">Coordinates</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/video">Video library</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/tournament">Tournaments</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/simul">Simul</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/player">Players</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/team">Teams</a></li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/forum">Forum</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/general-chess-discussion">General Chess Discussion</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/game-analysis">Game analysis</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/lichess-feedback">Lichess Feedback</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum/off-topic-discussion">Off-Topic Discussion</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/tv">Lichess TV</a></li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/qa">Q&amp;A</a></li>' +
        '    <li class="topmenu"><a class="link blank_if_play" href="/editor">Board editor</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/analysis">Analysis</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/paste">Import game</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/games/search">Advanced search</a></li>' +
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
        '    <li class="topmenu link blank_if_play"><a class="link blank_if_play" href="/">PLAY</a>' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/?any#hook">Create a game</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/tournament">Tournaments</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/simul">Simul</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/tv">Lichess TV</a></li>' +
        '        <!--<li class="dropmenu"><a class="link blank_if_play" href="/games">Games</a></li>-->' +
        '        <!--<li class="dropmenu" style=""><a href="/">trans.tournament()</a></li>-->' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu link blank_if_play" style="cursor: default !important;">LEARN' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/training">Training</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/opening">Openings</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/training/coordinate">Coordinates</a></li>' +
        '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/video">Video library</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu link blank_if_play" style="cursor: default !important;">COMMUNITY' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/player">Players</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/team">Teams</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/forum">Forum</a>' +
        '          <ul>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/general-chess-discussion">General Chess Discussion</a></li>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/game-analysis">Game analysis</a></li>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/lichess-feedback">Lichess Feedback</a></li>' +
        '            <li class="dropmenu"><a class="link blank_if_play" href="/forum/off-topic-discussion">Off-Topic Discussion</a></li>' +
        '          </ul>' +
        '        </li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/qa">Questions &amp; Answers</a></li>' +
        '      </ul>' +
        '    </li>' +
        '    <li class="topmenu link blank_if_play" style="cursor: default !important;">TOOLS' +
        '      <ul>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/editor">Board editor</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/analysis">Analysis</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/paste">Import game</a></li>' +
        '        <li class="dropmenu"><a class="link blank_if_play" href="/games/search">Advanced search</a></li>' +
        '      </ul>' +
        '    </li>' +
        '</ul>' +
        '</nav></div>');
    //$( "li.topmenu" ).attr("style", "cursor: default !important;");
}
