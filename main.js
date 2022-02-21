let board, cards, waiting, imageSet, pair, extraClicks;
let solved;
let images = [];

window.onload = function () {
	imageSet = "animals1"; // default
	board = document.getElementById("board");
	initGame();
}

function gmSelect() {
	let val = document.getElementById("gmSelect").value;
	if (val === "random") fillRandoms();
	imageSet = val;
	initGame();
}

function fillRandoms() {
	allRandom = [...animals1, ...mountains, ...fungi, ...reptiles, ...cats, ...nudibranchs];
	for (let i = 0; i < 12; i++) {
		let randNr = Math.floor( Math.random() * allRandom.length);
		random.push(allRandom[randNr]);
		allRandom.splice(randNr, 1);
	}
}

function initGame() {
	clearAll();
	document.body.style.backgroundImage = "url(media/" + imageSet + "/" + imageSet + "_bg.jpg)";

	getImages();
}

function getImages() {
	images = [...window[imageSet], ...window[imageSet]]; // get images x 2 and convert string to variableName
	shuffleImages();
	layCards();
}

function shuffleImages() {
	images = images.map(value => ({ value, sort: Math.random()}))
		.sort((a, b) => a.sort - b.sort)
		.map(({value}) => value)
}

function layCards() {
	board.innerHTML = "";
	for (let i in images) {
		//board.innerHTML += "<button onclick='toggle(this.id)' id='" + i + "'>" + images[i] + "</button>"
		board.innerHTML += "<button onclick='toggle(this.id)' id='" + i + "'>"
	}
	cards = Array.from(document.querySelectorAll("#board > button"));
}

function toggle(s) {
	startTimer();

	if (cards[s].style.length !== 0) { // if card has style (bg-img, means it is open), ignore click (return)
		return;
	}
	
	if (waiting) { // wait for timeout to end
		return;
	}

	updateClicks();

	cards[s].style.backgroundImage = "url(media/" + imageSet + "/" + images[s] + ".jpg)";
	pair.push([s, images[s]]);

	if (pair.length < 2) return;

	if ( pair[0][0] !== pair[1][0] && // needed if user clicks on the same img twice
			 pair[0][1] === pair[1][1] ) {

				solved.push(pair); // later needed to check if all solved
				if (solved.length === images.length / 2) gameSolved();

				pair = [];
			}

	waiting = true; // prevent user from clicking 3rd or more cards

	setTimeout(function () {
		for (let i in pair) cards[pair[i][0]].style = "";
		pair = [];
		waiting = false;
	}, 1000);
}

function gameSolved() {
	stopTimer();
	updateExtraClicks();
}


function clearAll() {
	clearTimer();
	clearClicks();
	clearExtraClicks();
	pair = [];
	solved = [];
}
