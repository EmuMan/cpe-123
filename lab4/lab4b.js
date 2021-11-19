// Starting code for Lab 4 - Generative Art
// This should be your structured sketch

// import { Vector } from './libraries/p5';

let streetWidth = 100;

let blockSize = 750;
let blockCount = 5;
let blockSpace = 175;

let lightpostCount = 5;

let curbDistance = 40;
let curbRadius = 2.5;

let buildingSpace = 15;
let buildingWidth = 150;

let cameraSpeed = 5;

let outlineColor;

let lightpostData;

function sum(l) {
   return l.reduce((a, b) => a + b, 0);
}

class Streetlight extends P5Mesh {

   constructor(name, location, rotation, scale, color, lightColor) {
      super(name, location, rotation, scale, color);
      for (let o = 0; o < lightpostData['streetlight'].length; o++) {
         let obj = loadObject(lightpostData['streetlight'][o], undefined, color);
         obj.color = obj.name == 'light' ? lightColor : color;
         this.addChild(obj);
      }
   }

}

class Block extends P5Mesh{

   buildings;
   curbs;
   lightposts;

   constructor(location, rotation, scale, color, lightColor, isLeft) {

      super('block', location, rotation, scale, color);
      this.buildings = [];
      this.curbs = [];
      this.lightposts = [];

      let buildingSizes = [];
      buildingSizes.push(buildingSpace);

      while (sum(buildingSizes) < blockSize) {
         buildingSizes.push(Math.random() * 50 + 50);
         buildingSizes.push(buildingSpace);
      }

      let totalLength = sum(buildingSizes);

      let bs2 = [...buildingSizes];
      bs2.splice(buildingSizes.length - 2, 2);
      let length2 = sum(bs2);

      // totalLength will be greater than blockSize, length2 will be less
      if (totalLength - blockSize > blockSize - length2) {
         totalLength = length2;
         buildingSizes = bs2;
      }

      let scalar = blockSize / totalLength;
      buildingSizes = buildingSizes.map(e => e * scalar);

      let disp = 0;
      for (let i = 0; i < buildingSizes.length; i++) {
         if (i % 2 == 0) {
            // this element only describes a space between buildings
            disp += buildingSizes[i];
            continue;
         }
         disp += buildingSizes[i] / 2;
         let height = Math.random() * 200 + 150;
         this.buildings.push(new P5Box(
            'building_' + i,
            new p5.Vector(0, height / 2, disp),
            new p5.Vector(0, 0, 0),
            new p5.Vector(1, 1, 1),
            color,
            new p5.Vector(buildingWidth, height, buildingSizes[i])
         ));
         disp += buildingSizes[i] / 2;
      }

      // curbs

      this.curbs.push(new P5Box(
         'curb_front',
         new p5.Vector((isLeft ? 1 : -1) * (buildingWidth / 2 + curbDistance), 0, blockSize / 2),
         new p5.Vector(0, 0, 0),
         new p5.Vector(1, 1, 1),
         color,
         new p5.Vector(curbRadius, curbRadius, blockSize + 2 * curbDistance)
      ));

      for (let i = 0; i < 2; i++) {
         this.curbs.push(new P5Box(
            i == 0 ? 'curb_left' : 'curb_right',
            new p5.Vector(0, 0, i == 0 ? -curbDistance : blockSize + curbDistance),
            new p5.Vector(0, 0, 0),
            new p5.Vector(1, 1, 1),
            color,
            new p5.Vector(buildingWidth + 2 * curbDistance, curbRadius, curbRadius)
         ));
      }

      // lightposts

      let lightpostSpace = blockSize / (lightpostCount - 1); // one on each end, so one less space than lightposts
      let lightpostX = buildingWidth / 2 + curbDistance;
      for (let i = 0; i < lightpostCount; i++) {
         this.lightposts.push(new Streetlight(
            'streetlight',
            new p5.Vector(isLeft ? lightpostX : -lightpostX, 0, i * lightpostSpace),
            new p5.Vector(-Math.PI / 2, isLeft ? Math.PI : 0, 0),
            new p5.Vector(1, 1, 1),
            color,
            lightColor
         ));
      }
   }

   drawMesh(instance) {
      if (outlineColor) instance.stroke(outlineColor);
      this.buildings.forEach(e => e.addToScene(instance));
      this.curbs.forEach(e => e.addToScene(instance));
      instance.noStroke();
      this.lightposts.forEach(e => e.addToScene(instance));
   }

}

let sketch = function(p) {
   
   let sceneCamera;

   let blocks;

   let street;

   function generateBlockPair(zPos) {
      let x = streetWidth + buildingWidth / 2;
      for (let i = 0; i < 2; i++) {
         blocks.push(new Block(
            p.createVector(i == 0 ? -x : x, 0, zPos),
            p.createVector(),
            p.createVector(1, 1, 1),
            p.color(50, 50, 50),
            p.color(255, 255, 0, 50),
            i == 0
         ));
      }
   }

   p.preload = function() {
      lightpostData = p.loadJSON('lightpost.json');
   }

   p.setup = function() {
      blocks = [];

      p.createCanvas(400, 400, p.WEBGL);

      outlineColor = p.color(125, 175, 255);

      let cameraPos = p.createVector(0, 100, -500);
      let cameraUp = p.createVector(0, -1, 0);
      let cameraFacing = p.createVector(0, 100, 0);
      sceneCamera = new P5Camera('main_camera', cameraPos, cameraUp, cameraFacing);

      streetLength = (blockSize + blockSpace) * (blockCount + 1);
      street = new P5Plane(
         'street',
         p.createVector(0, 0, sceneCamera.location.z + (streetLength / 2)),
         p.createVector(p.PI / 2, 0, 0),
         p.createVector(1, 1, 1),
         p.color(30, 30, 30),
         p.createVector(streetWidth + 2 * (buildingWidth + curbDistance), streetLength)
      );
   }
   

   p.draw = function() {
      let sceneRotation = p.frameCount / 360;
      let lightDirection = p.createVector(1, 0, -1);

      p.ambientLight(165, 165, 165);
      p.directionalLight(p.color(255, 255, 255), lightDirection)

      sceneCamera.addToScene(p);

      p.background(44, 184, 216);

      street.addToScene(p);

      while (blocks.length / 2 < blockCount) {
         var location = blocks.length == 0 ? sceneCamera.location.z : blocks[blocks.length - 1].location.z + blockSpace + blockSize;
         generateBlockPair(location);
      }

      let oldBlocks = 0;
      for (let i = 0; i < blocks.length; i++) {
         if (blocks[i].location.z < sceneCamera.location.z - blockSize) {
            oldBlocks += 1;
            continue;
         }
         blocks[i].location.add(p.createVector(0, 0, -cameraSpeed));
         blocks[i].addToScene(p);
      }

      for (let i = 0; i < oldBlocks; i++) {
         // the blocks array is effectively ordered so we can get away with just doing fifo operations
         blocks.shift();
      }
   }
   
}

let instance = new p5(sketch);
