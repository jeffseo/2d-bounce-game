class Drawable {
  constructor(canvas, x, y, color) {
    this.setCoordinates(x, y);
    this.setColor(color);
    this.setCanvas(canvas);
  }

  setColor(color) {
    this.color = color;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    throw new TypeError("Please implement the abstract method draw");
  }

  move() {
    throw new TypeError("Please implement the abstract method move");
  }
}

class Player extends Drawable {
  constructor(canvas, x, y, color, speed, size) {
    super(canvas, x, y, color);
    this.speed = speed;
    this.size = size;
  }

  // Temporary: http://www.kodyaz.com/html5/draw-stick-man-in-html5-canvas-using-javascript.aspx
  draw() {
    if (this.context) {
      // Head/body
      this.context.strokeStyle = this.color;
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.rect(this.x, this.y, this.size, this.size);
      this.context.stroke();

      // eyes
      this.context.beginPath();
      this.context.arc(this.x + (this.size * .2), this.y + (this.size * .3), 2, 0, Math.PI * 2, true); // draw left eye
      this.context.fill();
      this.context.arc(this.x + (this.size * .8), this.y + (this.size * .3), 2, 0, Math.PI * 2, true); // draw right eye
      this.context.fill();

      // mouth
      this.context.beginPath();
      this.context.arc(this.x + (this.size * .5), this.y + (this.size * .5), 4, 0, Math.PI, false); // draw semicircle for smiling
      this.context.stroke();
    }
  }

  setController(controller) {
    this.controller = controller;
  }
}

class Obstacle extends Drawable {
  constructor(x, y, radius, color, speed) {
    super(x, y, color);
    this.radius = radius;
    this.speed = speed;
  }

  draw() {
    if (this.context) {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
    }
  }

  move() {
    this.x -= this.speed;
  }
}
