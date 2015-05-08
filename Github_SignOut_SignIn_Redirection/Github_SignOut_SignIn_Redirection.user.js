// ==UserScript==
// @id          Github_SignOut_SignIn_Redirection@https://github.com/mawekuwe/UserScripts
// @name        Github SignOut SignIn Redirection
// @namespace   https://github.com/mawekuwe/UserScripts
// @description Sign-out redirection to sign-in page in github instead of the homepage.
// @author      mawekuwe
// @copyright   2015+, mawekuwe
// @license     GNU GPLv3
// @homepage    https://github.com/mawekuwe/UserScripts/tree/master/Github_SignOut_SignIn_Redirection
// @homepageURL https://github.com/mawekuwe/UserScripts/tree/master/Github_SignOut_SignIn_Redirection
// @downloadURL https://github.com/mawekuwe/UserScripts/raw/master/Github_SignOut_SignIn_Redirection/Github_SignOut_SignIn_Redirection.user.js
// @updateURL   https://github.com/mawekuwe/UserScripts/raw/master/Github_SignOut_SignIn_Redirection/Github_SignOut_SignIn_Redirection.user.js
// @supportURL  https://github.com/mawekuwe/UserScripts/issues
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=
// @version     1.1
// @grant       none
// @run-at      document-end
// @include     https://github.com/*
// @icon        https://assets-cdn.github.com/favicon.ico
// ==/UserScript==

var myRedirectStorageKey = 'redirectMeToLogin';

if ( localStorage.getItem( myRedirectStorageKey ) ) {
    localStorage.removeItem( myRedirectStorageKey );
    window.location.href = 'https://github.com/login';
}

$( '.sign-out-button' ).on( 'click', function() {
   localStorage.setItem( myRedirectStorageKey, true );
} );
