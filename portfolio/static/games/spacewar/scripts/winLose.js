class Win {
  constructor() {}

  draw() {
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);
    ctx.font = '80px Open Sans bold';
    ctx.fillStyle = '#ffc709';
    ctx.textAlign = 'center';
    ctx.fillText('You won the war!!!!!', spacewar.width / 2, 100);
    ctx.font = '30px Open Sans';
    ctx.fillStyle = '#ffc709';
    ctx.fillText(
      "Press 'Space' to continue.",
      spacewar.width / 2,
      spacewar.height / 2 + 320
    );
  }

  keyDown(spacewar, key) {
    if (key === ' ') {
      spacewar.score = 0;
      spacewar.level = 1;
      spacewar.shields = 2;
      spacewar.goToPosition(new OpeningScreen());
    }
  }
}

class Lose {
  constructor() {}

  draw(spacewar) {
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);
    ctx.font = '80px Open Sans bold';
    ctx.fillStyle = '#ffc709';
    ctx.textAlign = 'center';
    ctx.fillText('You lost the war!!!!!', spacewar.width / 2, 100);
    ctx.font = '30px Open Sans';
    ctx.fillStyle = '#ffc709';    
    ctx.fillText(
      "Press 'Space' to continue.",
      spacewar.width / 2,
      spacewar.height / 2 + 320
    );
  }

  keyDown(spacewar, key) {
    if (key === ' ') {
      spacewar.score = 0;
      spacewar.level = 1;
      spacewar.shields = 2;
      spacewar.goToPosition(new OpeningScreen());
    }
  }
}
