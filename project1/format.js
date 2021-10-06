class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

var scaleP = 1;
var xP = 367;
var yP = 515;

let xDisplacement;

let vScale = 1.0;
let vLoc = new Vector3(100.0, 100.0, 0.0);

let trashCount = 30;

let carCount = 10;

let skyShader;
let shaderTexture;

let fg;

let treeRotations;

let trashPositions;
let trashRotations;

function drawMuhammedStuff() {
  // background('#ffffff')
  // fill("#ffffff");
  // rect(0, 0, width, height);
 noStroke()

 //text
 fill('#fb6875');
 textSize(60);
 textFont("Helvetica");
 text("STUBBORN", 33, 100);

 //Tree top
 fill("#f5583e")
 push()
    translate(200, 185)
    ellipse(0, 0, 110, 110)

    rotate(radians(0))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
    rotate(radians(6))
    triangle(50, -6, 50, 6, 59, 0)
 pop()


//Left Tree

 //trunk
 fill("#704f44")
 quad(57, 420, 57, 270, 75, 270, 75, 420 )
 ellipse(61, 344, 10, 30)
 ellipse(70.7, 407, 10, 25)
 ellipse(70.6, 375, 10, 45)
 ellipse(70.6, 350, 10, 45)
 ellipse(70.7, 300, 10, 55)
 ellipse(66, 419, 18, 5)


 //left branch
 quad(57, 270.5, 40, 244.5, 43, 239.5, 72, 271,5)
 push()
 translate(66, 270.5)
 rotate(radians(225))
 arc(48, 0, 25, 20, radians(170), radians(0))
 fill('ffffff')
 arc(49, 2, 18, 18, radians(170), radians(0))
 pop()

 quad(23, 228.5, 25, 229.5, 30, 217.5, 29.7, 212.5)

 push()
 noFill()
 stroke('#704f44')
 strokeWeight(1.9)
 arc(27.5, 202.5, 10, 30, radians(280), radians(445))

 arc(11, 206.5, 18, 10, radians(20), radians(180))
 arc(6, 214.5, 30, 25, radians(280), radians(350))
 arc(42, 218.5, 25, 30, radians(-10), radians(90))

 strokeWeight(3.5)
 line(42, 234.5, 19, 210)
 pop()

 quad(38, 243.5, 44, 242.5, 44, 233.5, 39, 232.5)



 //right branch
 quad(67, 266.5, 74, 273.5, 105, 224.5, 96, 224.5)
 quad(96, 224.5, 105, 224.5, 106, 214.5, 94, 214.5)

 push()
 noFill()
 stroke('#704f44')
 strokeWeight(4)

 arc(99, 205, 20, 20, radians(20), radians(160))
 
 strokeWeight(1.8)
 line(112.5, 199.5, 120, 193.5)

 strokeWeight(1.3)
 arc(120, 180.6, 10, 25, radians(15), radians(90))
 arc(120, 183.6, 10, 20, radians(90), radians(210))

 strokeWeight(2.7)
 arc(72, 210, 35, 25, radians(240), radians(360))

 strokeWeight(1.4)
 arc(64, 205.5, 25, 13 ,radians(190), radians(270))
 arc(54.9, 197, 20, 17, radians(260), radians(360))
 pop()
 
 quad(106.5, 207.5, 110.5, 208.5, 114, 199.5, 112, 198.5)
//Middle Tree
 fill("#704f44")

 //trunk
 quad(190, 420, 190, 270, 208, 270, 208, 420 )
 ellipse(194.3, 364, 10, 40)
 ellipse(194.5, 394, 10, 40)
 ellipse(194.5, 394, 10, 40)
 ellipse(194.4, 320, 10, 50)
 ellipse(194.4, 290, 10, 30)
 ellipse(203.7, 380, 10, 40)
 ellipse(203.6, 402, 10, 30)
 ellipse(203.7, 340, 10, 60)
 ellipse(203.8, 300, 10, 60)
 ellipse(199, 419, 18, 5)


 //Branches
 quad(190, 270.5, 208, 270.5, 215, 248.5, 182, 244.5)
 
 push()
 noFill()
 stroke('#704f44')
 strokeWeight(4)

 arc(208, 225, 40, 50, radians(-20), radians(90))
 strokeWeight(3)
 line(227, 218.5, 218, 192.5)
 strokeWeight(1.7)
 arc(170, 193.5, 25, 30, radians(103), radians(180))
 strokeWeight(1.2)
 arc(152.4, 193.5, 10, 20, radians(280), radians(360))
 arc(163, 192.5, 10, 13, radians(180), radians(250))
 arc(160, 180, 10, 13, radians(30), radians(80))
 strokeWeight(1.6)
 arc(176, 207.5, 15, 18, radians(170), radians(260))
 arc(172, 190, 15, 18, radians(10), radians(80))
 strokeWeight(1.4)
 arc(179, 181, 10, 20, radians(90), radians(160))
 arc(178.4, 179, 10, 25, radians(35), radians(90))
 arc(218, 182.5, 10, 20, radians(90), radians(190))
 line(219, 192.5, 220, 182)
 arc(239, 183, 20, 20, radians(110), radians(170))
 arc(234, 179, 20, 28, radians(0), radians(80))
 strokeWeight(6)
 arc(194, 238.1, 12, 10, radians(20), radians(160))
 pop()

 quad(182, 245.5,  192, 246, 187, 228, 180, 228.5)
 quad(195, 246.5, 205, 247.5, 207, 227.5, 200, 225.5)
 quad(180, 228.5, 187, 228.5, 168, 208, 166, 208)
 quad(200, 226, 207, 228, 211, 214, 207, 211)
 quad(207, 211.5, 211, 214.5, 222, 204.5, 221, 200.5)
 quad(221, 201.5,  222, 204.5, 238, 192.5, 235, 192.5)

//Right Tree

 //trunk
quad(323, 420, 323, 270, 341, 270, 341, 420 )
ellipse(327.1, 380, 10, 60)
ellipse(327.1, 340, 10, 70)
ellipse(327.1, 300, 10, 60)
ellipse(337, 320, 10, 70)
ellipse(336.8, 385, 10, 70)



ellipse(332, 419, 18, 5)

 //left branch
 push()
 noFill()
 stroke('#704f44')
 strokeWeight(1.5)
 line(273.5, 200.5, 269, 188.5)
 arc(274, 187, 10, 25, radians(30), radians(90))
 strokeWeight(2)
 arc(296, 184.5, 25, 30, radians(97), radians(170))


 pop()

 push()
 noFill()
 stroke('#704f44')
 strokeWeight(2)
 translate(353, 270)
 rotate(radians(224.5))
 arc(89, 0, 40, 20, radians(190), radians(340))
 rotate(radians(11.7))
 strokeWeight(3)
 arc(89, 0, 45, 18, radians(190), radians(280))


 pop()

 quad(323, 270.5, 313.5, 250.5, 322, 250, 333, 271)
 quad(322.5, 252.5, 314, 252.5, 306, 210, 314, 210)
 quad(309, 221, 311, 231, 298, 224, 298, 223)
 ellipse(311, 213.5, 9, 8,)


 //right branch

 quad(326, 270, 341, 271, 364, 242, 351, 242)

 push()
 noFill()
 stroke('#704f44')
 strokeWeight(1.5)
 arc(345.6, 275, 10, 17, radians(180), radians(250))
 strokeWeight(3)
 arc(360, 239.1, 7, 7, radians(0), radians(360))
 arc(350, 240, 7, 7, radians(-30), radians(50))
 strokeWeight(3.2)
 arc(342.3, 215.6, 20, 18, radians(330), radians(360))
 line(350, 209, 337, 192)
 strokeWeight(2)
 arc(337, 185.5, 13, 13, radians(90), radians(160))
 line(330.7, 187, 328, 180.5)
 line(337, 191, 336.8, 177.6)
 line(337, 185, 342, 183)
 arc(341, 172.8, 20, 20, radians(10), radians(80))
 arc(370, 182, 26, 15, radians(5), radians(90))

 strokeWeight(1.6)
 line(370, 194, 367, 183)
 line(367, 183, 366, 174)
 line(383, 184, 385, 172)

 pop()
 quad(352, 236, 363, 236, 362, 242, 353, 242)
 quad(351.5, 238, 364.7, 238, 363, 225, 350, 225)
 quad(350, 226, 356.5, 226, 354, 216, 350.5, 216)
 quad(355, 225, 363, 225, 374, 193, 370, 193)
 quad(369, 195, 368, 189, 375, 189, 373.5, 194)

 //person

 push()
 translate(xP, yP);
 scale(scaleP);

 fill('#f46d71')
 ellipse(0, -70, 25, 25)
 triangle(-11, -73, -14, -76, -9, -75.5)
 fill('#795e7f')
 arc(0, -70, 25, 25, radians(235), radians(420))
 quad(-1, -82.6, 9, -83, 14, -74, 11, -63)
 strokeWeight(2)
 fill('#f2ad41')
 ellipse(9, -51, 5, 5)
 quad(8, -50, 10, -50, 20, -32, 12, -30)
 fill('#795e7f')
 quad(-10, -53, 9, -52, 20, -5, -20, -5)
 noFill()
 stroke('#f2ad41')
 strokeWeight(8)
 arc(0, -70, 32.5, 32.5, radians(70), radians(115))
 noStroke()
 fill('#72ade9')
 quad(7, -1, 17, -3, 20, 5, 10, 8)
 quad(-7, -1, -18, -3, -20, 6, -9, 8)
 strokeWeight(2)
 fill('#f2ad41')
 noStroke()
 fill('#795e7f')
 arc(0, -5, 39.9, 10, radians(0), radians(360))
 fill('#7e5347')
 quad(-12, -39, 11.4, -38, 12, -17, -14.4, -18)
 fill('#f46d71')
 ellipse(0, -20.5, 7.5, 6,)
 fill('#795e7f')
 quad(-5, -50, 8, -50, 3, -22.5, -3, -22.5)
 stroke('#7d7081')
 strokeWeight(2)
 line(19.5, 5, 10.5, 8)
 line(-19.5, 6, -9.5, 8)

 pop()
}

function defaultCamera() {
  camera(0, 0, (height/2) / Math.tan(PI/6), 0, 0, 0, 0, 1, 0);
}


function preload() {
  skyShader = loadShader('skyShader.vert', 'skyShader.frag');
}

function setup() {
  pixelDensity(1);
  createCanvas(400, 500, WEBGL);
  noStroke();

  ambientLight(255, 255, 255);

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

  xDisplacement = -2 * frameCount;

  if (xDisplacement <= -660) xDisplacement = 0;

  skyShader.setUniform("u_resolution", [width, height]);
  shaderTexture.shader(skyShader);
  shaderTexture.rect(0, 0, width, height);

  texture(shaderTexture);
  

  defaultCamera();
  translate(-xDisplacement, -300, 0);
  push();
  drawMuhammedStuff();
  pop();
  //%%camera%%

  push();
  translate(0, 4000, 0);
  rotateX(-Math.PI / 2);
  plane(4000, 5000);
  pop();

  translate(330 + xDisplacement, 0, 0);

  //%%main%%

  //%%cars%%

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
