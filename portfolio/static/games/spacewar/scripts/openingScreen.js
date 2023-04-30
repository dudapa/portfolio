class OpeningScreen {
  constructor () {}
  
  draw(spacewar) {
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);
    ctx.font = '80px Open Sans bold';
    ctx.fillStyle = '#ffc709';
    ctx.textAlign = 'center';
    ctx.fillText('SPACE WAR', spacewar.width / 2, 100);
    ctx.font = '30px Open Sans';
    ctx.fillStyle = '#ffc709';
    ctx.fillText(
      "Press 'Space' to start the game.",
      spacewar.width / 2,
      spacewar.height / 2 + 320
    );

    ctx.font = '15px Open Sans';
    ctx.fillStyle = '#ffc709';
    ctx.fillText('CONTROL', 50, spacewar.height - 80);
    ctx.fillText('move right: right arrow', 95, spacewar.height - 60);
    ctx.fillText('move left: left arrow', 85, spacewar.height - 40);
    ctx.fillText('fire: space', 50, spacewar.height - 20);
  }

  keyDown(spacewar, key) {
    if (key === ' ') {
      spacewar.score = 0;
      spacewar.level = 1;
      spacewar.shields = 2;
      spacewar.goToPosition(new ShowLevel(spacewar));
    }
  }
}
