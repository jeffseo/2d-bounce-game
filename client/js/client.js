// Global variables
// golden ratio apparently is width = 1.61 * height
const MAX_WIDTH = 1100;
const MAX_HEIGHT = 680;

const init = () => {
  //remove listener, no longer needed
  window.removeEventListener("load", init, false);

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('orientationchange', resizeCanvas, false);

  const game = new Game(getCanvas());
  game.start();
}

window.addEventListener('load', init, false);

/**
* Canvas Helper Functions
*/
const getCanvas = () => {
  return document.getElementById("gameCanvas");
}

const clearCanvas = () => {
  const canvas2DContext = getCanvas().getContext("2d");
  return () => {
    canvas2DContext.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// return 2D rendering context: used to paint on the Canvas
const get2DContext = () => {
  return getCanvas().getContext("2d");
}

const resizeCanvas = () => {
  const canvas = getCanvas();
  // Make it visually fill the positioned parent
  // canvas.style.width ='100%';
  // canvas.style.height='100%';
  canvas.width = canvas.parentNode.clientWidth || window.innerWidth;
  canvas.height = window.innerHeight * .75;

  if (canvas.width > MAX_WIDTH) {
    canvas.width = MAX_WIDTH;
  }

  if (canvas.height > MAX_HEIGHT) {
    canvas.height = MAX_HEIGHT;
  }
}
