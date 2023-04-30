// Canvas
const canvas = document.querySelector('.canvas');
canvas.width = 900;
canvas.height = 700;
const ctx = canvas.getContext('2d');

// Main class of the game
class Spacewar {
  constructor(canvas) {
    // Canvas properties
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    
    // Initial value of the game
    this.level = 1;
    this.shields = 2;
    this.score = 0;

    // Actual state of the game 
    this.stateOfGame = [];
    
    // Settings
    this.settings = { 
      fps60: (1000 / 60),
      bulletFrequency: 500,
      enemyFireFrequency: 50,
    };

    this.areaOfMove = {
      verticalTop: 100,
      verticalButtom: 50,
      horizontal: 50,
    }
    
    this.pressedKeys = {};
  }

  // Get current state and positions of the game
  currentPosition() {
    return this.stateOfGame.length > 0 ? this.stateOfGame[this.stateOfGame.length -1] : null; 
  }

  // Add current position in the stateOfGeme
  goToPosition(position) { 
    if (this.currentPosition()) {
      this.stateOfGame.length = 0;
    }

    // if (position.entry) {
    //   console.log(position.entry)
    //   position.entry(spacewar);
    // }
    // Set the current game posittion to the stateOfGame
    this.stateOfGame.push(position);
  }

  keyDown(keyName) {
    this.pressedKeys[keyName] = true;
    if(this.currentPosition() && this.currentPosition().keyDown) {
      this.currentPosition().keyDown(this, keyName);  
    }
  }

  keyUp(keyCode) {
    delete this.pressedKeys[keyCode]
  }

  // Launch the game
  start() {
    setInterval(function() {
      gameLoop(spacewar)
    }, this.settings.fps60)
    this.goToPosition(new OpeningScreen(this));
  }
}


function gameLoop(spacewar){
  let currentPosition = spacewar.currentPosition();

  if (currentPosition) {
    if (currentPosition.update) {
      currentPosition.update(spacewar);
    }
    if (currentPosition.draw) {
      currentPosition.draw(spacewar)
    }
  }
}

// Functions to resize the game screen depending on size of screen
function resizeScreen(canvas) {
  const ratio = canvas.width / canvas.height;

  const height = window.innerHeight - 20;
  const width = height * ratio;
  
  canvas.width = width;
  canvas.height = height;
}


window.addEventListener('keydown', function (e) {
  if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    spacewar.keyDown(e.key);
  }
});

window.addEventListener('keyup', function (e) {
  if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    spacewar.keyUp(e.key);
  }
});

window.addEventListener('load', resizeScreen(canvas));

const spacewar = new Spacewar(canvas);
spacewar.sounds = new Sounds();
spacewar.sounds.init();
spacewar.start();

