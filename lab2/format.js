class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

var vScale = 1.0;
var vLoc = new Vector3(100.0, 100.0, 0.0);

function setup() {
  createCanvas(710, 400, WEBGL);
  rain = [];
 }
 
 function draw() {

  background(80, 80, 120);
  
  ambientLight(40, 40, 40);

  noStroke();

  //%%main%%

  push();
  scale(vScale);
    //%%scaleable%%
  pop();

 }
