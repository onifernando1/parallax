const canvas = document.getElementById("canvas1");
c = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 800;
CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5; //scroll speed  (use let as will be reassigned)

const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "layer-5.png";

window.addEventListener("load", () => {
  // only do on load
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      // this.x2 = this.width;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * speedModifier;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier; // allows scroll speed to be changed
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
      // this.x2 = Math.floor(this.x - this.speed);

      // this.x = (gameFrame * this.speed) % this.width; //When gameFrame reaches width (x % x = 0, then resets x) (This line resets background position on speed change, so useful for constant speed scrolling )
      // above line needs let gameFrame = 0 at top, and gameFrame-- in animate
    }
    draw() {
      c.drawImage(this.image, this.x, this.y, this.width, this.height);
      c.drawImage(
        this.image,
        this.x + this.width, // joins two image
        this.y,
        this.width,
        this.height
      );
    }
  }
  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // delete from 0,0, whole width and height
    gameObjects.forEach((layer) => {
      layer.update();
      layer.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
