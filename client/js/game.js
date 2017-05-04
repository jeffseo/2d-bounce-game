const MAX_FPS = 60;
const SECOND_TO_MILLISEC = 1000;
const FONT_SIZE = 32;
const DEFAULT_MOVEMENT_SPEED = 5;
const DEFAULT_PLAYER_SIZE = 20; // px

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.controller = new Controller(this.canvas);
    this.player = new Player(this.canvas, this.canvas.width * .25,
      this.canvas.height * .75, getRandomColor(), DEFAULT_MOVEMENT_SPEED,
      DEFAULT_PLAYER_SIZE, this.controller);
  }

  start() {
    setInterval(this.incrementTimerAndScore.bind(this), 1000);
    setInterval(this.updateGame.bind(this), SECOND_TO_MILLISEC/MAX_FPS);
  }

  updateGame() {
    clearCanvas();
    this.drawBackground();
    this.player.move();
    this.player.draw();
  }

  incrementTimerAndScore() {
    this.timer++;
    this.score++;
  }

  drawBackground() {
    this.context.beginPath();
    this.context.strokeStyle = "black";
    this.context.moveTo(0, DEFAULT_PLAYER_SIZE + this.canvas.height * .75);
    this.context.lineTo(this.canvas.width, DEFAULT_PLAYER_SIZE + this.canvas.height * .75);
    this.context.stroke();
  }
}

// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
