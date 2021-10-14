// Used for storing the x, y, and z components of a 3D location in one variable
class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

// scale variables
let scaleHouses = 1.0;
let scaleP = 0.5;

// person location variables
let xPO = -300; // original variables that are never changed to allow resetting
let yPO = 355;

let xP = xPO; // variables that can be changed in the code
let yP = yPO;

let xRP = 0; // x-rotation of the person to make them fall over

// used to scroll the view
let xDisplacement;

// the number of frames before the clip resets
let clipDuration = 4 * 60;

// how far back the stubborn scene background is drawn
let stubbornBGDepth = 100;

// the number of trash cans on the street (randomly placed)
let trashCount = 30;

// stores the fonts that are used to render the text
let cursiveFont;
let helveticaFont;

// both of these are used to render the noise on the sky
let skyShader;
let shaderTexture;
let flipSky = false;

// if all of the tree rotations (random) are determined every frame, they flash around, so this
// array allows them to be determined once in setup(), and then draw() just pulls from the stored values.
let treeRotations;

// same thing as treeRotations but for the trash
let trashPositions;
let trashRotations;


// GLSL seems to invert shaders when on certain browsers (Safari is the one I've noticed it on),
// so detect which browser is being used and flip the sky texture accordingly.
// Using the user agent like this isn't completely reliable, but I figure it's fine for this purpose.
// Currently tested for: Chromium Edge, Google Chrome, Firefox, Opera, Safari
window.addEventListener("load", function() {
  if (this.navigator.userAgent.indexOf("Chrome") == -1 && this.navigator.userAgent.indexOf("Safari") != -1) {
    console.log("Detected Safari in user agent, flipping sky texture...");
    flipSky = true;
  }
});

// drawing the background of Muhammad's work
function drawStubbornBG() {
  // background('#ffffff')
  noStroke()

  //text
  fill('#fb6875');
  textFont(helveticaFont);
  textSize(60);
  text("STUBBORN", 33, 100);

  //Tree top
  fill("#f5583e")
  push()
    translate(200, 185, -5)
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
}

// draw the person in muhammad's work
function drawStubbornPerson() {
  push()
    if(xDisplacement<=-100){
      if (xRP > -90) {
        xRP -= 15;
      }
      rotateX(radians(xRP));
    }
    else{
      yP -= .45
      if(yP<yPO - 4){
        yP=yPO
      }

      xP += .4
    }
    strokeWeight(1.6)
    fill('#f46d71')
    ellipse(0, -70, 25, 25) // head
    triangle(-11, -73, -14, -76, -9, -75.5) // nose
    fill('#795e7f')
    translate(0, 0, 0.1);
    arc(0, -70, 25, 25, radians(235), radians(420)) // hat 1
    quad(-1, -82.6, 9, -83, 14, -74, 11, -63) // hat 2
    strokeWeight(2)
    fill('#f2ad41')
    ellipse(9, -51, 5, 5) // scarf knot
    quad(8, -50, 10, -50, 20, -32, 12, -30) // scarf back
    fill('#795e7f')
    translate(0, 0, 0.1);
    quad(-10, -53, 9, -52, 20, -5, -20, -5) // body
    noFill()
    stroke('#f2ad41')
    strokeWeight(4)
    translate(0, 0, 0.1);
    arc(0, -70, 32.5, 32.5, radians(60), radians(125)) // scarf around neck
    noStroke()
    fill('#72ade9')
    quad(7, -1, 17, -3, 20, 5, 10, 8) // leg r
    quad(-7, -1, -18, -3, -20, 6, -9, 8) // leg l
    strokeWeight(2)
    fill('#f2ad41')
    noStroke()
    fill('#795e7f')
    arc(0, -5, 39.9, 10, radians(0), radians(360)) // body bottom
    fill('#7e5347')
    translate(0, 0, 0.1);
    quad(-12, -39, 11.4, -38, 12, -17, -14.4, -18) // brown patch
    fill('#f46d71')
    translate(0, 0, 0.1);
    ellipse(0, -20.5, 7.5, 6,) // hand
    fill('#795e7f')
    quad(-5, -50, 8, -50, 3, -22.5, -3, -22.5) // arm
    stroke('#7d7081')
    strokeWeight(2)
    line(19.5, 5, 10.5, 8) // foot r
    line(-19.5, 6, -9.5, 8) // foot l
  pop()
}

function preload() {
  // loads the sky shader and text font files
  skyShader = loadShader('skyShader.vert', 'skyShader.frag');
  cursiveFont = loadFont("Sacramento-Regular.ttf");
  helveticaFont = loadFont("FreeSansBold.ttf");
}

function setup() {
  // canvas/scene setup
  pixelDensity(1);
  createCanvas(400, 500, WEBGL);
  noStroke();
  ambientLight(230, 230, 230);

  xDisplacement = 600;

  camera(-0.0, -52.251800537109375, 38.15106201171875, -0.0, -51.25423812866211, 38.08130645751953, -0.0, -0.06975707411766052, -0.9975641369819641);
  //%%camera%%

  // separate texture for the sky
  shaderTexture = createGraphics(400, 500, WEBGL);
  shaderTexture.noStroke();

  // generate random tree rotations (see above)
  treeRotations = [];
  for (let i = 0; i < 12; i++) {
    treeRotations.push(random(2 * Math.PI));
  }

  // generate random trash rotations and positions (see above)
  trashPositions = [];
  trashRotations = [];
  for (let i = 0; i < trashCount; i++) {
    trashPositions.push(new Vector3(100 * Math.pow(-1, i) + random(-20, 20), 350 + i * (1600 / trashCount) + random(-50, 50), -85));
    trashRotations.push(Math.round(random()) == 1 ? 0 : Math.PI);
  }
}
 
function draw() {
  // if the framecount is a multiple of 6 * 60, reset the scene
  if (frameCount % clipDuration == 0) {
    xDisplacement = 600;
    xP = xPO;
    yP = yPO;
    xRP = 0;
  }

  // continuously move the scene to the left until the car hits the person
  if (xDisplacement > -100) {
    xDisplacement -= 5;
  }

  // set up the sky render
  skyShader.setUniform("u_resolution", [width, height]);
  shaderTexture.shader(skyShader);
  shaderTexture.rect(0, 0, width, height);

  // draw the plane in the background that has the sky texture on it
  texture(shaderTexture);
  push();
  translate(0, 4000, 0);
  rotateX((flipSky ? 1 : -1) * Math.PI / 2); // flip sky plane if using Safari (see flipSky declaration above)
  plane(4000, 5000);
  pop();

  // draw the clouds
  push();
  translate(33.24665069580078, 2809.041259765625, 766.4962158203125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(103.32806396484375, 2809.041259765625, 757.7891845703125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(38.15723419189453, 38.15721893310547, 38.157257080078125, 24, 24);
  pop();

  push();
  translate(142.50672912597656, 2809.041259765625, 741.4890747070312);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(37.083187103271484, 37.08317565917969, 37.08320999145508, 24, 24);
  pop();

  push();
  translate(66.48487854003906, 2810.16552734375, 761.4776000976562);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(37.473175048828125, 37.47316360473633, 37.47319793701172, 24, 24);
  pop();

  push();
  translate(-11.63873291015625, 2809.041259765625, 777.744873046875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(-62.896888732910156, 2809.041259765625, 764.5560302734375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(-102.75997161865234, 2809.041259765625, 738.155517578125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(18.432968139648438, 2809.041259765625, 733.6355590820312);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(78.33837127685547, 2809.041259765625, 737.0233154296875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(-38.019065856933594, 2809.041259765625, 732.5061645507812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 34.37179946899414, 24, 24);
  pop();

  push();
  translate(18.432968139648438, 2809.041259765625, 712.1858520507812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(143.77488708496094, 34.37176513671875, 15.912619590759277, 24, 24);
  pop();

  push();
  translate(1149.9674072265625, 2792.862060546875, 912.4837036132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1220.048828125, 2792.862060546875, 901.4255981445312);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(38.15723419189453, 38.15721893310547, 17.24851417541504, 24, 24);
  pop();

  push();
  translate(1259.2274169921875, 2792.862060546875, 894.0573120117188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(37.083187103271484, 37.08317565917969, 16.763004302978516, 24, 24);
  pop();

  push();
  translate(1183.20556640625, 2793.986328125, 908.1841430664062);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(37.473175048828125, 37.47316360473633, 16.939292907714844, 24, 24);
  pop();

  push();
  translate(1105.08203125, 2792.862060546875, 910.4463500976562);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1053.8238525390625, 2792.862060546875, 904.4844360351562);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1013.9607543945312, 2792.862060546875, 892.5504760742188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1135.1536865234375, 2792.862060546875, 890.5072631835938);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1195.05908203125, 2792.862060546875, 892.0386352539062);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1078.70166015625, 2792.862060546875, 889.9967651367188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(1135.1536865234375, 2792.862060546875, 880.8112182617188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(143.77488708496094, 34.37176513671875, 7.19310188293457, 24, 24);
  pop();

  push();
  translate(-457.2727966308594, 2802.2880859375, 1074.5032958984375);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-515.1981201171875, 2843.019775390625, 1078.895751953125);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(38.15723419189453, 38.157222747802734, 17.24851417541504, 24, 24);
  pop();

  push();
  translate(-547.8921508789062, 2865.79345703125, 1080.2066650390625);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(37.083187103271484, 37.08317565917969, 16.763004302978516, 24, 24);
  pop();

  push();
  translate(-485.1283874511719, 2820.688720703125, 1077.667724609375);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(37.473175048828125, 37.473167419433594, 16.93929100036621, 24, 24);
  pop();

  push();
  translate(-422.56573486328125, 2776.22314453125, 1062.8896484375);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-383.88470458984375, 2746.46630859375, 1046.119140625);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-355.71728515625, 2723.34228515625, 1026.03515625);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-451.40753173828125, 2793.738037109375, 1050.1126708984375);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-498.0402526855469, 2828.5283203125, 1064.4664306640625);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-407.2183532714844, 2760.951171875, 1037.4862060546875);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-453.9513244628906, 2793.76171875, 1040.7562255859375);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(143.77488708496094, 34.37176513671875, 7.193101406097412, 24, 24);
  pop();

  push();
  translate(-142.9609375, 2813.405517578125, 819.892333984375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-4.055572509765625, 2813.405517578125, 814.2218017578125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(75.62980651855469, 38.15721893310547, 8.84510326385498, 24, 24);
  pop();

  push();
  translate(73.59881591796875, 2813.405517578125, 810.4432983398438);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(73.50098419189453, 37.08317565917969, 8.596132278442383, 24, 24);
  pop();

  push();
  translate(-77.08084106445312, 2814.52978515625, 817.6875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(74.27396392822266, 37.47316360473633, 8.68653392791748, 24, 24);
  pop();

  push();
  translate(-231.92626953125, 2813.405517578125, 818.84765625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-333.5228271484375, 2813.405517578125, 815.7904052734375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-412.53375244140625, 2813.405517578125, 809.6705932617188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-172.32244873046875, 2813.405517578125, 808.622802734375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-53.5865478515625, 2813.405517578125, 809.4081420898438);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-284.21356201171875, 2813.405517578125, 808.3610229492188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(68.12682342529297, 34.37176513671875, 7.967609405517578, 24, 24);
  pop();

  push();
  translate(-172.32244873046875, 2813.405517578125, 803.650634765625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(284.9700012207031, 34.37176513671875, 3.688650131225586, 24, 24);
  pop();

  push();
  translate(-909.2777099609375, 2809.724853515625, 1320.9671630859375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-726.510498046875, 2809.724853515625, 1287.869384765625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(99.51128387451172, 51.626243591308594, 51.62629318237305, 24, 24);
  pop();

  push();
  translate(-624.33544921875, 2809.724853515625, 1265.8154296875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(96.71025085449219, 50.173072814941406, 50.17312240600586, 24, 24);
  pop();

  push();
  translate(-822.5949096679688, 2811.245849609375, 1308.09814453125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(97.72731018066406, 50.700721740722656, 50.70077133178711, 24, 24);
  pop();

  push();
  translate(-1026.3355712890625, 2809.724853515625, 1314.869140625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-1160.0130615234375, 2809.724853515625, 1297.0247802734375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-1263.97314453125, 2809.724853515625, 1261.3052978515625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-947.9105834960938, 2809.724853515625, 1255.189697265625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-791.6817626953125, 2809.724853515625, 1259.7734375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-1095.1334228515625, 2809.724853515625, 1253.6617431640625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(89.63909149169922, 46.50457000732422, 46.504615783691406, 24, 24);
  pop();

  push();
  translate(-947.9105834960938, 2809.724853515625, 1226.1685791015625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(374.9544372558594, 46.50457000732422, 21.52957534790039, 24, 24);
  pop();

  push();
  translate(-335.68182373046875, 2723.34228515625, 1029.2740478515625);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-317.8340759277344, 2723.34228515625, 1040.06640625);
  rotateZ(-3.7785050868988037);
  rotateY(-0.21662969887256622);
  rotateX(0.1546732485294342);
  fill(255.0, 255.0, 255.0);
  ellipsoid(34.37178039550781, 34.37176513671875, 15.537344932556152, 24, 24);
  pop();

  push();
  translate(-644.2303466796875, 2809.724853515625, 1289.31396484375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(96.71025085449219, 50.173072814941406, 50.17312240600586, 24, 24);
  pop();

  push();
  translate(-558.88134765625, 2809.724853515625, 1271.2056884765625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  ellipsoid(96.71025085449219, 50.173072814941406, 50.17312240600586, 24, 24);
  pop();

  //%%clouds%%

  // draw muhammad's lab
  push();
    translate(410 / 2, 300, 550 / 2); // center his scene
    rotateX(-Math.PI / 2); // rotate it so it stands up instead of laying flat
    push();
      translate(xP, yP, -30); // move the person according to xP, yP, and also back a little bit
      scale(scaleP); // scale the person
      rotateY(Math.PI); // rotate the person 180 degrees so it is not flipped
      drawStubbornPerson(); // draw the person
    pop();
    translate(600, -20, stubbornBGDepth); // draw the first background scene on the right side of the street
    translate(xDisplacement, 0, 0); // make it so the background moves with everything
    push();
      rotateY(Math.PI); // rotate the background 180 degrees so it is not flipped
      drawStubbornBG(); // draw the first background
    pop();
    push();
      translate(-1200, 0, 0); // the second iteration of the background will be drawn on the left side of the street
      rotateY(Math.PI); // rotate the background 180 degrees so it is not flipped
      drawStubbornBG(); // draw the second background
    pop();
  pop();

  // translate 3d scene
  translate(xDisplacement, 0, 0);

  // draw the text on the bottom
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

  // draw the masking walls for the 3d scene
  fill(255, 255, 255);
  push();
  translate(-213.3226776123047, 1078.795166015625, -90.80007934570312);
  rotateZ(0.0);
  rotateY(-3.141592502593994);
  rotateX(0.0);
  fill(255.0, 255.0, 255.0);
  plane(191.56124877929688, 1594.502685546875);
  pop();

  push();
  translate(-1097.8787841796875, 1832.8212890625, -11.929856300354004);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.5707966089248657);
  fill(255.0, 255.0, 255.0);
  plane(293.8830261230469, 1594.502685546875);
  pop();

  push();
  translate(1114.350830078125, 1832.8212890625, -11.929856300354004);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.5707966089248657);
  fill(255.0, 255.0, 255.0);
  plane(293.8830261230469, 1594.502685546875);
  pop();

  //%%walls%%

  push();
  translate(-0.0, 1075.146484375, -85.5366439819336);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(247.32998996973038, 235.64282029867172, 221.15669041872025);
  plane(235.70509338378906, 1593.4453125);
  pop();

  push();
  translate(-137.401123046875, 1075.146484375, -85.1657485961914);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(207.58068770170212, 192.048519551754, 130.0649991631508);
  box(39.599822998046875, 1.0582462549209595, 1594.5673828125);
  pop();

  push();
  translate(137.4010009765625, 1075.146484375, -85.1657485961914);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(207.58068770170212, 192.048519551754, 130.0649991631508);
  box(39.599822998046875, 1.0582462549209595, 1594.5673828125);
  pop();

  push();
  translate(-234.44744873046875, 375.7148132324219, -11.929856300354004);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(154.44610595703125, 147.0322723388672, 189.6017303466797);
  pop();

  push();
  translate(-173.25845336914062, 454.79248046875, 69.9651870727539);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(31.741439819335938, 31.741439819335938, 31.741439819335938);
  pop();

  push();
  translate(-173.25845336914062, 297.32977294921875, 69.9651870727539);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(31.741439819335938, 31.741439819335938, 31.741439819335938);
  pop();

  push();
  translate(-155.633544921875, 375.7148132324219, 13.143672943115234);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(0.8774664402008057, 96.97818756103516, 24, 1, true, true);
  pop();

  push();
  translate(-155.633544921875, 321.29766845703125, 13.143672943115234);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(0.8774664402008057, 96.97818756103516, 24, 1, true, true);
  pop();

  push();
  translate(-155.633544921875, 428.718017578125, 13.143672943115234);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(0.8774664402008057, 96.97818756103516, 24, 1, true, true);
  pop();

  push();
  translate(-152.50189208984375, 320.8467712402344, -29.95307159423828);
  rotateZ(-0.0);
  rotateY(0.6073240041732788);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(0.8774666786193848, 11.455424308776855, 24, 1, true, true);
  pop();

  push();
  translate(-152.50189208984375, 375.763427734375, -29.95307159423828);
  rotateZ(-0.0);
  rotateY(0.6073240041732788);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(0.8774666786193848, 11.455424308776855, 24, 1, true, true);
  pop();

  push();
  translate(-152.50189208984375, 428.7649230957031, -29.95307159423828);
  rotateZ(-0.0);
  rotateY(0.6073240041732788);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(0.8774666786193848, 11.455424308776855, 24, 1, true, true);
  pop();

  push();
  translate(-148.9923095703125, 375.36083984375, -24.995067596435547);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(255.0, 255.0, 255.0);
  cylinder(1.0, 137.5818328857422, 24, 1, true, true);
  pop();

  push();
  translate(-156.81668090820312, 376.21575927734375, -44.436988830566406);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(255.0, 255.0, 255.0);
  cylinder(1.0, 191.08570861816406, 24, 1, true, true);
  pop();

  push();
  translate(-156.72386169433594, 375.763427734375, -73.20861053466797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(0.8360557556152344, 23.536605834960938, 44.2247200012207);
  pop();

  push();
  translate(-156.72386169433594, 440.77484130859375, -78.28652954101562);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(0.8360557556152344, 12.487754821777344, 10.705277442932129);
  pop();

  push();
  translate(-156.72386169433594, 310.156982421875, -78.28652954101562);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(0.8360557556152344, 12.487754821777344, 10.705277442932129);
  pop();

  push();
  translate(-156.72386169433594, 310.156982421875, -72.32479858398438);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(5.294656276702881, 0.7431775331497192, 24, 1, true, true);
  pop();

  push();
  translate(-156.72386169433594, 440.6876220703125, -72.32479858398438);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(5.294656276702881, 0.7431775331497192, 24, 1, true, true);
  pop();

  push();
  translate(234.29483032226562, 339.7701110839844, -11.929856300354004);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 147.0322723388672, 121.15950012207031);
  pop();

  push();
  translate(181.2189483642578, 339.7701110839844, 59.965728759765625);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  cylinder(23.943191528320312, 120.91796112060547, 24, 1, true, true);
  pop();

  push();
  translate(228.27134704589844, 339.7701110839844, 79.09329986572266);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(121.47379302978516, 83.51261901855469, 83.51261901855469);
  pop();

  push();
  translate(210.1131591796875, 339.7701110839844, 79.09329986572266);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(255.0, 255.0, 255.0);
  box(87.52705383300781, 60.17439651489258, 60.17439651489258);
  pop();

  push();
  translate(173.62850952148438, 339.7701110839844, 137.8777618408203);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(3.6129889488220215, 16.09371566772461, 3.6129889488220215);
  pop();

  push();
  translate(156.96527099609375, 335.2195129394531, 10.212646484375);
  rotateZ(-3.1415929794311523);
  rotateY(0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.8774664402008057, 104.35294342041016, 24, 1, true, true);
  pop();

  push();
  translate(156.96527099609375, 378.5926818847656, 10.212646484375);
  rotateZ(-3.1415929794311523);
  rotateY(0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.8774664402008057, 104.35294342041016, 24, 1, true, true);
  pop();

  push();
  translate(156.96527099609375, 291.873291015625, 10.212646484375);
  rotateZ(-3.1415929794311523);
  rotateY(0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.8774664402008057, 104.35294342041016, 24, 1, true, true);
  pop();

  push();
  translate(154.1566925048828, 379.0435791015625, -37.477256774902344);
  rotateZ(-3.1415929794311523);
  rotateY(0.6073240041732788);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.8774666786193848, 11.455424308776855, 24, 1, true, true);
  pop();

  push();
  translate(154.1566925048828, 335.1709289550781, -37.477256774902344);
  rotateZ(-3.1415929794311523);
  rotateY(0.6073240041732788);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.8774666786193848, 11.455424308776855, 24, 1, true, true);
  pop();

  push();
  translate(154.1566925048828, 291.82635498046875, -37.477256774902344);
  rotateZ(-3.1415929794311523);
  rotateY(0.6073240041732788);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.8774666786193848, 11.455424308776855, 24, 1, true, true);
  pop();

  push();
  translate(150.64710998535156, 335.5735168457031, -32.51925277709961);
  rotateZ(-3.1415929794311523);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(1.0, 104.072265625, 24, 1, true, true);
  pop();

  push();
  translate(156.89141845703125, 337.2046813964844, -73.809326171875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.8900457620620728, 23.933631896972656, 20.51738929748535);
  pop();

  push();
  translate(156.89141845703125, 337.2046813964844, -62.383270263671875);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  cylinder(10.147568702697754, 0.7911696434020996, 24, 1, true, true);
  pop();

  push();
  translate(156.89141845703125, 296.26165771484375, -75.2057876586914);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.8900457620620728, 20.492143630981445, 27.644969940185547);
  pop();

  push();
  translate(156.89141845703125, 373.4789733886719, -64.15142822265625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.6364456415176392, 14.653331756591797, 19.768108367919922);
  pop();

  push();
  translate(156.89141845703125, 373.4789733886719, -51.48188018798828);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(0.6364456415176392, 4.687920093536377, 22.50389289855957);
  pop();

  push();
  translate(157.2724151611328, 356.560302734375, 45.82044982910156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 356.560302734375, 28.500343322753906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 356.560302734375, 12.130584716796875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 356.560302734375, -4.933675765991211);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 352.8135681152344, -20.763938903808594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 10.91840648651123, 9.854174613952637);
  pop();

  push();
  translate(157.2724151611328, 363.06597900390625, -20.763938903808594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 10.91840648651123, 3.40219783782959);
  pop();

  push();
  translate(157.2724151611328, 313.161865234375, 45.82044982910156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 313.161865234375, 28.500343322753906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 313.161865234375, 12.130584716796875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 313.161865234375, -4.933675765991211);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 309.4151306152344, -20.763938903808594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 10.91840648651123, 9.854174613952637);
  pop();

  push();
  translate(157.2724151611328, 319.66754150390625, -20.763938903808594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 10.91840648651123, 3.40219783782959);
  pop();

  push();
  translate(157.2724151611328, 390.3031005859375, 45.82044982910156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 390.3031005859375, 28.500343322753906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 390.3031005859375, 12.130584716796875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 390.3031005859375, -4.933675765991211);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 8.209588050842285, 5.022024631500244);
  pop();

  push();
  translate(157.2724151611328, 386.55633544921875, -20.763938903808594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 10.91840648651123, 9.854174613952637);
  pop();

  push();
  translate(157.2724151611328, 396.80877685546875, -20.763938903808594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 10.91840648651123, 3.40219783782959);
  pop();

  push();
  translate(234.29483032226562, 550.8574829101562, -2.009706497192383);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 183.1964111328125, 150.4758758544922);
  pop();

  push();
  translate(221.12680053710938, 550.5567016601562, 90.48702239990234);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(125.77058410644531, 105.42239379882812, 105.42239379882812);
  pop();

  push();
  translate(202.32630920410156, 550.5567016601562, 90.48702239990234);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(116.67051270604134, 22.591645941138268, 25.21515056490898);
  box(89.68241119384766, 102.11040496826172, 102.11040496826172);
  pop();

  push();
  translate(210.02642822265625, 550.5567016601562, 164.25169372558594);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(9.634913444519043, 16.09371566772461, 9.634913444519043);
  pop();

  push();
  translate(157.2724151611328, 502.6181945800781, 63.60453414916992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 534.5188598632812, 63.60453414916992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 567.940185546875, 63.60453414916992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 604.18115234375, 63.60453414916992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 502.6181945800781, 42.18132019042969);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 534.5188598632812, 42.18132019042969);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 567.940185546875, 42.18132019042969);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 604.18115234375, 42.18132019042969);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 502.6181945800781, 21.2957820892334);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 534.5188598632812, 21.2957820892334);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 567.940185546875, 21.2957820892334);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 604.18115234375, 21.2957820892334);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 502.6181945800781, -0.6987285614013672);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 534.5188598632812, -0.6987285614013672);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 567.940185546875, -0.6987285614013672);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 604.18115234375, -0.6987285614013672);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 502.6181945800781, -21.202159881591797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 604.18115234375, -21.202159881591797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 6.237179756164551);
  pop();

  push();
  translate(157.2724151611328, 551.8661499023438, -21.202159881591797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 71.40708923339844);
  pop();

  push();
  translate(156.89288330078125, 552.7216186523438, 79.20367431640625);
  rotateZ(-3.1415929794311523);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(1.0, 129.25413513183594, 24, 1, true, true);
  pop();

  push();
  translate(234.29483032226562, 787.9996337890625, 0.3313426971435547);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 184.1947479248047, 255.40171813964844);
  pop();

  push();
  translate(194.18023681640625, 787.9996337890625, 92.686767578125);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(253.85165405273438, 53.333518981933594, 53.333518981933594);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, 74.13156127929688);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(181.0, 474.2715759277344, -30.0);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(47.82571792602539, 237.13343811035156, 2.8019561767578125);
  pop();

  push();
  translate(191.41917419433594, 782.1278686523438, 130.03689575195312);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  cylinder(23.50999641418457, 60.51062774658203, 24, 1, true, true);
  pop();

  push();
  translate(191.41917419433594, 782.1278686523438, 160.21824645996094);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  sphere(23.76849937438965, 24, 24);
  pop();

  push();
  translate(191.41917419433594, 782.1278686523438, 183.92689514160156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  cylinder(7.46894645690918, 19.22376251220703, 24, 1, true, true);
  pop();

  push();
  translate(191.41917419433594, 782.1278686523438, 193.51524353027344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  sphere(7.5510711669921875, 24, 24);
  pop();

  push();
  translate(191.41917419433594, 782.1278686523438, 202.36874389648438);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  cylinder(0.9889376759529114, 5.591546535491943, 24, 1, true, true);
  pop();

  push();
  translate(252.3090057373047, 788.0327758789062, 109.10443115234375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(112.57566833496094, 42.15601348876953, 252.8070831298828);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, 74.13156127929688);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, 74.13156127929688);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, 74.13156127929688);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, 57.124610900878906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, 57.124610900878906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, 57.124610900878906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, 57.124610900878906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, 40.32319259643555);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, 40.32319259643555);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, 40.32319259643555);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, 40.32319259643555);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, 23.157085418701172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, 23.157085418701172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, 23.157085418701172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, 23.157085418701172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, 4.641147613525391);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, 4.641147613525391);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, 4.641147613525391);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, 4.641147613525391);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, -11.292176246643066);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, -11.292176246643066);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, -11.292176246643066);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, -11.292176246643066);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, -27.48186492919922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, -27.48186492919922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, -27.48186492919922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, -27.48186492919922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 715.0740966796875, -46.00463104248047);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 765.4182739257812, -46.00463104248047);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 820.7407836914062, -46.00463104248047);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 875.1823120117188, -46.00463104248047);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 7.097985744476318, 10.586326599121094);
  pop();

  push();
  translate(157.2724151611328, 791.6762084960938, -77.369140625);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.1303359270095825, 30.792898178100586, 30.698604583740234);
  pop();

  push();
  translate(153.65460205078125, 507.0144348144531, -54.64801788330078);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(7.534060955047607, 47.4610710144043, 0.6585719585418701);
  pop();

  push();
  translate(153.65460205078125, 554.0715942382812, -54.64801788330078);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(7.534060955047607, 47.4610710144043, 0.6585719585418701);
  pop();

  push();
  translate(153.65460205078125, 598.2023315429688, -54.64801788330078);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(7.534060955047607, 47.4610710144043, 0.6585719585418701);
  pop();

  push();
  translate(234.29483032226562, 1127.088623046875, -7.099086761474609);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 164.9562530517578, 286.9319763183594);
  pop();

  push();
  translate(180.50961303710938, 1126.5150146484375, 76.30369567871094);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(285.6939392089844, 33.887569427490234, 33.887569427490234);
  pop();

  push();
  translate(157.2724151611328, 1035.1044921875, 49.42120361328125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(156.89288330078125, 1130.6434326171875, 65.02034759521484);
  rotateZ(-3.1415929794311523);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(1.0, 246.4656982421875, 24, 1, true, true);
  pop();

  push();
  translate(245.11160278320312, 1127.088623046875, 87.3143310546875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(129.76458740234375, 23.880464553833008, 286.9319763183594);
  pop();

  push();
  translate(157.2724151611328, 1095.5509033203125, 49.42120361328125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1157.60693359375, 49.42120361328125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1219.5106201171875, 49.42120361328125);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1035.1044921875, 31.263912200927734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1095.5509033203125, 31.263912200927734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1157.60693359375, 31.263912200927734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1219.5106201171875, 31.263912200927734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1035.1044921875, 15.80809497833252);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1095.5509033203125, 15.80809497833252);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1157.60693359375, 15.80809497833252);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1219.5106201171875, 15.80809497833252);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1035.1044921875, 0.6091213226318359);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1095.5509033203125, 0.6091213226318359);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1157.60693359375, 0.6091213226318359);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1219.5106201171875, 0.6091213226318359);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1035.1044921875, -16.27469825744629);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1095.5509033203125, -16.27469825744629);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1157.60693359375, -16.27469825744629);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1219.5106201171875, -16.27469825744629);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1035.1044921875, -34.27375030517578);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1095.5509033203125, -34.27375030517578);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1157.60693359375, -34.27375030517578);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1219.5106201171875, -34.27375030517578);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(203.77000427246094, 1126.9794921875, 96.57322692871094);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(46.00016784667969, 46.00016784667969, 46.00016784667969);
  pop();

  push();
  translate(226.92343139648438, 1094.34423828125, 102.53553771972656);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(6.324429035186768, 14.574797630310059, 6.324429035186768);
  pop();

  push();
  translate(181.01226806640625, 1094.34423828125, 102.53553771972656);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(6.324429035186768, 14.574797630310059, 6.324429035186768);
  pop();

  push();
  translate(226.92343139648438, 1158.5875244140625, 102.53553771972656);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(6.324429035186768, 14.574797630310059, 6.324429035186768);
  pop();

  push();
  translate(181.01226806640625, 1158.5875244140625, 102.53553771972656);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(6.324429035186768, 14.574797630310059, 6.324429035186768);
  pop();

  push();
  translate(234.29483032226562, 1472.9161376953125, 10.760467529296875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 191.34866333007812, 286.9319763183594);
  pop();

  push();
  translate(157.2724151611328, 1365.8177490234375, 65.81790161132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1470.4185791015625, 65.81790161132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1584.5706787109375, 65.81790161132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1365.8177490234375, 35.455562591552734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1470.4185791015625, 35.455562591552734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1584.5706787109375, 35.455562591552734);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1365.8177490234375, 3.0577239990234375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1470.4185791015625, 3.0577239990234375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1584.5706787109375, 3.0577239990234375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1365.8177490234375, -30.230453491210938);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1470.4185791015625, -30.230453491210938);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1584.5706787109375, -30.230453491210938);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1365.8177490234375, -59.35609436035156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1470.4185791015625, -59.35609436035156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(157.2724151611328, 1584.5706787109375, -59.35609436035156);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 11.893243789672852);
  pop();

  push();
  translate(185.67518615722656, 1474.27685546875, 106.32119750976562);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(285.6939392089844, 41.11724090576172, 41.11724090576172);
  pop();

  push();
  translate(234.29483032226562, 1762.1463623046875, 10.760467529296875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 191.34866333007812, 216.83546447753906);
  pop();

  push();
  translate(157.2724151611328, 1681.211669921875, 65.81790161132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(178.10081481933594, 1763.1746826171875, 106.32119750976562);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(219.31105041503906, 29.23431968688965, 29.23431968688965);
  pop();

  push();
  translate(157.2724151611328, 1765.115234375, 65.81790161132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1836.4588623046875, 65.81790161132812);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1681.211669921875, 36.49287414550781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1765.115234375, 36.49287414550781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1836.4588623046875, 36.49287414550781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1681.211669921875, 1.3797454833984375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1765.115234375, 1.3797454833984375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1836.4588623046875, 1.3797454833984375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1681.211669921875, -34.67869567871094);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1765.115234375, -34.67869567871094);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(157.2724151611328, 1836.4588623046875, -34.67869567871094);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.1303359270095825, 7.914586067199707, 8.987764358520508);
  pop();

  push();
  translate(-234.44744873046875, 613.5117797851562, -6.92671537399292);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 156.12985229492188, 189.6017303466797);
  pop();

  push();
  translate(-156.72386169433594, 691.1930541992188, -72.70537567138672);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.6496801376342773, 24.640466690063477, 29.8436279296875);
  pop();

  push();
  translate(-156.72386169433594, 571.7355346679688, -70.91549682617188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.6496801376342773, 29.342864990234375, 18.211111068725586);
  pop();

  push();
  translate(-156.72386169433594, 672.958740234375, 50.34232711791992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 635.483642578125, 50.34232711791992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 595.3988037109375, 50.34232711791992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 555.2324829101562, 50.34232711791992);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 672.958740234375, 36.09122085571289);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 635.483642578125, 36.09122085571289);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 595.3988037109375, 36.09122085571289);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 555.2324829101562, 36.09122085571289);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 672.958740234375, 22.40554428100586);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 635.483642578125, 22.40554428100586);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 595.3988037109375, 22.40554428100586);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 555.2324829101562, 22.40554428100586);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 672.958740234375, 9.31190299987793);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 635.483642578125, 9.31190299987793);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 595.3988037109375, 9.31190299987793);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 555.2324829101562, 9.31190299987793);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.46560338139533997, 6.954490661621094, 8.423023223876953);
  pop();

  push();
  translate(-156.72386169433594, 672.958740234375, -18.967815399169922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.7652173638343811, 13.449902534484863, 13.843207359313965);
  pop();

  push();
  translate(-156.72386169433594, 635.483642578125, -18.967815399169922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.7652173638343811, 13.449902534484863, 13.843207359313965);
  pop();

  push();
  translate(-156.72386169433594, 595.3988037109375, -18.967815399169922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.7652173638343811, 13.449902534484863, 13.843207359313965);
  pop();

  push();
  translate(-156.72386169433594, 555.2324829101562, -18.967815399169922);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.7652173638343811, 13.449902534484863, 13.843207359313965);
  pop();

  push();
  translate(-181.30296325683594, 614.4127197265625, 71.2817611694336);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(187.9188232421875, 33.887569427490234, 33.887569427490234);
  pop();

  push();
  translate(-156.81668090820312, 613.5610961914062, 1.2871136665344238);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  cylinder(1.0, 191.08570861816406, 24, 1, true, true);
  pop();

  push();
  translate(-156.81668090820312, 613.5610961914062, -5.268426895141602);
  rotateZ(-0.0);
  rotateY(0.0);
  rotateX(3.1415926955062865);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(1.0, 164.9063262939453, 24, 1, true, true);
  pop();

  push();
  translate(-234.44744873046875, 909.7493896484375, -11.929856300354004);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 147.0322723388672, 208.41297912597656);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, 48.70576477050781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, 48.70576477050781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, 48.70576477050781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, 36.74181365966797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, 36.74181365966797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, 36.74181365966797);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, 24.415485382080078);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, 24.415485382080078);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, 24.415485382080078);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, 11.71286678314209);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, 11.71286678314209);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, 11.71286678314209);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, -0.9431085586547852);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, -0.9431085586547852);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, -0.9431085586547852);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, -14.461227416992188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, -14.461227416992188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, -14.461227416992188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, -28.889087677001953);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, -28.889087677001953);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, -28.889087677001953);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 968.6949462890625, -44.879600524902344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 905.3714599609375, -44.879600524902344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 842.8313598632812, -44.879600524902344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 906.097412109375, -70.91549682617188);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.6496801376342773, 29.342864990234375, 18.211111068725586);
  pop();

  push();
  translate(-168.6138916015625, 910.7957763671875, 61.97917938232422);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(202.76544189453125, 15.54411506652832, 15.54411506652832);
  pop();

  push();
  translate(-182.72341918945312, 803.7593383789062, -33.74188995361328);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(47.82571792602539, 237.13343811035156, 2.8019561767578125);
  pop();

  push();
  translate(-156.72386169433594, 329.89495849609375, -57.006717681884766);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(0.453023225069046, 10.234625816345215, 5.800736427307129);
  pop();

  push();
  translate(-156.72386169433594, 329.89495849609375, -51.83732604980469);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(2.868950128555298, 0.402696430683136, 24, 1, true, true);
  pop();

  push();
  translate(-156.72386169433594, 329.89495849609375, -62.17389678955078);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  cylinder(2.868950128555298, 0.402696430683136, 24, 1, true, true);
  pop();

  push();
  translate(-173.25845336914062, 454.79248046875, 91.52694702148438);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.6477510929107666, 16.600875854492188, 24, 1, true, true);
  pop();

  push();
  translate(-173.25845336914062, 295.624267578125, 91.52694702148438);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.6477510929107666, 16.600875854492188, 24, 1, true, true);
  pop();

  push();
  translate(-176.7438507080078, 459.0450134277344, 95.11107635498047);
  rotateZ(-0.918842613697052);
  rotateY(0.0);
  rotateX(1.5707963705062866);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  plane(10.40791130065918, 7.805263042449951);
  pop();

  push();
  translate(-234.44744873046875, 1195.910888671875, 5.124496936798096);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 180.03662109375, 133.98731994628906);
  pop();

  push();
  translate(-156.72386169433594, 1191.8011474609375, 48.70576477050781);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 1191.8011474609375, 17.499982833862305);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 1191.8011474609375, -10.510771751403809);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 17.12525177001953);
  pop();

  push();
  translate(-156.72386169433594, 1151.523681640625, -51.52183532714844);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.8166121244430542, 39.08092498779297, 23.260812759399414);
  pop();

  push();
  translate(-156.72386169433594, 1151.523681640625, -30.874427795410156);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.570796325);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(23.008840560913086, 1.6148029565811157, 23.008840560913086);
  pop();

  push();
  translate(-173.80404663085938, 1196.3936767578125, 95.31253051757812);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(133.6432342529297, 24.555185317993164, 24.555185317993164);
  pop();

  push();
  translate(-234.44744873046875, 1487.8009033203125, 5.1244964599609375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 180.03662109375, 287.28076171875);
  pop();

  push();
  translate(-156.72386169433594, 1565.1124267578125, 64.59898376464844);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-168.6138916015625, 1488.8360595703125, 95.31253051757812);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  box(286.54302978515625, 15.544114112854004, 15.544114112854004);
  pop();

  push();
  translate(-156.72386169433594, 1474.0062255859375, 64.59898376464844);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1392.7850341796875, 64.59898376464844);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1565.1124267578125, 40.70567321777344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1474.0062255859375, 40.70567321777344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1392.7850341796875, 40.70567321777344);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1565.1124267578125, 19.82611656188965);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1474.0062255859375, 19.82611656188965);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1392.7850341796875, 19.82611656188965);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1565.1124267578125, -5.670337677001953);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1474.0062255859375, -5.670337677001953);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1392.7850341796875, -5.670337677001953);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1565.1124267578125, -34.63579559326172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1474.0062255859375, -34.63579559326172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1392.7850341796875, -34.63579559326172);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.4656033515930176, 6.954490661621094, 25.693340301513672);
  pop();

  push();
  translate(-156.72386169433594, 1428.287353515625, -72.70537567138672);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(1.6496801376342773, 24.640466690063477, 19.21413803100586);
  pop();

  push();
  translate(-234.44744873046875, 1782.5467529296875, 5.1244964599609375);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(154.44610595703125, 180.03662109375, 178.68251037597656);
  pop();

  push();
  translate(-173.820068359375, 607.9827880859375, 92.89031982421875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(4.304625511169434, 17.798519134521484, 4.304625511169434);
  pop();

  push();
  translate(-172.7066650390625, 1781.8580322265625, 95.31253051757812);
  rotateZ(-1.5707963705062866);
  rotateY(0.0);
  rotateX(2.356194510253143);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(172.85662841796875, 23.130971908569336, 23.130971908569336);
  pop();

  push();
  translate(-0.0, 2829.28857421875, -85.5366439819336);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(247.32998996973038, 235.64282029867172, 221.15669041872025);
  plane(2397.977294921875, 1919.4986572265625);
  pop();

  push();
  translate(139.50482177734375, 2809.760986328125, -60.172706604003906);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(36.623329162597656, 24, 24);
  pop();

  push();
  translate(188.90223693847656, 2847.255126953125, -104.1904067993164);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(54.81481170654297, 24, 24);
  pop();

  push();
  translate(-56.16337585449219, 2809.760986328125, -54.31020736694336);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(48.394126892089844, 24, 24);
  pop();

  push();
  translate(-93.95288848876953, 2809.760986328125, -63.90643310546875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(37.33333969116211, 24, 24);
  pop();

  push();
  translate(-125.50853729248047, 2809.760986328125, -84.47235107421875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(30.55217933654785, 24, 24);
  pop();

  push();
  translate(-155.67318725585938, 2810.23876953125, -84.49819946289062);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(25.762649536132812, 24, 24);
  pop();

  push();
  translate(-180.37294006347656, 2810.33447265625, -91.50187683105469);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(21.729354858398438, 24, 24);
  pop();

  push();
  translate(-3.7610702514648438, 2809.760986328125, -76.01199340820312);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(37.33333969116211, 24, 24);
  pop();

  push();
  translate(77.92486572265625, 2847.255126953125, -144.9505157470703);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  sphere(88.58734893798828, 24, 24);
  pop();

  push();
  translate(-0.0, 2829.28857421875, -85.5366439819336);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(0.0);
  fill(247.32998996973038, 235.64282029867172, 221.15669041872025);
  plane(2397.977294921875, 1919.4986572265625);
  pop();

  push();
  translate(-175.4452362060547, 803.7593383789062, 101.24581146240234);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  cone(16.79671287536621, 33.59342575073242, 24, 1, true);
  pop();

  push();
  translate(-175.4452362060547, 803.7593383789062, 106.71696472167969);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  cylinder(9.462016105651855, 22.903745651245117, 24, 1, true, true);
  pop();

  push();
  translate(184.5817413330078, 477.62139892578125, 114.60562133789062);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  cone(26.426816940307617, 52.853633880615234, 24, 1, true);
  pop();

  push();
  translate(184.5817413330078, 477.62139892578125, 123.21356201171875);
  rotateZ(-0.0);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(110.59113532304764, 120.05432993173599, 197.43925988674164);
  cylinder(14.886898040771484, 36.03520965576172, 24, 1, true, true);
  pop();

  //%%main%%

  push();
  translate(-52.43029022216797, 470.34478759765625, -68.36882781982422);
  rotateZ(-3.199500322341919);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(35.21902847290039, 16.86983871459961, 40.69841003417969);
  pop();

  push();
  translate(-52.847049713134766, 463.1557922363281, -49.770938873291016);
  rotateZ(-3.199500322341919);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(35.21902847290039, 20.286319732666016, 25.86595916748047);
  pop();

  push();
  translate(-33.395111083984375, 476.2182922363281, -78.54084014892578);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.6287039973419188);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(5.598690509796143, 3.632028818130493, 24, 1, true, true);
  pop();

  push();
  translate(-69.46553802490234, 478.30938720703125, -78.54084014892578);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.6287039973419188);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(5.598690509796143, 3.632028818130493, 24, 1, true, true);
  pop();

  push();
  translate(-35.26232147216797, 462.1835632324219, -49.545875549316406);
  rotateZ(-3.199500322341919);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(0.6806979775428772, 12.165396690368652, 14.136146545410156);
  pop();

  push();
  translate(-70.42184448242188, 464.1890869140625, -49.545875549316406);
  rotateZ(-3.199500322341919);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(0.6806979775428772, 12.165396690368652, 13.569428443908691);
  pop();

  push();
  translate(-51.58226776123047, 476.1711730957031, -49.545875549316406);
  rotateZ(-4.770297050476074);
  rotateY(0.0);
  rotateX(1.570796325);
  fill(255.0, 255.0, 255.0);
  box(0.6806979775428772, 15.175078392028809, 30.16013526916504);
  pop();

  push();
  translate(-57.76887130737305, 378.2559509277344, -76.25109100341797);
  rotateZ(-3.199500322341919);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(116.67051270604134, 22.591645941138268, 25.21515056490898);
  box(35.21902847290039, 1.7552791833877563, 130.8740997314453);
  pop();

  push();
  translate(-57.76887130737305, 378.2559509277344, -35.89243698120117);
  rotateZ(-3.199500322341919);
  rotateY(-0.0);
  rotateX(1.570796325);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(35.21902847290039, 1.7552791833877563, 130.8740997314453);
  pop();

  push();
  translate(-75.74425506591797, 379.2980041503906, -55.80156707763672);
  rotateZ(-0.0);
  rotateY(1.570796012878418);
  rotateX(-1.5128890731018065);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(41.516536712646484, 1.755279302597046, 130.87411499023438);
  pop();

  push();
  translate(-39.55546569824219, 377.2000732421875, -55.80156707763672);
  rotateZ(-0.0);
  rotateY(1.570796012878418);
  rotateX(-1.5128890731018065);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  box(41.516536712646484, 1.755279302597046, 130.87411499023438);
  pop();

  push();
  translate(-35.186439514160156, 419.4183654785156, -78.54084014892578);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.6287039973419188);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(5.598690509796143, 3.632028818130493, 24, 1, true, true);
  pop();

  push();
  translate(-74.5797119140625, 421.70208740234375, -78.54084014892578);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.6287039973419188);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(5.598690509796143, 3.632028818130493, 24, 1, true, true);
  pop();

  push();
  translate(-39.97833251953125, 336.7597961425781, -78.54084014892578);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.6287039973419188);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(5.598690509796143, 3.632028818130493, 24, 1, true, true);
  pop();

  push();
  translate(-79.3716049194336, 339.04351806640625, -78.54084014892578);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(-1.6287039973419188);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(5.598690509796143, 3.632028818130493, 24, 1, true, true);
  pop();

  push();
  translate(-61.404052734375, 315.5502624511719, -42.6609001159668);
  rotateZ(-3.19950008392334);
  rotateY(-3.258413983076025e-07);
  rotateX(-4.5506286516783234e-08);
  fill(255.0, 255.0, 255.0);
  box(35.21902847290039, 1.755279302597046, 13.25386905670166);
  pop();

  push();
  translate(-61.404052734375, 315.5502624511719, -69.55305480957031);
  rotateZ(-3.19950008392334);
  rotateY(-3.258413983076025e-07);
  rotateX(-4.5506286516783234e-08);
  fill(255.0, 255.0, 255.0);
  box(35.21902847290039, 1.755279302597046, 13.25386905670166);
  pop();

  push();
  translate(-46.948516845703125, 314.7122497558594, -55.86952209472656);
  rotateZ(-3.19950008392334);
  rotateY(-3.258413983076025e-07);
  rotateX(-4.5506286516783234e-08);
  fill(255.0, 255.0, 255.0);
  box(5.767390727996826, 1.755279302597046, 14.937564849853516);
  pop();

  push();
  translate(-75.60113525390625, 316.373291015625, -55.86952209472656);
  rotateZ(-3.19950008392334);
  rotateY(-3.258413983076025e-07);
  rotateX(-4.5506286516783234e-08);
  fill(255.0, 255.0, 255.0);
  box(5.767390727996826, 1.755279302597046, 14.937564849853516);
  pop();

  push();
  translate(-52.847049713134766, 463.1557922363281, -38.21830368041992);
  rotateZ(-0.057907287031412125);
  rotateY(0.0);
  rotateX(1.570796325);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  cylinder(2.4151902198791504, 4.830379962921143, 24, 1, true, true);
  pop();

  push();
  translate(-52.847049713134766, 463.1557922363281, -35.916656494140625);
  rotateZ(-0.057907287031412125);
  rotateY(0.0);
  rotateX(0.0);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  sphere(2.4193832874298096, 24, 24);
  pop();

  push();
  translate(-61.4804573059082, 314.2323303222656, -43.76029968261719);
  rotateZ(-0.057907287031412125);
  rotateY(0.0);
  rotateX(0.0);
  fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
  sphere(2.4193832874298096, 24, 24);
  pop();

  push();
  translate(-47.770687103271484, 313.7079772949219, -55.86952209472656);
  rotateZ(-3.19950008392334);
  rotateY(-3.258413983076025e-07);
  rotateX(-4.5506286516783234e-08);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.2637416124343872, 0.6433554887771606, 6.685538291931152);
  pop();

  push();
  translate(-74.9489517211914, 315.2835388183594, -55.86952209472656);
  rotateZ(-3.19950008392334);
  rotateY(-3.258413983076025e-07);
  rotateX(-4.5506286516783234e-08);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  box(1.2637416124343872, 0.6433554887771606, 6.685538291931152);
  pop();

  push();
  translate(-47.123130798339844, 313.88482666015625, -64.71440887451172);
  rotateZ(-0.057907283306121826);
  rotateY(-1.1110708713531494);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  ellipsoid(0.9999994039535522, 0.6467726230621338, 2.455188751220703, 24, 24);
  pop();

  push();
  translate(-47.123130798339844, 313.88482666015625, -68.3802719116211);
  rotateZ(-0.057907283306121826);
  rotateY(-1.1110708713531494);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  ellipsoid(0.9999994039535522, 0.6467726230621338, 2.455188751220703, 24, 24);
  pop();

  push();
  translate(-47.123130798339844, 313.88482666015625, -72.06871795654297);
  rotateZ(-0.057907283306121826);
  rotateY(-1.1110708713531494);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  ellipsoid(0.9999994039535522, 0.6467726230621338, 2.455188751220703, 24, 24);
  pop();

  push();
  translate(-75.48100280761719, 315.52880859375, -64.71440887451172);
  rotateZ(-3.199500322341919);
  rotateY(-1.1110708713531494);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  ellipsoid(0.9999994039535522, 0.646772563457489, 2.455188751220703, 24, 24);
  pop();

  push();
  translate(-75.48100280761719, 315.52880859375, -68.3802719116211);
  rotateZ(-3.199500322341919);
  rotateY(-1.1110708713531494);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  ellipsoid(0.9999994039535522, 0.646772563457489, 2.455188751220703, 24, 24);
  pop();

  push();
  translate(-75.48100280761719, 315.52880859375, -72.06871795654297);
  rotateZ(-3.199500322341919);
  rotateY(-1.1110708713531494);
  rotateX(0.0);
  fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
  ellipsoid(0.9999994039535522, 0.646772563457489, 2.455188751220703, 24, 24);
  pop();

  push();
  translate(-61.613006591796875, 311.9458923339844, -73.2670669555664);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.512889037968588);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.4205077588558197, 19.68009376525879, 24, 1, true, true);
  pop();

  push();
  translate(-55.8201904296875, 314.5563049316406, -69.63471984863281);
  rotateZ(-0.05790737271308899);
  rotateY(-3.141592502593994);
  rotateX(2.1577420375663756);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.4205077886581421, 9.19639778137207, 24, 1, true, true);
  pop();

  push();
  translate(-67.34044647216797, 315.2241516113281, -69.63471984863281);
  rotateZ(-0.05790737271308899);
  rotateY(-3.141592502593994);
  rotateX(2.1577420375663756);
  fill(49.209992811083794, 92.33493134379387, 171.831157207489);
  cylinder(0.4205077886581421, 9.19639778137207, 24, 1, true, true);
  pop();

  push();
  translate(-61.56760025024414, 312.7291259765625, -76.09668731689453);
  rotateZ(-0.0);
  rotateY(-1.570796251296997);
  rotateX(1.512889037968588);
  fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
  cylinder(0.9181264042854309, 36.387027740478516, 24, 1, true, true);
  pop();

  //%%car_stationary%%

  push();
    translate(0, xDisplacement + 100, 0);
    push();
    translate(56.742008209228516, 300.3902282714844, -73.00074768066406);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    box(27.525161743164062, 13.221394538879395, 47.512813568115234);
    pop();

    push();
    translate(56.742008209228516, 312.4684753417969, -60.73272705078125);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    box(22.69013786315918, 14.192179679870605, 24.89413070678711);
    pop();

    push();
    translate(66.93416595458984, 312.3836364746094, -61.03003692626953);
    rotateZ(-0.0);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    box(4.855676174163818, 14.192177772521973, 25.158306121826172);
    pop();

    push();
    translate(46.55588150024414, 312.8590393066406, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    box(4.855676174163818, 14.192177772521973, 24.811922073364258);
    pop();

    push();
    translate(56.53969192504883, 299.6013488769531, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(64.12395477294922, 276.1730041503906, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(49.12051773071289, 276.1730041503906, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(56.53969192504883, 324.9258117675781, -60.47285461425781);
    rotateZ(-10.995575904846191);
    rotateY(-0.0);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(43.91399383544922, 308.8181457519531, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(69.19505310058594, 308.8181457519531, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(42.576499938964844, 290.0987854003906, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(42.576499938964844, 346.3166809082031, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(70.81439208984375, 290.0987854003906, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(70.81439208984375, 346.3166809082031, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(41.0904655456543, 540.5106201171875, -73.00074768066406);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(41.0904655456543, 540.5106201171875, -60.73272705078125);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(51.28261947631836, 540.5106201171875, -61.03003692626953);
    rotateZ(-0.0);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(30.904338836669922, 540.5106201171875, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(40.88814926147461, 556.728515625, -61.41576385498047);
    rotateZ(-4.712389945983887);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(40.88814926147461, 524.3365478515625, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(48.472408294677734, 500.9082336425781, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(33.46897506713867, 500.9082336425781, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(40.88814926147461, 559.112060546875, -60.47285461425781);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(28.262449264526367, 533.5533447265625, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(28.262449264526367, 548.0760498046875, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(53.543514251708984, 533.5533447265625, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(53.543514251708984, 548.0760498046875, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(26.924955368041992, 514.833984375, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(26.924955368041992, 564.384033203125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(55.1628532409668, 514.833984375, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(55.1628532409668, 564.384033203125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(62.808982849121094, 1138.6400146484375, -73.00074768066406);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(62.808982849121094, 1138.6400146484375, -60.73272705078125);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(73.00113677978516, 1138.6400146484375, -61.03003692626953);
    rotateZ(-0.0);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(52.62285614013672, 1138.6400146484375, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(62.606666564941406, 1154.85791015625, -61.41576385498047);
    rotateZ(-4.712389945983887);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(62.606666564941406, 1122.4659423828125, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(70.19092559814453, 1099.03759765625, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(55.18749237060547, 1099.03759765625, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(62.606666564941406, 1157.241455078125, -60.47285461425781);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(49.9809684753418, 1131.6827392578125, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(49.9809684753418, 1146.2054443359375, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(75.26203155517578, 1131.6827392578125, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(75.26203155517578, 1146.2054443359375, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(48.64347457885742, 1112.96337890625, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(48.64347457885742, 1162.513427734375, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(76.8813705444336, 1112.96337890625, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(76.8813705444336, 1162.513427734375, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(69.34419250488281, 2006.436279296875, -73.00074768066406);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(69.34419250488281, 2006.436279296875, -60.73272705078125);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(79.53634643554688, 2006.436279296875, -61.03003692626953);
    rotateZ(-0.0);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(59.15806579589844, 2006.436279296875, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(69.14187622070312, 2022.654296875, -61.41576385498047);
    rotateZ(-4.712389945983887);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(69.14187622070312, 1990.26220703125, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(76.72613525390625, 1966.833984375, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(61.72270202636719, 1966.833984375, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(69.14187622070312, 2025.037841796875, -60.47285461425781);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(56.51617431640625, 1999.47900390625, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(56.51617431640625, 2014.001708984375, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(81.7972412109375, 1999.47900390625, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(81.7972412109375, 2014.001708984375, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(55.178680419921875, 1980.759765625, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(55.178680419921875, 2030.309814453125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(83.41658020019531, 1980.759765625, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(83.41658020019531, 2030.309814453125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(62.808982849121094, 821.974609375, -73.00074768066406);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(62.808982849121094, 821.974609375, -60.73272705078125);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(73.00113677978516, 821.974609375, -61.03003692626953);
    rotateZ(-0.0);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(52.62285614013672, 821.974609375, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(62.606666564941406, 838.192626953125, -61.41576385498047);
    rotateZ(-4.712389945983887);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(62.606666564941406, 805.800537109375, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(70.19092559814453, 782.372314453125, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(55.18749237060547, 782.372314453125, -71.19406127929688);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(62.606666564941406, 840.576171875, -60.47285461425781);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(49.9809684753418, 815.017333984375, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(49.9809684753418, 829.5400390625, -60.03624725341797);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(75.26203155517578, 815.017333984375, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(75.26203155517578, 829.5400390625, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(48.64347457885742, 796.298095703125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(48.64347457885742, 845.84814453125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(76.8813705444336, 796.298095703125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(76.8813705444336, 845.84814453125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(69.14187622070312, 1987.7974853515625, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(62.606666564941406, 1119.618408203125, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(62.606666564941406, 803.411376953125, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(40.88814926147461, 522.2611694335938, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(56.53969192504883, 297.2316589355469, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(56.742008209228516, 345.9941711425781, -75.90045166015625);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    box(27.525161743164062, 6.429924964904785, 43.403289794921875);
    pop();

    push();
    translate(69.81551361083984, 345.9941711425781, -69.9337387084961);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 42.84309768676758);
    pop();

    push();
    translate(69.81551361083984, 345.9941711425781, -65.51083374023438);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 42.84309768676758);
    pop();

    push();
    translate(69.81551361083984, 345.9941711425781, -61.08142852783203);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 42.84309768676758);
    pop();

    push();
    translate(43.69816970825195, 345.9941711425781, -69.9337387084961);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 42.84309768676758);
    pop();

    push();
    translate(43.69816970825195, 345.9941711425781, -65.51083374023438);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 42.84309768676758);
    pop();

    push();
    translate(43.69816970825195, 345.9941711425781, -61.08142852783203);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 42.84309768676758);
    pop();

    push();
    translate(56.677520751953125, 366.9200744628906, -69.9337387084961);
    rotateZ(-1.5707963705062866);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 25.353879928588867);
    pop();

    push();
    translate(56.677520751953125, 366.9200744628906, -65.51083374023438);
    rotateZ(-1.5707963705062866);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 25.353879928588867);
    pop();

    push();
    translate(56.677520751953125, 366.9200744628906, -61.08142852783203);
    rotateZ(-1.5707963705062866);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(1.1709307432174683, 2.0, 25.353879928588867);
    pop();

    push();
    translate(45.53029251098633, 365.2601013183594, -66.1976089477539);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(2.5735371112823486, 14.175505638122559, 2.5735371112823486);
    pop();

    push();
    translate(67.93326568603516, 365.2601013183594, -66.1976089477539);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(2.5735371112823486, 14.175505638122559, 2.5735371112823486);
    pop();

    //%%cars_left%%
  pop();

  push();
    translate(0, (frameCount % clipDuration) * 5 - 600, 0);
    push();
    translate(-46.50584030151367, 1370.07958984375, -73.00074768066406);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(-46.50584030151367, 1370.07958984375, -60.73272705078125);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(-56.697994232177734, 1370.07958984375, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(-36.3197135925293, 1370.07958984375, -61.03003692626953);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(-46.303524017333984, 1353.8616943359375, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-46.303524017333984, 1386.253662109375, -61.41576385498047);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-53.887779235839844, 1409.6820068359375, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-38.88434600830078, 1409.6820068359375, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-46.303524017333984, 1351.478271484375, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(-33.67782211303711, 1377.036865234375, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-33.67782211303711, 1362.51416015625, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-58.958885192871094, 1377.036865234375, -60.03624725341797);
    rotateZ(-9.424778938293457);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-58.958885192871094, 1362.51416015625, -60.03624725341797);
    rotateZ(-9.424778938293457);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-32.340328216552734, 1395.7562255859375, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-32.34033203125, 1346.206298828125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-60.57822036743164, 1395.7562255859375, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-60.57822799682617, 1346.206298828125, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-40.34867858886719, 1063.412109375, -73.00074768066406);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(-40.34867858886719, 1063.412109375, -60.73272705078125);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(-50.54083251953125, 1063.412109375, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(-30.162551879882812, 1063.412109375, -61.03003692626953);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(-40.1463623046875, 1047.194091796875, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-40.146358489990234, 1079.586181640625, -61.41576385498047);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-47.73061752319336, 1103.014404296875, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-32.7271842956543, 1103.014404296875, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-40.1463623046875, 1044.810546875, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(-27.520660400390625, 1070.369384765625, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-27.520660400390625, 1055.8466796875, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-52.80172348022461, 1070.369384765625, -60.03624725341797);
    rotateZ(-9.424778938293457);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-52.80172348022461, 1055.8466796875, -60.03624725341797);
    rotateZ(-9.424778938293457);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-26.183162689208984, 1089.088623046875, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-26.183168411254883, 1039.53857421875, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-54.421058654785156, 1089.088623046875, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-54.42106628417969, 1039.53857421875, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-47.73061752319336, 1025.195556640625, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-32.7271842956543, 1025.195556640625, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-53.887779235839844, 1331.045166015625, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-38.88434600830078, 1331.045166015625, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-4.166260719299316, 440.7915954589844, -73.00074768066406);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(-4.166260719299316, 440.7915954589844, -60.73272705078125);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(22.69013786315918, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(-14.358410835266113, 440.7915954589844, -61.03003692626953);
    rotateZ(-3.1415929794311523);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(6.019867897033691, 440.7915954589844, -61.03003692626953);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.192177772521973, 30.8957462310791);
    pop();

    push();
    translate(-3.963944435119629, 424.5736999511719, -61.41576385498047);
    rotateZ(-7.853982925415039);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-3.9639406204223633, 456.9656677246094, -61.41576385498047);
    rotateZ(-10.995575904846191);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-11.548199653625488, 480.3940124511719, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(3.455233573913574, 480.3940124511719, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(-3.963944435119629, 422.1901550292969, -60.47285461425781);
    rotateZ(-14.137168884277344);
    rotateY(-0.41927194595336914);
    rotateX(1.5707964543017108);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(8.661759376525879, 447.7488708496094, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(8.661757469177246, 433.2261657714844, -60.03624725341797);
    rotateZ(-6.283185958862305);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-16.619304656982422, 447.7488708496094, -60.03624725341797);
    rotateZ(-9.424778938293457);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-16.619304656982422, 433.2261657714844, -60.03624725341797);
    rotateZ(-9.424778938293457);
    rotateY(-0.17522086203098297);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(9.999255180358887, 466.4682312011719, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(9.999251365661621, 416.9181823730469, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-18.23863983154297, 466.4682312011719, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-18.238643646240234, 416.9181823730469, -78.54084014892578);
    rotateZ(-0.0);
    rotateY(-1.570796251296997);
    rotateX(-1.5707966544311522);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(5.598690509796143, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-11.548199653625488, 401.7151184082031, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    push();
    translate(3.455233573913574, 401.7151184082031, -71.19406127929688);
    rotateZ(-3.1415929794311523);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100782632827759, 24, 1, true, true);
    pop();

    //%%cars_right%%
  pop();

  push();
    clamped = min(200, max(-200, xDisplacement));
    // zRotation = (50 - Math.abs(clamped)) / 50;
    translate(clamped / 8, (frameCount % clipDuration) * 5 - 600, 0);
    // rotateZ(zRotation);
    push();
    translate(-33.31788635253906, 728.9630126953125, -73.50198364257812);
    rotateZ(-3.1360936164855957);
    rotateY(0.002511183498427272);
    rotateX(1.5813549506831885);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(27.525163650512695, 13.221394538879395, 77.77368927001953);
    pop();

    push();
    translate(-33.34941864013672, 729.09228515625, -61.23469543457031);
    rotateZ(-3.1360936164855957);
    rotateY(0.002511183498427272);
    rotateX(1.5813549506831885);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(22.690135955810547, 14.192180633544922, 30.8957462310791);
    pop();

    push();
    translate(-43.540611267089844, 729.0331420898438, -61.55758285522461);
    rotateZ(-3.1379616260528564);
    rotateY(-0.17269980907440186);
    rotateX(1.5815143456105114);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(-23.162715911865234, 729.1452026367188, -61.50640869140625);
    rotateZ(-6.275816440582275);
    rotateY(-0.17772218585014343);
    rotateX(1.5600687620583893);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.192179679870605, 30.8957462310791);
    pop();

    push();
    translate(-33.056583404541016, 712.869384765625, -61.745948791503906);
    rotateZ(-7.849634647369385);
    rotateY(-0.4298292100429535);
    rotateX(1.5735589432418318);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-33.23386764526367, 745.2591552734375, -62.08795928955078);
    rotateZ(-10.98898983001709);
    rotateY(-0.40871191024780273);
    rotateX(1.5680598473530234);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    box(4.855676174163818, 14.722347259521484, 22.86030387878418);
    pop();

    push();
    translate(-40.92108154296875, 768.5409545898438, -72.132080078125);
    rotateZ(-3.1360936164855957);
    rotateY(0.002511183498427272);
    rotateX(3.1521513007003783);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100783824920654, 24, 1, true, true);
    pop();

    push();
    translate(-25.917932510375977, 768.6234130859375, -72.09439849853516);
    rotateZ(-3.1360936164855957);
    rotateY(0.002511183498427272);
    rotateX(3.1521513007003783);
    fill(255.0, 255.0, 255.0);
    cylinder(1.7007977962493896, 1.8100783824920654, 24, 1, true, true);
    pop();

    push();
    translate(-33.04595947265625, 710.4959106445312, -60.77792739868164);
    rotateZ(-14.132822036743164);
    rotateY(-0.4298292398452759);
    rotateX(1.5735589471999527);
    fill(255.0, 255.0, 255.0);
    box(0.6378598213195801, 12.713203430175781, 19.740581512451172);
    pop();

    push();
    translate(-20.561492919921875, 736.1270141601562, -60.57950210571289);
    rotateZ(-6.275816440582275);
    rotateY(-0.17772218585014343);
    rotateX(1.5600687620583893);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-20.482011795043945, 721.6053466796875, -60.42616653442383);
    rotateZ(-6.275816440582275);
    rotateY(-0.17772218585014343);
    rotateX(1.5600687620583893);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-45.84210205078125, 735.9879760742188, -60.64298629760742);
    rotateZ(-9.421148300170898);
    rotateY(-0.17269982397556305);
    rotateX(1.5815144014898659);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-45.76261901855469, 721.4662475585938, -60.48965072631836);
    rotateZ(-9.421148300170898);
    rotateY(-0.17269982397556305);
    rotateX(1.5815144014898659);
    fill(255.0, 255.0, 255.0);
    box(0.4978686273097992, 10.02738094329834, 9.723295211791992);
    pop();

    push();
    translate(-19.27893829345703, 754.6571655273438, -79.27729034423828);
    rotateZ(-1.3318159580230713);
    rotateY(-1.5816494226455688);
    rotateX(-0.2334944464843749);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690986633301, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-19.00775718688965, 705.110595703125, -78.75411987304688);
    rotateZ(-1.3318159580230713);
    rotateY(-1.5816494226455688);
    rotateX(-0.2334944464843749);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690986633301, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-47.51632308959961, 754.5018920898438, -79.34819793701172);
    rotateZ(-1.3318159580230713);
    rotateY(-1.5816494226455688);
    rotateX(-0.2334944464843749);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690986633301, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-47.245121002197266, 704.955322265625, -78.82503509521484);
    rotateZ(-1.3318159580230713);
    rotateY(-1.5816494226455688);
    rotateX(-0.2334944464843749);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(5.598690986633301, 2.8385844230651855, 24, 1, true, true);
    pop();

    push();
    translate(-40.49345016479492, 690.4100952148438, -71.30708312988281);
    rotateZ(-3.1360936164855957);
    rotateY(0.002511183498427272);
    rotateX(3.1521513007003783);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100783824920654, 24, 1, true, true);
    pop();

    push();
    translate(-25.490306854248047, 690.4925537109375, -71.26940155029297);
    rotateZ(-3.1360936164855957);
    rotateY(0.002511183498427272);
    rotateX(3.1521513007003783);
    fill(165.75136184692383, 28.34533330053091, 18.352048136293888);
    cylinder(1.7007977962493896, 1.8100783824920654, 24, 1, true, true);
    pop();

    //%%car_turning%%
  pop();

  // draw the trees
  for (let i = 0; i < treeRotations.length; i++) {
    push();
    translate(100 * Math.pow(-1, i), 370 + 200 * Math.floor(i / 2), -85);
    rotateZ(treeRotations[i]);
    push();
    translate(0.19250106811523438, -1.2826881408691406, 42.33486557006836);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(4.555592060089111, 81.32908630371094, 24, 1, true, true);
    pop();

    push();
    translate(-3.2247352600097656, -1.7634315490722656, 89.4761962890625);
    rotateZ(-0.0);
    rotateY(-0.40305912494659424);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(4.555591583251953, 18.120800018310547, 24, 1, true, true);
    pop();

    push();
    translate(-7.821202278137207, -1.7584118843078613, 111.54295349121094);
    rotateZ(0.007902846671640873);
    rotateY(-0.08739691227674484);
    rotateX(1.5414561267364741);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(4.555591106414795, 30.434171676635742, 24, 1, true, true);
    pop();

    push();
    translate(-13.213741302490234, -1.7634315490722656, 143.31829833984375);
    rotateZ(-0.0);
    rotateY(-0.221976175904274);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(4.555591583251953, 37.2637825012207, 24, 1, true, true);
    pop();

    push();
    translate(-17.224674224853516, -1.8406105041503906, 166.73309326171875);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(4.555592060089111, 13.54929256439209, 24, 1, true, true);
    pop();

    push();
    translate(-9.383243560791016, -1.7634315490722656, 164.70639038085938);
    rotateZ(-3.1415932178497314);
    rotateY(-0.5637689232826233);
    rotateX(1.570796454210065);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(3.1459527015686035, 25.733230590820312, 24, 1, true, true);
    pop();

    push();
    translate(-1.3854866027832031, -1.7634315490722656, 181.66653442382812);
    rotateZ(-3.1415932178497314);
    rotateY(-0.21905125677585602);
    rotateX(1.5707962588611049);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.900758981704712, 15.065367698669434, 24, 1, true, true);
    pop();

    push();
    translate(1.6569480895996094, -0.7100868225097656, 193.59075927734375);
    rotateZ(-2.670045852661133);
    rotateY(-0.33563756942749023);
    rotateX(1.5957126013357164);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.570622205734253, 15.065366744995117, 24, 1, true, true);
    pop();

    push();
    translate(5.192333221435547, 1.5131797790527344, 206.25405883789062);
    rotateZ(-2.670045852661133);
    rotateY(-0.33563756942749023);
    rotateX(1.5957126013357164);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.3587586879730225, 13.823722839355469, 24, 1, true, true);
    pop();

    push();
    translate(10.369556427001953, 3.1798667907714844, 215.90147399902344);
    rotateZ(-2.637070655822754);
    rotateY(-0.7204557657241821);
    rotateX(1.3853133014757157);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.060850143432617, 12.077803611755371, 24, 1, true, true);
    pop();

    push();
    translate(15.377986907958984, 4.604183197021484, 223.537353515625);
    rotateZ(-2.5967464447021484);
    rotateY(-0.4072175920009613);
    rotateX(1.5286893985588075);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(1.4909312725067139, 8.737740516662598, 24, 1, true, true);
    pop();

    push();
    translate(-16.569446563720703, -2.0483741760253906, 185.44091796875);
    rotateZ(-0.006118266377598047);
    rotateY(0.06996799260377884);
    rotateX(1.5897191233355523);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(4.074675559997559, 27.26007080078125, 24, 1, true, true);
    pop();

    push();
    translate(-14.630374908447266, -2.7228736877441406, 206.37826538085938);
    rotateZ(-0.008803952485322952);
    rotateY(0.1489696502685547);
    rotateX(1.6124607949871541);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(3.5211598873138428, 16.612865447998047, 24, 1, true, true);
    pop();

    push();
    translate(-12.592044830322266, -3.3333473205566406, 220.95286560058594);
    rotateZ(-0.002698981435969472);
    rotateY(0.0977158173918724);
    rotateX(1.6123972564358235);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.7177188396453857, 14.800676345825195, 24, 1, true, true);
    pop();

    push();
    translate(-11.745494842529297, -3.1789894104003906, 233.30770874023438);
    rotateZ(0.014321763999760151);
    rotateY(0.027539417147636414);
    rotateX(1.6129702768642427);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.3165841102600098, 13.920936584472656, 24, 1, true, true);
    pop();

    push();
    translate(-15.23086929321289, -9.008731842041016, 213.33892822265625);
    rotateZ(-0.015583690255880356);
    rotateY(-0.16068525612354279);
    rotateX(2.34105725506134);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.7177188396453857, 14.800676345825195, 24, 1, true, true);
    pop();

    push();
    translate(-16.308391571044922, -15.383211135864258, 222.77896118164062);
    rotateZ(-0.0032263905741274357);
    rotateY(-0.044179800897836685);
    rotateX(1.9347618065196992);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.037006139755249, 11.09351921081543, 24, 1, true, true);
    pop();

    push();
    translate(-16.288890838623047, -17.559999465942383, 231.48220825195312);
    rotateZ(-0.059575099498033524);
    rotateY(0.07501929998397827);
    rotateX(1.6268544524330617);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(1.6328462362289429, 8.89246654510498, 24, 1, true, true);
    pop();

    push();
    translate(-18.966144561767578, 6.007839202880859, 198.74359130859375);
    rotateZ(0.8553736805915833);
    rotateY(0.3290746212005615);
    rotateX(1.1239356837589265);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(3.521160364151001, 31.69331932067871, 24, 1, true, true);
    pop();

    push();
    translate(-21.556644439697266, 15.46072006225586, 217.3502197265625);
    rotateZ(0.9094361662864685);
    rotateY(0.21389555931091309);
    rotateX(1.31342504838295);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.579990863800049, 14.676132202148438, 24, 1, true, true);
    pop();

    push();
    translate(-22.254016876220703, 18.12673568725586, 228.6562957763672);
    rotateZ(0.9448910355567932);
    rotateY(0.05888302996754646);
    rotateX(1.5315108291227342);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.066779375076294, 11.756758689880371, 24, 1, true, true);
    pop();

    push();
    translate(-24.054271697998047, 9.474910736083984, 205.556640625);
    rotateZ(0.9974372982978821);
    rotateY(-0.24630139768123627);
    rotateX(0.8521943233329774);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.579990863800049, 14.676133155822754, 24, 1, true, true);
    pop();

    push();
    translate(-33.66181564331055, 11.67947006225586, 213.5768280029297);
    rotateZ(1.1271573305130005);
    rotateY(-0.3962286412715912);
    rotateX(0.5923323772270204);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.579990863800049, 14.67613410949707, 24, 1, true, true);
    pop();

    push();
    translate(-41.90133285522461, 12.666255950927734, 222.82681274414062);
    rotateZ(0.7319195866584778);
    rotateY(-0.4062857925891876);
    rotateX(1.2913374147731782);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.579990863800049, 14.676133155822754, 24, 1, true, true);
    pop();

    push();
    translate(-23.333362579345703, -4.621097564697266, 186.34375);
    rotateZ(-1.027656078338623);
    rotateY(-0.16068525612354279);
    rotateX(2.34105725506134);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.7177186012268066, 14.800676345825195, 24, 1, true, true);
    pop();

    push();
    translate(-30.05477523803711, -6.533084869384766, 195.1596221923828);
    rotateZ(-1.0217044353485107);
    rotateY(-0.13724477589130402);
    rotateX(1.9775969229061128);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(2.336662530899048, 10.107324600219727, 24, 1, true, true);
    pop();

    push();
    translate(-32.692501068115234, -7.035465240478516, 203.2272186279297);
    rotateZ(-1.0014904737472534);
    rotateY(-0.028244853019714355);
    rotateX(1.7891119114477159);
    fill(225.14545798301697, 78.76693099737167, 13.129665367305279);
    cylinder(1.7826794385910034, 7.711050033569336, 24, 1, true, true);
    pop();

    push();
    translate(-12.405744552612305, 1.2777063846588135, 256.58428955078125);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(0.0);
    fill(40.56992143392563, 79.91155117750168, 39.583574160933495);
    ellipsoid(45.4515495300293, 45.451534271240234, 45.451576232910156, 24, 24);
    pop();

    //%%tree%%
    pop();
  }

  // draw the trash cans
  for (let i = 0; i < trashPositions.length; i++) {
    push();
    translate(trashPositions[i].x, trashPositions[i].y, trashPositions[i].z);
    rotateZ(trashRotations[i]);
    push();
    translate(3.8881754875183105, 0.0, 13.186553955078125);
    rotateZ(-0.0);
    rotateY(0.0);
    rotateX(3.1415926955062865);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    cylinder(0.7417541146278381, 9.67861270904541, 24, 1, true, true);
    pop();

    push();
    translate(-0.6858542561531067, 0.0, 6.090090751647949);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(8.304886817932129, 13.731183052062988, 8.304886817932129);
    pop();

    push();
    translate(-0.8432514071464539, 0.0, 13.40626335144043);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(200.7868194580078, 174.72713381052017, 61.93194955587387);
    box(8.645040512084961, 0.983435869216919, 9.078570365905762);
    pop();

    //%%trash%%
    pop();
  }

  // draw the houses
  push();
  translate(0, 2500, -85);
  scale(scaleHouses);
    push();
    translate(-0.0, 2.904684066772461, 17.38353729248047);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(38.53596115112305, 38.53596115112305, 38.53596115112305);
    pop();

    push();
    translate(-0.0, 2.904684066772461, 36.22612762451172);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(27.216646194458008, 27.216646194458008, 36.26642608642578);
    pop();

    push();
    translate(-0.0, -16.73642921447754, 31.99315643310547);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(6.4261860847473145, 6.4261860847473145, 0.8690136671066284);
    pop();

    push();
    translate(12.051023483276367, 2.904684066772461, 45.084625244140625);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 31.5500545501709, 35.6360969543457);
    pop();

    push();
    translate(-11.121149063110352, 2.904684066772461, 45.990447998046875);
    rotateZ(-3.1415929794311523);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 33.956241607666016, 35.6360969543457);
    pop();

    push();
    translate(38.737117767333984, 2.904684066772461, 17.38353729248047);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(38.53596115112305, 38.53596115112305, 38.53596115112305);
    pop();

    push();
    translate(38.737117767333984, 2.904684066772461, 36.22612762451172);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(27.216646194458008, 27.216646194458008, 36.26642608642578);
    pop();

    push();
    translate(38.737117767333984, -16.73642921447754, 31.99315643310547);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(6.4261860847473145, 6.4261860847473145, 0.8690136671066284);
    pop();

    push();
    translate(50.78813934326172, 2.904684066772461, 45.084625244140625);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 31.5500545501709, 35.6360969543457);
    pop();

    push();
    translate(27.615968704223633, 2.904684066772461, 45.990447998046875);
    rotateZ(-3.1415929794311523);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 33.956241607666016, 35.6360969543457);
    pop();

    push();
    translate(-38.98531723022461, 2.904684066772461, 17.38353729248047);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(38.53596115112305, 38.53596115112305, 38.53596115112305);
    pop();

    push();
    translate(-38.98531723022461, 2.904684066772461, 36.22612762451172);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(27.216646194458008, 27.216646194458008, 36.26642608642578);
    pop();

    push();
    translate(-38.98531723022461, -16.73642921447754, 31.99315643310547);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(6.4261860847473145, 6.4261860847473145, 0.8690136671066284);
    pop();

    push();
    translate(-26.934295654296875, 2.904684066772461, 45.084625244140625);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 31.5500545501709, 35.6360969543457);
    pop();

    push();
    translate(-50.106468200683594, 2.904684066772461, 45.990447998046875);
    rotateZ(-3.1415929794311523);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 33.956241607666016, 35.6360969543457);
    pop();

    push();
    translate(77.35995483398438, 2.904684066772461, 17.38353729248047);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(38.53596115112305, 38.53596115112305, 38.53596115112305);
    pop();

    push();
    translate(77.35995483398438, 2.904684066772461, 36.22612762451172);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(27.216646194458008, 27.216646194458008, 36.26642608642578);
    pop();

    push();
    translate(77.35995483398438, -16.73642921447754, 31.99315643310547);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(6.4261860847473145, 6.4261860847473145, 0.8690136671066284);
    pop();

    push();
    translate(89.41097259521484, 2.904684066772461, 45.084625244140625);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 31.5500545501709, 35.6360969543457);
    pop();

    push();
    translate(66.23880004882812, 2.904684066772461, 45.990447998046875);
    rotateZ(-3.1415929794311523);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 33.956241607666016, 35.6360969543457);
    pop();

    push();
    translate(-77.83767700195312, 2.904684066772461, 17.38353729248047);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(38.53596115112305, 38.53596115112305, 38.53596115112305);
    pop();

    push();
    translate(-77.83767700195312, 2.904684066772461, 36.22612762451172);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(27.216646194458008, 27.216646194458008, 36.26642608642578);
    pop();

    push();
    translate(-77.83767700195312, -16.73642921447754, 31.99315643310547);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(6.4261860847473145, 6.4261860847473145, 0.8690136671066284);
    pop();

    push();
    translate(-65.78665924072266, 2.904684066772461, 45.084625244140625);
    rotateZ(-0.0);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 31.5500545501709, 35.6360969543457);
    pop();

    push();
    translate(-88.95883178710938, 2.904684066772461, 45.990447998046875);
    rotateZ(-3.1415929794311523);
    rotateY(-0.7853981852531433);
    rotateX(1.570796325);
    fill(49.209992811083794, 92.33493134379387, 171.831157207489);
    box(2.5274341106414795, 33.956241607666016, 35.6360969543457);
    pop();

    push();
    translate(-0.0, -16.73642921447754, 9.434762001037598);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(255.0, 255.0, 255.0);
    box(9.159717559814453, 18.381519317626953, 1.2386693954467773);
    pop();

    push();
    translate(59.16144561767578, 2.904684066772461, 57.90223693847656);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(10.9976167678833, 49.97641372680664, 10.9976167678833);
    pop();

    push();
    translate(-58.194854736328125, 2.904684066772461, 57.90223693847656);
    rotateZ(-0.0);
    rotateY(-0.0);
    rotateX(1.570796325);
    fill(156.87025040388107, 130.36881566047668, 15.167249981313944);
    box(10.9976167678833, 49.97641372680664, 10.9976167678833);
    pop();

    //%%scaleable%%
  pop();

}
