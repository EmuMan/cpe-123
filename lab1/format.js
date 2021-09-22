class Vector3 {

   constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

}

let rain;

function setup() {
   createCanvas(710, 400, WEBGL);
   rain = [];
 }
 
 function draw() {
    
   background(0);
   
   ambientLight(60, 60, 60);

   stroke(255, 255, 255);

   for (let i = 0; i < 7; i++) {
      rain.push(new Vector3(Math.random() * 500 - 250, -600, -Math.random() * 1000 + 200))
   }
   
   let toRemove = [];
   for (let i = 0; i < rain.length; i++) {
      if (rain[i].y > 200) {
         toRemove.push(i);
         continue;
      }
      rain[i].y += 15;
      push();
      translate(rain[i].x, rain[i].y, rain[i].z);
      fill(255, 255, 255)
      box(0.2, 10, 0.2);
      pop();
   }

   for (let i = 0; i < toRemove.length; i++) {
      rain.shift();
   }

   //%%code%%

 }
