// Variable for debugging
let DEBUG = false;

var playField, playFieldCtx, fieldWidth, fieldHeight;
var squareWidth, squareHeight;
var scoreLabel;

var villian, player;
var seedXPos, seedYPos;

var score = 0;

window.onload = function() {
	playField = document.querySelector("#playField");
	scoreLabel = document.querySelector("#scoreLabel");

	playFieldCtx = playField.getContext('2d');
	fieldHeight = playField.height;
	fieldWidth = playField.width;

	seedYPos = Math.random()*fieldHeight-20;
	seedXPos = Math.random()*fieldWidth-20;

	villian = {
		xPos: fieldWidth/2,
		yPos: fieldHeight/2,
		xVelocity: 3,
		yVelocity: 2,
		width: 30,
		height: 30,
		color: 'red'
	}

	player = {
		xPos: fieldWidth/4,
		yPos: fieldHeight/4,
		xAcceleration: 3,
		yAcceleration: 3,
		xVelocity: 3,
		yVelocity: 3,
		radius: 15,
		color: 'blue'
	}

	window.addEventListener('keydown', function(event) {
		if (event.keyCode === 40 || event.keyCode === 83) {
				player.yVelocity = player.yAcceleration;
				player.xVelocity = 0;
		}
		else if (event.keyCode === 38 || event.keyCode === 87) {
				player.yVelocity = -player.yAcceleration;
				player.xVelocity = 0;
		}
		else if (event.keyCode === 39 || event.keyCode === 68) {
				player.xVelocity = player.xAcceleration;
				player.yVelocity = 0;
		}
		else if (event.keyCode === 37 || event.keyCode === 65) {
				player.xVelocity = -player.xAcceleration;
				player.yVelocity = 0;
		}
	});

	// Entering the main loop
	mainLoop();
}

function mainLoop() {
	playFieldCtx.save();

	playFieldCtx.clearRect(0, 0, fieldWidth, fieldHeight);

	drawVillian();	
	drawPlayer();
	drawSeed();
	let gameOver = checkForCollision();
	checkForSeedRetrieval();

	playFieldCtx.restore();

	if (!gameOver) window.requestAnimationFrame(mainLoop);
	else endGame();
}

function checkForSeedRetrieval() {
	if (player.xPos + player.radius >= seedXPos && player.xPos - player.radius <= seedXPos + 10 &&
		player.yPos + player.radius >= seedYPos && player.yPos - player.radius <= seedYPos + 10) {

		score++;
		player.radius -= 0.25 * player.radius;
		seedYPos = Math.random()*fieldHeight;
		seedXPos = Math.random()*fieldWidth;
		scoreLabel.innerHTML = "";
		scoreLabel.innerHTML += "Score: " + score;
	}
}

function drawSeed() {
	playFieldCtx.save();

	playFieldCtx.fillStyle = 'green';
	playFieldCtx.fillRect(seedXPos, seedYPos, 10, 10);

	playFieldCtx.restore();
}

function endGame() {
	playFieldCtx.save();
	playFieldCtx.clearRect(0, 0, fieldWidth, fieldHeight);
	playFieldCtx.textAlign = 'center';
	playFieldCtx.font = '20px Georgia'
	playFieldCtx.fillText('Game Over', fieldWidth/2, fieldHeight/2);
	playFieldCtx.restore();

	playField.innerHTML += '<button>Play Again</button>'
}

function checkForCollision() {
	return ((player.xPos - player.radius) <= 0 ||
			(player.xPos + player.radius) >= fieldWidth ||
			(player.yPos - player.radius) <= 0 ||
			(player.yPos + player.radius) >= fieldHeight ||
			(player.xPos + player.radius) >= villian.xPos && player.xPos + player.radius <= villian.xPos + villian.width &&
			(player.yPos + player.radius) >= villian.yPos && player.yPos + player.radius <= villian.yPos + villian.height ||
			(player.xPos - player.radius) <= villian.xPos + villian.width && player.xPos - player.radius >= villian.xPos &&
			(player.yPos - player.radius) <= villian.yPos + villian.height && player.yPos - player.radius >= villian.yPos);
}

function drawPlayer() {
	playFieldCtx.save();

	playFieldCtx.fillStyle = player.color;

	playFieldCtx.beginPath();
	playFieldCtx.arc(player.xPos, player.yPos, player.radius, 0, 2*Math.PI)
	playFieldCtx.fill();

	player.xPos += player.xVelocity;
	player.yPos += player.yVelocity;

	player.radius += 0.1;

	playFieldCtx.restore();
}

function drawVillian() {
	playFieldCtx.save();

	playFieldCtx.fillStyle = villian.color;
	playFieldCtx.fillRect(villian.xPos, villian.yPos, villian.width, villian.height);

	if ((villian.yPos + villian.height) >= fieldHeight || villian.yPos <= 0) {
		villian.yVelocity = -villian.yVelocity;
	}
	if ((villian.xPos + villian.width) >= fieldWidth || villian.xPos <= 0) {
		villian.xVelocity = -villian.xVelocity;
	}

	villian.xPos += villian.xVelocity;
	villian.yPos += villian.yVelocity;

	playFieldCtx.restore();
}
