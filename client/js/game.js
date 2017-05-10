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
      DEFAULT_PLAYER_SIZE, DEFAULT_PLAYER_SIZE, this.controller);
    this.score = 0;
    this.timer = 0;
    this.obstacles = [];
  }

  start() {
    setInterval(this.incrementTimerAndScore.bind(this), 1000);
    setInterval(this.updateGame.bind(this), SECOND_TO_MILLISEC/MAX_FPS);
    setInterval(this.generateObstacles.bind(this), 750);
    setInterval(this.refreshObstacles.bind(this), 1000);
  }

  updateGame() {
    this.detectCollision();
    clearCanvas();
    this.drawBackground();
    this.drawScore();
    this.player.move();
    this.player.draw();
    this.moveObstacles();
    this.drawObstacles();
    this.refreshObstacles();
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

  drawScore() {
    this.context.beginPath();
    this.context.font = '20pt Arial';
    this.context.strokeText(`Score: ${this.score}`, 0, parseInt(this.context.font));
  }

  generateObstacles() {
    // generate obstacle if true 50% probabiblity
    if (Math.random() < 0.5) {
      const randomNumber = Math.random();
      if (randomNumber != 0) {
        const radius = Math.floor(randomNumber * DEFAULT_PLAYER_SIZE);
        const yPosition = (this.canvas.height * .75) + radius;
        let xPosition = this.canvas.width + radius;
        const randomSpeed = Math.floor(randomNumber * DEFAULT_MOVEMENT_SPEED);
        const scaledSpeed = Math.floor(randomSpeed * this.score/100) + 1;
        if (this.obstacles.length > 0) {
          const lastObstacle = this.obstacles[this.obstacles.length - 1];
          if ((xPosition - radius) - (lastObstacle.x + lastObstacle.radius) < DEFAULT_PLAYER_SIZE) {
            xPosition += (DEFAULT_PLAYER_SIZE * 5);
          }
        }
        const obstacle = new Obstacle(this.canvas, xPosition, yPosition, radius, getRandomColor(), scaledSpeed);
        this.obstacles.push(obstacle);
      }
    }
  }

  moveObstacles() {
    this.obstacles.forEach(obstacle => obstacle.move());
  }

  drawObstacles() {
    this.obstacles.forEach(obstacle => obstacle.draw());
  }

  refreshObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.x > -obstacle.radius);
  }

  detectCollision() {
    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.isCollisionWithObstacle(this.obstacles[i])) {
        this.reset();
      }
    }
  }

  // http://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
  // return true if the rectangle (player) and circle (obstacle) are colliding
  isCollisionWithObstacle(obstacle) {
    var distX = Math.abs(obstacle.x - this.player.x - this.player.width/2);
    var distY = Math.abs(obstacle.y - this.player.y - this.player.height/2);

    if (distX > (this.player.width/2 + obstacle.radius)) { return false; }
    if (distY > (this.player.height/2 + obstacle.radius)) { return false; }

    if (distX <= (this.player.width/2)) { return true; }
    if (distY <= (this.player.height/2)) { return true; }

    var dx = distX-this.player.width/2;
    var dy = distY-this.player.height/2;
    return (dx*dx+dy*dy<=(obstacle.radius*obstacle.radius));
  }

  reset() {
    this.player.setColor(getRandomColor());
    this.player.setCoordinates(this.canvas.width * .25, this.canvas.height * .75);
    this.score = 0;
    this.timer = 0;
    this.obstacles = [];
  }
}

// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 15)];
  }
  return color;
}
