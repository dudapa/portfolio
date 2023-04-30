// buttons and rules
const btnRules = document.querySelector('.btn-rules');
const btnClose = document.querySelector('.btn-close');
const rules = document.querySelector('.rules');

// Score
let score = document.querySelector('.score');
let scoreRecord = getScore();

// Game Over
let gameOver = document.querySelector('.game-over');
let isGameRunning = true;

// Button play again
const playAgain = document.querySelector('.play-again');

// Top three the highest scores 
const first = document.querySelector('.first') 
const second = document.querySelector('.second') 
const third = document.querySelector('.third')

// Canvas and context
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

// Playboard
const width = (canvas.width = 600);
const height = (canvas.height = 600);
const radius = 25;

// Player
let playerScore = 0;

// Snake
const initialPositionX = width / 2 - radius;
const initialPositionY = height / 2 + radius;
let snakePositionX = initialPositionX;
let snakePositionY = initialPositionY;
let snakeColorHead = 'black';
let lastPositionSnake = { x: snakePositionX, y: snakePositionY };
let tail = [];

// Motion variables
let velocityX = 1;
let velocityY = 0;
let snakeSpeed = 2 * radius;
const fps = 10;

// Food
let foodPositionX = randomPosition();
let foodPositionY = randomPosition();
let foodColor = randomColor();

// Sounds
const collectStar = new Audio();
collectStar.src = '/media/games/snake/sounds/collection.mp3';
collectStar.setAttribute('preload', 'auto');
const drum = new Audio();
drum.src = '/media/games/snake/sounds/drum.mp3';
drum.setAttribute('preload', 'auto');
const hihi = new Audio();
hihi.src = '/media/games/snake/sounds/hihi.mp3';
hihi.setAttribute('preload', 'auto');

// Draw initial positons
drawGrid(radius, width, height);
drawSnakePosition(snakePositionX, snakePositionY);
makeFood(foodPositionX, foodPositionY, foodColor);
updateTop3();
// Game loop function (main function)
function gameLoop() {
  if (isGameRunning) {
    drawGrid(radius, width, height);
    recordLastPosition();
    snakeMotion();
    drawSnakePosition(snakePositionX, snakePositionY);
    eatFood();
    makeFood(foodPositionX, foodPositionY, foodColor);
    addLastPositionToTail(lastPositionSnake);
    drawTail();
    checkCollision();
    setTimeout(gameLoop, 1000 / fps);
  }
}

// ---UNCOMENT TO LAUNCH THE GAME----
gameLoop()

// PLAYBOARD

// Draw grid
function drawGrid(radius, width, height) {
  drawBackground(width, height);
  for (let i = radius; i <= width; i += 2 * radius) {
    for (let j = radius; j <= height; j += 2 * radius) {
      ctx.beginPath();
      ctx.arc(i, j, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

// Draw background
function drawBackground(width, height) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
}

// SNAKE

// Control the snake by player's input
function playerMove(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    if (velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    }
  }
  if (event.key === 'ArrowDown' || event.key === 's') {
    if (velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    }
  }
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    if (velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    }
  }
  if (event.key === 'ArrowRight' || event.key === 'd') {
    if (velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  }
}

// Record the last position of the snake
function recordLastPosition() {
  lastPositionSnake.x = snakePositionX;
  lastPositionSnake.y = snakePositionY;
}

// Snake motion
function snakeMotion() {
  snakePositionX += snakeSpeed * velocityX;
  snakePositionY += snakeSpeed * velocityY;
  checkOutPosition();
}

// Draw the current position of snake
function drawSnakePosition(x, y) {
  ctx.fillStyle = snakeColorHead;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Add a smile emoji icon
  ctx.fillStyle = 'white';
  ctx.font = '50px FontAwesome';
  ctx.fillText('\uf118', x - 21.5, y + 17.5);
}

// Check if the snake is out the playboard
function checkOutPosition() {
  if (snakePositionY > height) {
    snakePositionY = radius;
  }
  if (snakePositionY < 0) {
    snakePositionY = height - radius;
  }
  if (snakePositionX > width) {
    snakePositionX = radius;
  }
  if (snakePositionX < 0) {
    snakePositionX = width - radius;
  }
}

// FOOD

// Give random position of food
function randomPosition() {
  let span = width / (2 * radius);
  return Math.floor(Math.random() * span) * (2 * radius) + 25;
}

// Make food and place it on the playboard
function makeFood(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Add a star icon
  ctx.fillStyle = 'white';
  ctx.font = '40px FontAwesome';
  ctx.fillText('\uf005', x - 18, y + 15);
}

// Check if the food is eaten, if so then make a new food
function eatFood() {
  if (snakePositionX === foodPositionX && snakePositionY === foodPositionY) {
    collectionOfStarSound();
    addToTail(foodPositionX, foodPositionY, foodColor); // Add a eaten food to the tail
    foodPositionX = randomPosition(); // Give a new x position
    foodPositionY = randomPosition(); // Give a new y position
    foodColor = randomColor(); // Give a new color
    playerScore += 1;
    score.innerHTML = `Score: ${playerScore}`;
  }
}

// TAIL

// Add the last eaten food to the tail
function addToTail(positionX, positionY, color) {
  const pieceOfTail = {
    x: positionX,
    y: positionY,
    color: color,
  };
  tail.push(pieceOfTail);
}

// Draw tail
function drawTail() {
  tail.forEach(function (ele) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(ele.x, ele.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  });
}

// Reorganize coordinates of tail base on the last position of the snake's head
function addLastPositionToTail(lastPosition) {
  if (tail.length === 1) {
    tail[0].x = lastPosition.x;
    tail[0].y = lastPosition.y;
  }
  if (tail.length > 1) {
    tempX = tail[0].x;
    tempY = tail[0].y;
    tail[0].x = lastPosition.x;
    tail[0].y = lastPosition.y;

    for (let i = 1; i < tail.length; i++) {
      tempAfterX = tail[i].x;
      tempAfterY = tail[i].y;
      tail[i].x = tempX;
      tail[i].y = tempY;
      tempX = tempAfterX;
      tempY = tempAfterY;
    }
  }
}

// Check collision of head and tail
function checkCollision() {
  tail.forEach(function (ele) {
    if (snakePositionX === ele.x && snakePositionY === ele.y) {
      gameOverSound();
      isGameRunning = false;
      gameOver.classList.add('dead');
      playAgain.classList.add('dead');

      scoreRecord.push(playerScore);
      localStorage.setItem('score', JSON.stringify(scoreRecord));
      updateTop3();
    }
  });
}

// SCORE

// Select three the highest scores
function threeHighest(array) {
  array.sort(function (a, b) {
    return b - a; // Descending order
  });
  return array.slice(0, 3);
}

// Get the score from the Local Storage
function getScore(){
  return localStorage.getItem('score') ? JSON.parse(localStorage.getItem('score')) : [];
}

// Update three the highest scores
function updateTop3(){
  const top3 = threeHighest(scoreRecord);
  for(let i = 0; i < top3.length; i++){
    if (i === 0){
      first.textContent = `${top3[i]} `;
    } else if(i === 1) {
      second.textContent = `${top3[i]} `;
    } else if(i === 2) {
      third.textContent = `${top3[i]} `;
    }
  }
}

// SOUNDS
function collectionOfStarSound() {
   collectStar.pause();
   collectStar.currentTime = 0;
   collectStar.play();
}

function gameOverSound() {
   drum.play();
   hihi.play();
}

// RANDOM VALUES

// Give a random number
function randomNumber() {
  return Math.floor(Math.random() * 256);
}

// Give a random color
function randomColor() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

// Show rules
function showRules() {
  rules.classList.add('show');
}

// Close rules
function closeRules() {
  rules.classList.remove('show');
}

function restart(){
  location.reload();
}

// Listeners
document.addEventListener('keydown', playerMove);
btnRules.addEventListener('click', showRules);
btnClose.addEventListener('click', closeRules);
playAgain.addEventListener('click', restart);
