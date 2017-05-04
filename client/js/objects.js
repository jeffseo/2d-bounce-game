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
  constructor(canvas, x, y, color, speed, size, controller) {
    super(canvas, x, y, color);
    this.speed = speed;
    this.size = size;
    this.controller = controller;
    this.state = {
      jump: false,
      jumpDirection: "up",
      jumpTrackerValue: this.y,
      expectedJumpHeight: this.y - this.size * 4,
    };
  }

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

  move() {
    if (this.controller && this.canvas) {
      if (this.controller.isKeyPressed('up') && this.y > this.size && this.state.jump == false) {
        this.state.jump = true;
      }

      if (this.state.jump) {
        if (this.state.jumpDirection == 'up') {
          this.y -= this.speed;
          if (this.y < this.size) {
            this.y = this.size;
          }

          this.state.jumpTrackerValue -= this.speed;
          if (this.state.jumpTrackerValue <= this.state.expectedJumpHeight) {
            this.state.jumpDirection = 'down';
          }
        } else {
          this.y += this.speed;
          if (this.y > this.canvas.height * .75) {
            this.y = this.canvas.height * .75
            this.state.jump = false;
            this.state.jumpDirection = 'up';
            this.state.jumpTrackerValue = this.y;
          }
        }
      }

      // if (this.controller.isKeyPressed('down') && this.y < this.canvas.height - this.size) {
      //   this.y += this.speed;
      //   if (this.y > this.canvas.height - this.size) {
      //     this.y = this.canvas.height - this.size;
      //   }
      // }

      if (this.controller.isKeyPressed('left') && this.x > 0) {
        this.x -= this.speed;
        if (this.x < 0) {
          this.x = 0;
        }
      }

      if (this.controller.isKeyPressed('right') && this.x < this.canvas.width - this.size) {
        this.x += this.speed;
        if (this.x > this.canvas.width) {
          this.x = this.canvas.width - this.size;
        }
      }
    }
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
