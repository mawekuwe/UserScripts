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
// @version     1.2
// @grant       none
// @run-at      document-end
// @include     http://*.lichess.org/*
// @match       http://*.lichess.org/*
// ==/UserScript==

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
    '#nav li {display:block;float:left;list-style-type:none;width:auto;}' +
    '#primary_nav_wrap {}' +
    '#primary_nav_wrap ul {list-style:none;position:relative;float:left;margin:0;padding:0}' +
    '#primary_nav_wrap ul a {display:block;text-decoration:none;line-height:32px;padding:0 15px;}' +
    '#primary_nav_wrap ul li {position:relative;float:left;	margin:0;padding:0}' +
    '/*#primary_nav_wrap ul li.current-menu-item {background:#ddd}*/' +
    'div #primary_nav_wrap ul li:hover {background-color:#252525 !important; opacity: 1 !important;}' +
    '#primary_nav_wrap ul ul {display:none;position:absolute;top:100%;left:0;padding:0}' +
    'div #primary_nav_wrap ul ul {background-color:#2B2B2B !important; opacity: 1 !important;}' +
    '#primary_nav_wrap ul ul li {float:none;width:200px}' +
    '#primary_nav_wrap ul ul a {line-height:120%;padding:10px 15px}' +
    '#primary_nav_wrap ul ul ul {top:0;left:100%}' +
    '#primary_nav_wrap ul li:hover > ul{display:block}'
);

$("#top").append(
    '<div><nav id="primary_nav_wrap" class="user_show">' +
    '<ul>' +
    '    <li class="topmenu"><a class="link blank_if_play" href="/">Play</a>' +
    '      <ul>' +
    '        <li class="dropmenu" style=""><a class="link blank_if_play" href="/?any#hook">Create a game</a></li>' +
    '        <!--<li class="dropmenu" style=""><a class="link blank_if_play" href="/games">Games</a></li>-->' +
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
    
