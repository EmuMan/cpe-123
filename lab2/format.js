class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

let vScale = 1.0;
let vLoc = new Vector3(100.0, 100.0, 0.0);

let skyShader;

function preload() {
  skyShader = loadShader('skyShader.vert', 'skyShader.frag');
}

function setup() {
  pixelDensity(1);
  createCanvas(400, 500, WEBGL);
  noStroke();
}
 
function draw() {

  skyShader.setUniform("u_resolution", [width, height]);
  shader(skyShader);
  rect(0, 0, width, height);
  
  ambientLight(40, 40, 40);

  //%%main%%

  push();
  scale(vScale);
    //%%scaleable%%
  pop();

}
