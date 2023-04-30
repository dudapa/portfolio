// Ratio of sizes of game objects based on size of screen
const ratioByScreenX = window.innerWidth > 1900 ? 1 : 0.8;
const ratioByScreenY = window.innerHeight > 900 ? 1 : 0.77;

class SpaceShip {
  constructor() {
    this.shipSize = 60 * ratioByScreenX;
    this.x = canvas.width / 2 - 30 * ratioByScreenX;
    this.y = canvas.height - 100 * ratioByScreenY;
    this.src = '/media/games/spacewar/images/playerShip.png';
    this.speed = 7 * ratioByScreenX;
    this.shields = 2;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.shipSize, this.shipSize);
  }
}

class Enemy {
  constructor(x, y, level) {
    this.enemySize = 40 * ratioByScreenX; 
    this.x = x;
    this.y = y;
    this.level = level;
    this.src = `/media/games/spacewar/images/enemy${this.level}.png`;
    this.speed = 1.5 * ratioByScreenX;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.enemySize, this.enemySize);
  }
}

class Army {
  constructor(level) {
    this.level = level;
  }

  createArmy() {
    const rowCount = 4;
    const columnCount = 8;
    const army = [];
    let x = 100 * ratioByScreenX;
    let y = 100 * ratioByScreenY;
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        const enemy = new Enemy(x, y, this.level);
        army.push(enemy);
        x += 70 * ratioByScreenX;
      }
      x = 100 * ratioByScreenX;
      y += 50 * ratioByScreenY;
    }
    return army;
  }
}

class PlayerBullet {
  constructor(x, y) {
    this.width = 15 * ratioByScreenX;
    this.height = 30 * ratioByScreenY;
    this.x = x;
    this.y = y;
    this.src = '/media/games/spacewar/images/fire1.png';
    this.speed = 10 * ratioByScreenY;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}

class EnemyBullet {
  constructor(x, y, level) {
    this.level = level;
    this.width = 15 * ratioByScreenX;
    this.height = this.level <= 4 ? 30 * ratioByScreenY : 60 * ratioByScreenY;
    this.x = x;
    this.y = y;
    this.src =
      this.level <= 4
        ? '/media/games/spacewar/images/fire2.png'
        : '/media/games/spacewar/images/fire3.png';
    this.speed = 10 * ratioByScreenY;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}

class BigMeteor {
  constructor(x, y) {
    this.meteorSize = 100 * ratioByScreenX;
    this.x = x;
    this.y = y;
    this.src = '/media/games/spacewar/images/meteorBrown_big1.png';
    this.speed = 3 * ratioByScreenY;
    this.lives = 3;
    this.notation = 'big';
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.meteorSize, this.meteorSize);
  }
}

class SmallMeteor {
  constructor(x, y) {
    this.meteorSize = 50 * ratioByScreenX;
    this.x = x;
    this.y = y;
    this.src = '/media/games/spacewar/images/meteorBrown_med1.png';
    this.speed = 3 * ratioByScreenY;
    this.lives = 1;
    this.notation = 'small';
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.meteorSize, this.meteorSize);
  }
}
