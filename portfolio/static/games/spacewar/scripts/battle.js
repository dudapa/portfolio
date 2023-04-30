class Battle {
  constructor(spacewar) {
    this.level = spacewar.level;
    this.settings = spacewar.settings;
    this.areaOfMove = spacewar.areaOfMove;
    this.spaceShip = new SpaceShip();
    this.army = new Army(this.level);
    this.enemies = this.army.createArmy();
    this.directionOfEnemies = 1;
    this.enemiesGoingDown = false;
    this.horizontalMovingEnemies = 1;
    this.verticalMovingEnemies = 0;
    this.deep = 130 * ratioByScreenY;
    this.currentDeep = 0;
    this.meteors = [];
    this.bullets = [];
    this.enemyBullets = [];
    this.lastBulletTime = null;
  }

  // update method
  update(spacewar) {
    const spaceShip = this.spaceShip;
    const spaceShipSpeed = spaceShip.speed;
    const leftRestriction = this.areaOfMove.horizontal;
    const rightRestriction =
      spacewar.width - this.areaOfMove.horizontal - spaceShip.shipSize;

    // Move with the spaceship
    if (spacewar.pressedKeys['ArrowLeft']) {
      spaceShip.x -= spaceShipSpeed;
    }

    if (spacewar.pressedKeys['ArrowRight']) {
      spaceShip.x += spaceShipSpeed;
    }

    // Check if the spaceship is after area of move
    if (spaceShip.x < leftRestriction) {
      spaceShip.x = leftRestriction;
    }

    if (spaceShip.x > rightRestriction) {
      spaceShip.x = rightRestriction;
    }

    // Check if the player is shooting (If press space)
    if (spacewar.pressedKeys[' ']) {
      this.shootPlayer();
    }

    // Move bullets
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.y -= bullet.speed;
      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      }
    }

    // Move enemy's army
    let enemyReachSide = false;


      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        let newPosition =
          enemy.x +
          enemy.speed * this.directionOfEnemies * this.horizontalMovingEnemies;

        if (newPosition < leftRestriction || newPosition > rightRestriction) {
          this.directionOfEnemies *= -1;
          enemyReachSide = true;
          this.horizontalMovingEnemies = 0;
          this.verticalMovingEnemies = 1;
          this.enemiesGoingDown = true;
        }

        if (!enemyReachSide) {
          enemy.x = newPosition;
        }
      }


    // Move enemies down
    if (this.enemiesGoingDown) {
      const enemySpeed = this.enemies[0].speed
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        enemy.y += enemy.speed;
      }
      this.currentDeep += enemySpeed * this.verticalMovingEnemies;
      console.log(this.currentDeep, this.deep);
      if (this.currentDeep >= this.deep) {
        this.horizontalMovingEnemies = 1;
        this.verticalMovingEnemies = 0;
        this.enemiesGoingDown = false;
        this.currentDeep = 0;
      }
    }

    // Check collision of bullets with ufos
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      for (let j = 0; j < this.bullets.length; j++) {
        let bullet = this.bullets[j];
        if (
          (bullet.x > enemy.x || bullet.x + bullet.width > enemy.x) &&
          bullet.x < enemy.x + enemy.enemySize &&
          bullet.y < enemy.y + enemy.enemySize &&
          bullet.y > enemy.y
        ) {
          spacewar.sounds.playSound('explosion_enemy');
          spacewar.score += 10;
          this.enemies.splice(i, 1);
          this.bullets.splice(j, 1);
        }
      }
    }

    // Enemies firing
    const chanceForFire = 0.9997 - this.level * 0.0002;
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      let enemyChanceToFire = Math.random();
      if (enemyChanceToFire > chanceForFire) {
        let enemyBullet = new EnemyBullet(
          enemy.x + enemy.enemySize / 2,
          enemy.y + enemy.enemySize,
          this.level
        );
        this.enemyBullets.push(enemyBullet);
      }
    }

    // Move enemies bullets
    for (let i = 0; i < this.enemyBullets.length; i++) {
      const enemyBullet = this.enemyBullets[i];
      enemyBullet.y += enemyBullet.speed;
      if (enemyBullet.y > spacewar.height) {
        this.enemyBullets.splice(i, 1);
      }
    }

    // Check collision of the spaceship with a enemy's bullet
    let speceshipLeft = this.spaceShip.x;
    let spaceShipRight = this.spaceShip.x + this.spaceShip.shipSize;
    let spaceShipTop = this.spaceShip.y;
    let spaceShipBottom = this.spaceShip.y + this.spaceShip.shipSize;
    for (let i = 0; i < this.enemyBullets.length; i++) {
      let enemyBullet = this.enemyBullets[i];
      let bulletLeft = enemyBullet.x;
      let bulletRight = enemyBullet.x + enemyBullet.width;
      let bulletTop = enemyBullet.y;
      let bulletBottom = enemyBullet.y + enemyBullet.height;

      if (
        (bulletLeft > speceshipLeft || bulletRight > speceshipLeft) &&
        (bulletLeft < spaceShipRight || bulletRight < spaceShipRight) &&
        enemyBullet.y > spaceShipTop &&
        enemyBullet.y < spaceShipBottom
      ) {
        console.log('Shields go down');
        spacewar.sounds.playSound('shieldDown');
        this.spaceShip.shields -= 1;
        this.enemyBullets.splice(i, 1);
      }
    }

    // Create meteors
    const chanceMeteorToAppear = 0.998 - this.level * 0.001 ; 
    let chanceToAppear = Math.random();
    if (chanceToAppear > chanceMeteorToAppear) {
      let max = spacewar.width - 3 * this.areaOfMove.horizontal;
      let min = this.areaOfMove.horizontal;
      let meteorX = Math.floor(Math.random() * (max - min) + min);
      let bigOrSmall = Math.floor(Math.random() * 2);

      if (bigOrSmall) {
        this.meteors.push(new BigMeteor(meteorX, 0));
      } else {
        this.meteors.push(new SmallMeteor(meteorX, 0));
      }
    }

    // Move meteors
    for (let i = 0; i < this.meteors.length; i++) {
      let meteor = this.meteors[i];
      meteor.y += meteor.speed;
      if (meteor.y > spacewar.height) {
        this.meteors.splice(i, 1);
      }
    }

    // Check collision between the spaceship and a meteor
    for (let i = 0; i < this.meteors.length; i++) {
      let meteor = this.meteors[i];

      let meteorLeft = meteor.x;
      let meteorRight = meteor.x + meteor.meteorSize;
      let meteorBottom = meteor.y + meteor.meteorSize;
      let meteorTop = meteor.y;

      if (
        (meteorLeft > speceshipLeft || meteorRight > speceshipLeft) &&
        (meteorLeft < spaceShipRight || meteorRight < spaceShipRight) &&
        (meteorBottom > spaceShipTop || meteorTop > spaceShipTop) &&
        (meteorBottom < spaceShipBottom || meteorTop < spaceShipBottom)
      ) {
        if (meteor.notation === 'big') {
          this.spaceShip.shields -= 3;
          this.meteors.splice(i, 1);
        } else {
          this.spaceShip.shields -= 1;
          spacewar.sounds.playSound('shieldDown');
          this.meteors.splice(i, 1);
        }
      }
    }

    // Check collision between meteor and player's bullet
    for (let i = 0; i < this.meteors.length; i++) {
      let meteor = this.meteors[i];
      for (let j = 0; j < this.bullets.length; j++) {
        let bullet = this.bullets[j];
        if (
          (bullet.x > meteor.x || bullet.x + bullet.width > meteor.x) &&
          bullet.x < meteor.x + meteor.meteorSize &&
          bullet.y < meteor.y + meteor.meteorSize &&
          bullet.y > meteor.y
        ) {
          meteor.lives -= 1;
          this.bullets.splice(j, 1);
        }
      }
      if (meteor.lives === 0) {
        if (meteor.notation === 'big') {
          spacewar.score += 15;
        } else {
          spacewar.score += 5;
        }

        spacewar.sounds.playSound('explosion');
        this.meteors.splice(i, 1);
      }
    }

    // GAMEOVER
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      // Check there is collision of the spaceship with a enemy
      if (
        enemy.x > this.spaceShip.x &&
        enemy.x < this.spaceShip.x + this.spaceShip.shipSize &&
        enemy.y + enemy.enemySize > this.spaceShip.y
      ) {
        spacewar.sounds.stopSounds('easy');
        spacewar.sounds.stopSounds('medium');
        spacewar.sounds.stopSounds('hard');
        spacewar.sounds.playSound('playerDeath');
        spacewar.goToPosition(new Lose());
      }
      // Check if the speceship was destroyed
      if (this.spaceShip.shields < 0) {
        spacewar.sounds.stopSounds('easy');
        spacewar.sounds.stopSounds('medium');
        spacewar.sounds.stopSounds('hard');
        spacewar.sounds.playSound('playerDeath');
        spacewar.goToPosition(new Lose());
      }
    }

    // VICTORY (all enemies are destroyed)
    if (this.enemies.length === 0) {
      if (spacewar.level === 6) {
        spacewar.sounds.stopSounds('hard');
        spacewar.sounds.playSound('win');
        spacewar.goToPosition(new Win());
      } else {
        spacewar.level += 1;
        spacewar.goToPosition(new ShowLevel(spacewar));
      }
    }
  }

  // draw method
  draw(spacewar) {
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);

    // Draw the spaceship
    this.spaceShip.draw();

    // Draw bullets
    for (let bullet of this.bullets) {
      bullet.draw();
    }

    // Draw enemies
    for (let enemy of this.enemies) {
      enemy.draw();
    }

    // Draw enemies bullets
    for (let enemyBullet of this.enemyBullets) {
      enemyBullet.draw();
    }

    // Draw meteors
    for (let meteor of this.meteors) {
      meteor.draw();
    }

    // Draw current level, score and shields on the screen
    ctx.font = '30px Open Sans bold';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`LEVEL: ${this.level}`, 80, 30);
    ctx.fillText(`SCORE: ${spacewar.score}`, spacewar.width / 2, 30);
    ctx.fillText(
      `SHIELDS: ${this.spaceShip.shields}`,
      spacewar.width - 100,
      30
    );
  }

  // Shoot bullets
  shootPlayer() {
    if (
      this.lastBulletTime === null ||
      new Date().getTime() - this.lastBulletTime > this.settings.bulletFrequency
    ) {
      spacewar.sounds.playSound('shot');
      const x = this.spaceShip.x + this.spaceShip.shipSize / 2 - 7;
      const y = this.spaceShip.y - this.spaceShip.shipSize / 2;
      this.bullets.push(new PlayerBullet(x, y));
      this.lastBulletTime = new Date().getTime();
    }
  }
}

// Display actual level of the game on the screen
class ShowLevel {
  constructor(spacewar) {
    this.level = spacewar.level;
    this.sizeFont = 5;
  }

  draw(spacewar) {
    this.sizeFont += 0.7;
    if (this.sizeFont > 70) {
      if (this.level <= 2) {
        spacewar.sounds.stopSounds('win');
        spacewar.sounds.playSound('easy');
      }
      if (this.level > 2 && this.level <= 4) {
        spacewar.sounds.stopSounds('easy');
        spacewar.sounds.playSound('medium');
      }
      if (this.level > 4 && this.level <= 6) {
        spacewar.sounds.stopSounds('medium');
        spacewar.sounds.playSound('hard');
      }
      spacewar.goToPosition(new Battle(spacewar));
    }
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);
    ctx.font = `${this.sizeFont}px Open Sans bold`;
    ctx.fillStyle = '#ffc709';
    ctx.textAlign = 'center';
    ctx.fillText(`Get ready for level ${this.level}`, spacewar.width / 2, 100);
  }
}
