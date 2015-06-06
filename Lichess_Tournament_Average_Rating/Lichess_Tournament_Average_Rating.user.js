// ==UserScript==
// @id          Lichess_Tournament_Average_Rating@https://github.com/mawekuwe/UserScripts
// @name        Lichess Tournament Average Rating
// @namespace   https://github.com/mawekuwe/UserScripts
// @description Lichess.org display average rating on tournament standing table before it start
// @author      mawekuwe
// @copyright   2015+, mawekuwe
// @license     GNU GPLv3
// @homepage    https://github.com/mawekuwe/UserScripts/tree/master/Lichess_Tournament_Average_Rating
// @homepageURL https://github.com/mawekuwe/UserScripts/tree/master/Lichess_Tournament_Average_Rating
// @downloadURL https://github.com/mawekuwe/UserScripts/raw/master/Lichess_Tournament_Average_Rating/Lichess_Tournament_Average_Rating.user.js
// @updateURL   https://github.com/mawekuwe/UserScripts/raw/master/Lichess_Tournament_Average_Rating/Lichess_Tournament_Average_Rating.user.js
// @supportURL  https://github.com/mawekuwe/UserScripts/issues
// @contributionURL
// @version     1.2
// @grant       none
// @run-at      document-end
// @include      /\.lichess\.org\/tournament\/\w{8}$/
// @icon         https://raw.githubusercontent.com/ornicar/lila/master/public/images/favicon-32-white.png
// ==/UserScript==


// http://jsfiddle.net/vqnn7v2h/10/
function ratingAverage() {
	var average = 0;
	var list = $('.user_list a.user_link .progress');

	list.each(function () {
		average += parseInt($(this).text(), 10);
	});

	average /= list.length;
	var new_number = Math.round(average);
	var new_number2 = Math.round(average).toFixed(2); //.toFixed(2) is not necessary here
	$(".large").append(" (Avg: " + new_number + ")");
	//console.log("Average: " + average);
	console.log("new_number: " + new_number);
	//console.log("new_number2: " + new_number2);

}
if (window.location.pathname.indexOf("/tournament/") > -1 && $('.slist.user_list').length) {
	ratingAverage();
}
