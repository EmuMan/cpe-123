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

  let bookX = -12.8671;

  let flowersOn = true;

  let paintings = {};
  let activePainting;
  let mask;
  

  function drawFlower(center_x, center_y, sc) {
   var cx, cy, t;

   push();
   translate(center_x, center_y);
   scale(sc);

   //draw the center of the flower   
   fill('#D69E25');
   ellipse(0, 0, 100, 100);
   //pick the petal color
   fill('#E4DEE0');
   //draw each petal around the flower   
   t=0;
   for (var i=0; i<13; i++) 
   {      
         
      cx = 0 + 100* cos(t);      
      cy = 0 + 100 * sin(t);      
      ellipse(cx, cy, 90, 90);
       t = t + .5;  
   }
   pop();
  }

  function drawVase(x, y) {
      //stems
      push();
      translate(x, y);
        fill('#355240');
        noStroke();
        beginShape();
        curveVertex(237, 276);
        curveVertex(237, 276);
        curveVertex(204, 82);
        curveVertex(266, 78);
        curveVertex(214, 83);
        curveVertex(207, 179);
        curveVertex(237, 276);
        endShape(CLOSE);
        beginShape();
        curveVertex(174, 250);
        curveVertex(174, 250);
        curveVertex(216, 94);
        curveVertex(272, 151);
        curveVertex(221, 104);
        curveVertex(203, 170);
        curveVertex(174, 250);
        endShape(CLOSE);
        beginShape();
        curveVertex(193, 273);
        curveVertex(193, 273);
        curveVertex(199, 101);
        curveVertex(192, 92);
        curveVertex(157, 138);
        curveVertex(176, 119);
        curveVertex(190, 106);
        curveVertex(204, 170);
        curveVertex(193, 273);
        endShape(CLOSE);
        beginShape();
        curveVertex(220, 259);
        curveVertex(220, 259);
        curveVertex(190, 105);
        curveVertex(177, 89);
        curveVertex(91, 93);
        curveVertex(141, 98);
        curveVertex(177, 105);
        curveVertex(195, 173);
        curveVertex(220, 259);
        endShape(CLOSE);
        beginShape();
        curveVertex(160, 236);
        curveVertex(160, 236);
        curveVertex(198, 76);
        curveVertex(185, 53);
        curveVertex(203, 76);
        curveVertex(188, 163);
        curveVertex(160, 236);
        endShape(CLOSE);

        //vase
        fill(18, 16, 117, 200, 230)
        noStroke();
        ellipse(200, 120, 25, 10);
        ellipse(200, 315, 90, 30);
        fill(44, 114, 168, 170);
        noStroke();
        beginShape();
        curveVertex(245, 320);
        curveVertex(245, 320);
        curveVertex(200, 330);
        curveVertex(155, 310);
        curveVertex(155, 190);
        curveVertex(170, 160);
        curveVertex(188, 120);
        curveVertex(212, 120);
        curveVertex(230, 160);
        curveVertex(245, 190);
        endShape(CLOSE);

        if (flowersOn)
        {
            drawFlower(275, 135, .25);
            drawFlower(160, 50, .3);
            drawFlower(250, 65, .25)
            drawFlower(88, 94, .25);
            drawFlower(157, 145, .3)
        }
        else
        {
            //eggs
            noStroke();
            fill('#E4DEE0');
            beginShape();
            curveVertex(125, 31);
            curveVertex(125, 31);
            curveVertex(169, 12);
            curveVertex(220, 35);
            curveVertex(207, 68);
            curveVertex(164, 85);
            curveVertex(123, 61);
            curveVertex(120, 39);
            endShape(CLOSE);
            beginShape();
            curveVertex(282, 48);
            curveVertex(282, 48);
            curveVertex(225, 60);
            curveVertex(235, 119);
            curveVertex(293, 111);
            curveVertex(314, 87);
            curveVertex(308, 75);
            curveVertex(302, 60);
            endShape(CLOSE);
            beginShape();
            curveVertex(300, 125);
            curveVertex(300, 125);
            curveVertex(295, 164);
            curveVertex(255, 192);
            curveVertex(232, 173);
            curveVertex(243, 152);
            curveVertex(249, 133);
            curveVertex(275, 120);
            endShape(CLOSE);
            beginShape();
            curveVertex(160, 108);
            curveVertex(160, 108);
            curveVertex(201, 115);
            curveVertex(207, 147);
            curveVertex(210, 185);
            curveVertex(152, 182);
            curveVertex(106, 157);
            curveVertex(133, 101);
            endShape(CLOSE);
            beginShape();
            curveVertex(99, 156);
            curveVertex(99, 156);
            curveVertex(122, 99);
            curveVertex(104, 59);
            curveVertex(77, 52);
            curveVertex(66, 76);
            curveVertex(64, 123);
            curveVertex(71, 146);
            endShape(CLOSE);

            noStroke();
            fill('#D69E25');
            push();
            rotate(0.25);
            ellipse(190, 100, 55, 40);
            pop();
            ellipse(170, 50, 50, 40);
            ellipse(92, 99, 35, 45);
            ellipse(270, 86, 45, 35);
            push();
            rotate(0.5);
            ellipse(315, 5, 30, 40);
            pop();
        }
        pop();
  }
  
  function preload() {
    data = loadJSON('scene.json');
    mask = new p5.Image(200, 1);
    mask.loadPixels();
    for (let i = 0; i < mask.width; i++) {
        for (let o = 0; o < mask.height; o++) {
            for (let p = 0; p < 4; p++) {
                mask.pixels[(i + o * mask.width) * 4 + p] = i < mask.width / 2 ? 255 : 0;
            }
        }
    }
    mask.updatePixels();
    paintings['vase'] = loadImage('lab3reference.jpg');
    paintings['book'] = loadImage('book_to_birds.jpg');
  }
  
  function setup() {

    paintings['vase'].mask(mask);
    paintings['book'].mask(mask);
    
    mainScene = [];
    for (let i = 0; i < data['main'].length; i++) {
      mainScene.push(loadObject(data['main'][i]));
    }
    sceneCamera = loadObject(data['camera'][0]);
  
    flyingPages = [];
    staticPages = [];
  
    for (let i = 0; i < 20; i++)
    {
      staticPages.push(new Page("static_page_" + staticPages.length, createVector(bookX, -37, 8 - i / 5), createVector(0, 0, 0), createVector(1, 1, 1), createVector(0, 0, 0), 7))
    }
    pixelDensity(1);
    createCanvas(400, 400, WEBGL);
    noStroke();
  
    ambientLight(255, 255, 255);

    imageMode(CENTER);
  
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

    push();
        translate(7, -40, 50);
        rotateX(-PI/2);
        scale(0.15);
        drawVase(0, 0);
    pop();

    if (activePainting) {
        push();
            painting = paintings[activePainting];
            if (activePainting == 'vase') {
                scale(0.14);
                translate(0, 0, 200);
            } else {
                scale(0.2);
                translate(0, 0, 350)
            }
            rotateX(-PI/2);
            image(painting, 0, 0);
        pop();
    }
  
  }
  
  function mousePressed() {
    // Planning on creating a collision detection system later but this will do for now
    if (mouseY > 250 && mouseY < 300 && mouseX > 145 && mouseX < 330) {
        flyingPages.push(new Page('page_' + flyingPages.length, createVector(bookX, -37, 8), createVector(0, 0, 0), createVector(1, 1, 1), createVector(random(-0.4, 0.8), 1, 1), 10));
        activePainting = 'book';
    } else if (mouseX > 90 && mouseX < 125 && mouseY > 200 && mouseY < 280) {
     flowersOn = !flowersOn; 
     activePainting = 'vase';
    } else {
        activePainting = undefined;
    }

  }