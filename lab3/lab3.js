class Page extends P5Mesh{
  
  time;
  flapSpeed;
  velocity;
  resolution;
  targetRotZ;

  pageLength;
  bendFactor;
  flapStrength;

  constructor(name, location, rotation, scale, velocity, resolution) {
    super(name, location, rotation, scale, color(255, 255, 255));
    this.time = 0.0;
    this.flapSpeed = 25.0;
    this.velocity = velocity;
    this.resolution = resolution;
    this.targetRotZ = -atan(velocity.x / velocity.y);
    this.pageLength = 30;
    this.bendFactor = 0.5;
    this.flapStrength = 0.5;
  }

  drawMesh() {
    fill(this.color);
    let step = this.time * this.flapSpeed;
    translate(0, 0, this.flapStrength * 5 * sin(step))
    // right wing
    push();
      rotateY(this.bendFactor + 0.2 - 0.6 * this.flapStrength * cos(step));
      for (let i = 0; i < this.resolution; i++) {
        translate(-(this.pageLength / 2) / this.resolution, 0, 0);
        plane(this.pageLength / this.resolution, 50);
        translate(-(this.pageLength / 2) / this.resolution, 0, 0);
        rotateY(-2 * (this.bendFactor + this.flapStrength * sin(step)) / this.resolution);
      }
    pop();
    // left wing 
    push();
      rotateY(-this.bendFactor - 0.2 + 0.6 * this.flapStrength * cos(step));
      for (let i = 0; i < this.resolution; i++) {
        translate((this.pageLength / 2) / this.resolution, 0, 0);
        plane(this.pageLength / this.resolution, 50);
        translate((this.pageLength / 2) / this.resolution, 0, 0);
        rotateY(2 * (this.bendFactor + this.flapStrength * sin(step)) / this.resolution);
      }
    pop();
  }

  update() {
    this.move(this.velocity.x, this.velocity.y, this.velocity.z);
    this.rotation.z = 0.98 * this.rotation.z + 0.02 * this.targetRotZ;
    this.time += 1 / frameRate();
  }

}


let data;

let mainScene;
let sceneCamera;

let flyingPages;
let staticPages;


function preload() {
  data = loadJSON('scene.json');
}

function setup() {
  
  mainScene = [];
  for (let i = 0; i < data['main'].length; i++) {
    mainScene.push(loadObject(data['main'][i]));
  }
  sceneCamera = loadObject(data['camera'][0]);

  flyingPages = [];
  staticPages = [];

  for (let i = 0; i < 20; i++)
  {
    staticPages.push(new Page("static_page_" + staticPages.length, createVector(0, -37, 8 - i / 5), createVector(0, 0, 0), createVector(1, 1, 1), createVector(0, 0, 0), 7))
  }
  pixelDensity(1);
  createCanvas(400, 400, WEBGL);
  noStroke();

  ambientLight(255, 255, 255);

  sceneCamera.addToScene();
}
 
function draw() {

  background(130, 160, 250);

  for (let i = 0; i < mainScene.length; i++) {
    mainScene[i].addToScene();
  }

  for (let i = 0; i < staticPages.length; i++) {
    staticPages[i].addToScene();
  }

  let toRemove = 0;
  for (let i = 0; i < flyingPages.length; i++) {
    flyingPages[i].addToScene();
    flyingPages[i].update();
    // so pages don't stack up offscreen
    if (flyingPages[i].time > 2.5) {
      toRemove++;
    }
  }
  for (let i = 0; i < toRemove; i++) flyingPages.shift(); // order should inherently be sorted out

}

function mousePressed() {
  // Planning on creating a collision detection system later but this will do for now
  if (mouseY > 250 && mouseY < 300 && mouseX > 100 && mouseX < 300)
    flyingPages.push(new Page('page_' + flyingPages.length, createVector(0, -37, 8), createVector(0, 0, 0), createVector(1, 1, 1), createVector(random(-0.5, 0.5), 1, 1), 10));
}