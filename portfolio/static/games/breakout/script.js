// Canvas
const canvas = document.querySelector('.canvas');
const width = (canvas.width = 800);
const height = (canvas.height = 600);
const ctx = canvas.getContext('2d');

// Rules
const showBtn = document.querySelector('.btn-rules');
const closeBtn = document.querySelector('.btn-close');
const rules = document.querySelector('.rules');

// Settings
const settingsBtn = document.querySelector('.btn-settings');
const settingsBtnClose = document.querySelector('.btn-close-settings');
const settings = document.querySelector('.settings');

// Souds
const reflection = new Audio();
reflection.src = '/media/games/breakout/sounds/reflection.mp3';
reflection.setAttribute('preload', 'auto');

const breakBrick = new Audio();
breakBrick.src = '/media/games/breakout/sounds/breakBrick.mp3';
breakBrick.volume = 0.2;
breakBrick.setAttribute('preload', 'auto');

const soundGameOver = new Audio();
soundGameOver.src = '/media/games/breakout/sounds/gameOver.mp3';
soundGameOver.setAttribute('preload', 'auto');

const soundGameWin = new Audio();
soundGameWin.src = '/media/games/breakout/sounds/winGame.mp3';
soundGameOver.setAttribute('preload', 'auto');

// Colors
const body = document.querySelector('body');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const color3 = document.querySelector('.color3');
const color4 = document.querySelector('.color4');
const color5 = document.querySelector('.color5');
const color6 = document.querySelector('.color6');
const color7 = document.querySelector('.color7');
const randomColorBtn = document.querySelector('.random-color');
let root = document.documentElement;
let baseColor = getComputedStyle(root).getPropertyValue('--default-color');

const colors = [
  [color1, '#f50a54'],
  [color2, '#00cc99'],
  [color3, '#0099ff'],
  [color4, '#cc33ff'],
  [color5, '#ffcc00'],
  [color6, '#6600cc'],
  [color7, '#000'],
];

// Save color in localStorage
setLocalStorageColor();
let localStorageColor = getLocalStorageColor();

// Game Over
const gameOver = document.querySelector('.game-over');
let isGameRunning = false;

// Game win
const gameWin = document.querySelector('.game-win');
let breakBricksCount = 0;
let isGameStop = false;

// Start game
const startGameBtn = document.querySelector('.start-game');

// Play again
const playAgain = document.querySelector('.play-again');

// Score
let score = document.querySelector('.score');
let scoreRecord = getScore();

// Top three the highest scores
const first = document.querySelector('.first');
const second = document.querySelector('.second');
const third = document.querySelector('.third');

// Time
let seconds = 0;
let tens = 0;
let secondsFormat = '00';
let tensFormat = '00';
let isSetInterval = false;
let interval;

// Ball object
const ball = {
  x: width / 2,
  y: height / 2,
  dx: 1,
  dy: -1,
  size: 10,
  speed: 6,
};

// Paddle object
const paddle = {
  width: 100,
  height: 10,
  x: width / 2 - 50,
  y: height - 20,
  dx: 0,
  speed: 10,
};

// Brick object
const brick = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const brickRow = 5;
const brickColumn = 9;

// Create all bricks
const bricks = [];
for (let i = 0; i < brickRow; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumn; j++) {
    const x = brick.offsetX + (brick.width + brick.padding) * j;
    const y = brick.offsetY + (brick.height + brick.padding) * i;
    bricks[i][j] = { x, y, ...brick };
  }
}

// GAME LOOP
function gameLoop() {
  if (isGameRunning) {
    if (!isSetInterval) {
      startTime();
      isSetInterval = true;
    }

    refresCanvas();
    drawStuff();
    collisions();
    moveStuff();
  }
  requestAnimationFrame(gameLoop);
}

// Draw all initial positions of stuff
drawStuff();

// Game loop
gameLoop();

// Canvas
function refresCanvas() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
}

// Draw basic stuff
function drawStuff() {
  body.style = `background:${localStorageColor}`;
  drawBall();
  drawPaddle();
  drawAllBricks();
  drawTime();
  updateTop3();
}

// Move stuff
function moveStuff() {
  moveBall();
  movePaddle();
}

// Check all collision
function collisions() {
  bottomCheck();
  checkWin();
  wallCollision();
  checkPaddleReflect();
  brickDestroyed();
}

// BALL FUNCTIONS

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = `${localStorageColor}`;
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// Move ball
function moveBall() {
  ball.x += ball.dx * ball.speed;
  ball.y += ball.dy * ball.speed;
}

// Walls collision
function wallCollision() {
  if (ball.y - ball.size < 0) {
    makeReflectionSound();
    ball.dy *= -1;
  }
  // if (ball.y + ball.size > height) {
  //   makeReflectionSound();
  //   ball.dy *= -1;
  // }
  if (ball.x - ball.size < 0) {
    makeReflectionSound();
    ball.dx *= -1;
  }
  if (ball.x + ball.size > width) {
    makeReflectionSound();
    ball.dx *= -1;
  }
}

// Paddle reflect
function checkPaddleReflect() {
  if (
    ball.x + ball.size > paddle.x &&
    ball.x - ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    makeReflectionSound();
    ball.dy *= -1;
  }
}

// Game over
function bottomCheck() {
  if (ball.y + ball.size > height) {
    makeSoundGameOver();
    isGameRunning = false;
    isGameStop = true;
    gameOver.classList.add('dead');
    playAgain.classList.add('dead');
    stopInterval();
  }
}

// Check if the player won
function checkWin() {
  if (breakBricksCount === brickColumn * brickRow) {
    makeSoundGameWin();
    isGameRunning = false;
    isGameStop = true;
    gameWin.classList.add('win');
    playAgain.classList.add('win');
    scoreRecord.push(`${secondsFormat}:${tensFormat}`);
    localStorage.setItem('breakout_score', JSON.stringify(scoreRecord));
    stopInterval();
    updateTop3();
  }
}

// PADDLE FUNCTIONS

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = `${localStorageColor}`;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Control paddle
function keyDown(e) {
  if (e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
  if (e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    paddle.dx = 0;
  }
}

function spaceDown() {
  startGame();
}

// Move paddle
function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.width > width) {
    paddle.x = width - paddle.width;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// BRICK functions

// Draw all bricks
function drawAllBricks() {
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      let brick = bricks[i][j];
      if (brick.visible) {
        drawBrick(brick);
      }
    }
  }
}

//  Check if some brick was destroyed
function brickDestroyed() {
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      let brick = bricks[i][j];
      if (
        brick.visible &&
        brick.x < ball.x - ball.size &&
        brick.x + brick.width > ball.x + ball.size &&
        brick.y + brick.height > ball.y - ball.size &&
        brick.y < ball.y + ball.size
      ) {
        makeSoundBrickBreakBrick();
        ball.dy *= -1;
        brick.visible = false;
        breakBricksCount++;
      }
    }
  }
}

// Draw brick
function drawBrick(brick) {
  ctx.fillStyle = `${localStorageColor}`;
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

// Show and close rules
function showRules() {
  rules.classList.add('show');
}

function closeRules() {
  rules.classList.remove('show');
}

// Show and close settings
function showSettings() {
  settings.classList.add('show');
}

function closeSettings() {
  settings.classList.remove('show');
}

// Default settings
function restart() {
  location.reload();
}

// TIME MEASUREMENT

function drawTime() {
  ctx.fillStyle = `${localStorageColor}`;
  ctx.font = '20px Open Sans';
  ctx.fillText(`${secondsFormat}:${tensFormat}`, width - 60, 20);
}

function runTime() {
  tens++;
  if (tens < 9) {
    tensFormat = '0' + tens;
  }
  if (tens > 9) {
    tensFormat = tens;
  }
  if (tens > 99) {
    seconds++;
    if (seconds <= 9) {
      secondsFormat = '0' + seconds;
    } else {
      secondsFormat = seconds;
    }
    tens = 0;
  }
}

function startTime() {
  interval = setInterval(runTime, 10);
}

function stopInterval() {
  clearInterval(interval);
  seconds = 0;
  tens = 0;
  secondsFormat = '00';
  tensFormat = '00';
}

// COLOR
// Change color
function colorSelected(e) {
  const selectedColor = e.target;
  colors.forEach((color) => {
    color[0].classList.remove('selected');
  });

  selectedColor.classList.add('selected');

  colors.forEach((color) => {
    if (color[0].classList.contains('selected')) {
      root.style.setProperty('--default-color', color[1]);
      baseColor = getComputedStyle(root).getPropertyValue('--default-color');
      localStorage.setItem('color', baseColor);
      localStorageColor = getLocalStorageColor();
      drawStuff();
    }
  });
}

// Make random color
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = `rgb(${r},${g},${b})`;
  root.style.setProperty('--default-color', color);
  baseColor = getComputedStyle(root).getPropertyValue('--default-color');
  localStorage.setItem('color', baseColor);
  localStorageColor = getLocalStorageColor();
  drawStuff();
}

// Set and get color from localStorage
function setLocalStorageColor() {
  localStorage.setItem(
    'color',
    localStorage.getItem('color') ? localStorage.getItem('color') : baseColor
  );
}

function getLocalStorageColor() {
  return localStorage.getItem('color');
}

// SCORE

// Select three the highest scores
function threeHighest(array) {
  array.sort(function (a, b) {
    console.log(a);
    console.log(b);
    if (parseInt(a.split(':')[0]) - parseInt(b.split(':')[0]) === 0) {
      return parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]);
    } else {
      return parseInt(a.split(':')[0]) - parseInt(b.split(':')[0]);
    }
  });
  return array.slice(0, 3);
}

// Get the score from the Local Storage
function getScore() {
  return localStorage.getItem('breakout_score')
    ? JSON.parse(localStorage.getItem('breakout_score'))
    : [];
}

// Update three the highest scores
function updateTop3() {
  const top3 = threeHighest(scoreRecord);
  for (let i = 0; i < top3.length; i++) {
    if (i === 0) {
      first.textContent = `${top3[i]} `;
    } else if (i === 1) {
      second.textContent = `${top3[i]} `;
    } else if (i === 2) {
      third.textContent = `${top3[i]} `;
    }
  }
}

function startGame() {
  if (!isGameStop) {
    isGameRunning = true;
    startGameBtn.style = 'visibility: hidden;';
  }
}

// Sounds function
function makeReflectionSound() {
  reflection.pause();
  reflection.currentTime = 0;
  reflection.play();
}

function makeSoundBrickBreakBrick() {
  breakBrick.pause();
  breakBrick.currentTime = 0;
  breakBrick.play();
}

function makeSoundGameOver() {
  soundGameOver.pause();
  soundGameOver.currentTime = 0;
  soundGameOver.play();
}

function makeSoundGameWin() {
  soundGameWin.pause();
  soundGameWin.currentTime = 0;
  soundGameWin.play();
}

// LISTENERS
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', spaceDown);
showBtn.addEventListener('click', showRules);
closeBtn.addEventListener('click', closeRules);
settingsBtn.addEventListener('click', showSettings);
settingsBtnClose.addEventListener('click', closeSettings);
playAgain.addEventListener('click', restart);
startGameBtn.addEventListener('click', startGame);
color1.addEventListener('click', colorSelected);
color2.addEventListener('click', colorSelected);
color3.addEventListener('click', colorSelected);
color4.addEventListener('click', colorSelected);
color5.addEventListener('click', colorSelected);
color6.addEventListener('click', colorSelected);
color7.addEventListener('click', colorSelected);
randomColorBtn.addEventListener('click', randomColor);
