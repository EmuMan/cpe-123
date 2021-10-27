// Starting code for Lab 3 - Surrealism
var flowersOn = true;

function setup() 
{
   createCanvas(400, 400); // You may make this larger
}

function draw() 
{
   background('#2C82CB');

   //table?
   fill('#75B2BF');
   noStroke();
   rect(0, 290, 400, 110);

   //stems
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

//show coordinates
   push();
   translate(mouseX, mouseY);
   strokeWeight(1);
   stroke(0);
   line(-10, 0, 10, 0);
   line(0, -10, 0, 10);
   strokeWeight(0);
   fill(0);
   textSize(10);
   text('x: ' + mouseX, 10, 10);
   text('y: ' + mouseY, 40, 10);
   pop();
}

//flowers
function drawFlower(center_x, center_y, sc)
{
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

function mouseClicked()
{
   if (mouseX > 150 && mouseX < 245 && mouseY > 115 && mouseY < 330)
   {
     flowersOn = !flowersOn; 
   }
}