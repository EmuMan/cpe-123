class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

let vScale = 1.0;
let vLoc = new Vector3(100.0, 100.0, 0.0);

let trashCount = 30;

let cursiveFont;

let skyShader;
let shaderTexture;

let fg;

let treeRotations;

let trashPositions;
let trashRotations;


function preload() {
  skyShader = loadShader('skyShader.vert', 'skyShader.frag');
  cursiveFont = loadFont("Sacramento-Regular.ttf");
}

function setup() {
  pixelDensity(1);
  createCanvas(400, 500, WEBGL);
  noStroke();

  ambientLight(230, 230, 230);

  //%%camera%%

  shaderTexture = createGraphics(400, 500, WEBGL);
  shaderTexture.noStroke();

  treeRotations = [];
  for (let i = 0; i < 12; i++) {
    treeRotations.push(random(2 * Math.PI));
  }

  trashPositions = [];
  trashRotations = [];
  for (let i = 0; i < trashCount; i++) {
    trashPositions.push(new Vector3(100 * Math.pow(-1, i) + random(-20, 20), 350 + i * (1600 / trashCount) + random(-50, 50), -85));
    trashRotations.push(Math.round(random()) == 1 ? 0 : Math.PI);
  }
}
 
function draw() {

  skyShader.setUniform("u_resolution", [width, height]);
  shaderTexture.shader(skyShader);
  shaderTexture.rect(0, 0, width, height);

  texture(shaderTexture);

  push();
  translate(0, 4000, 0);
  rotateX(-Math.PI / 2);
  plane(4000, 5000);
  pop();

  push();
  fill(40, 100, 190);
  textFont(cursiveFont);
  textSize(58);
  textAlign(CENTER, CENTER);
  translate(0, 280, -113);
  rotateZ(Math.PI);
  rotateX(-Math.PI / 2);
  text("la rue,", 0, 0);
  pop();

  //%%main%%

  //%%cars%%

  //%%clouds%%

  for (let i = 0; i < treeRotations.length; i++) {
    push();
    translate(100 * Math.pow(-1, i), 370 + 200 * Math.floor(i / 2), -85);
    rotateZ(treeRotations[i]);
    //%%tree%%
    pop();
  }

  for (let i = 0; i < trashPositions.length; i++) {
    push();
    translate(trashPositions[i].x, trashPositions[i].y, trashPositions[i].z);
    rotateZ(trashRotations[i]);
    //%%trash%%
    pop();
  }

  push();
  translate(0, 2500, -85);
  scale(vScale);
    //%%scaleable%%
  pop();

}
