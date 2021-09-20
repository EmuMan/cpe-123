let img;

class Vector3 {

   constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
   }

   normalize() {
      let l = this.length
      this.x /= l;
      this.y /= l;
      this.z /= l;
   }

   get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
   }

}


function toRadians(x) {
   return x * Math.PI / 180;
}

function rotateVector() {

}

function setup() {
   createCanvas(710, 400, WEBGL);
 }
 
 function draw() {
   background(200);
   
   ambientLight(60, 60, 60);
   pointLight(255, 255, 255, 0, -100, 0);

   noStroke()
 
   translate(0, 0, 0);
   push();
   // rotateZ(frameCount * 0.01);
   // rotateX(frameCount * 0.01);
   // rotateY(frameCount * 0.01);
   rotateX(toRadians(90));
   ambientMaterial(250);
   torus(70, 24, 16);
   pop();
 
   translate(0, -10, 0);
   push();
   rotateX(toRadians(90));
   fill(220, 160, 160);
   torus(70, 24, 16);
   pop();

 }
