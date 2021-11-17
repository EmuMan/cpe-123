// Starting code for Lab 4 - Generative Art
// This should be your structured sketch

let blockSize = 500;
let blockSpace = 50;
let buildingSpace = 10;

function sum(l) {
   return l.reduce((a, b) => a + b, 0);
}

class Block extends P5Mesh{

   buildings;

   constructor(location, rotation, scale, color) {

      super('block', location, rotation, scale, color);
      this.buildings = [];

      let buildingSizes = [];
      buildingSizes.push(buildingSpace);

      while (sum(buildingSizes) < blockSize) {
         buildingSizes.push(Math.random() * 50 + 50);
         buildingSizes.push(buildingSpace);
      }

      totalLength = sum(buildingSizes);

      bs2 = [...buildingSizes];
      bs2.splice(buildingSizes.length - 2, 2);
      length2 = sum(bs2);

      // totalLength will be greater than blockSize, length2 will be less
      if (totalLength - blockSize > blockSize - length2) {
         totalLength = length2;
         buildingSizes = bs2;
      }

      let scalar = blockSize / totalLength;
      buildingSizes.map(e => e * scalar);

      console.log(buildingSizes);
      console.log(sum(buildingSizes));

      let disp = 0;
      for (let i = 0; i < buildingSizes; i++) {
         if (i % 2 == 0) {
            // this element only describes a space between buildings
            disp += buildingSizes[i];
            continue;
         }
         disp += buildingSizes / 2;
         
         disp += buildingSizes / 2;
      }

   }

   drawMesh() {

   }

}

function setup() 
{
   createCanvas(400, 400);
}

function draw() 
{

}




