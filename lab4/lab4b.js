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
let buildingDepth = 150;

let starCount = 100;
let starDepth = 2960; // close to the far clipping plane
let starSpread = [4000, 2500];

let cameraSpeed = 300;
let cameraSwing = 0.1;

let songBPM = 140;
let songStates = [
   [0, 0],
   [17 * 4, [4, 2, 2]],
   [33 * 4, [4]],
   [65 * 4, [4, 2, 2]],
   [97 * 4, [4]],
   [113 * 4, 0]
]

let outlineRGB = {};
let skyIntensity;
let outlineIntensity;

let lightpostData;

function sum(l) {
   return l.reduce((a, b) => a + b, 0);
}

class Streetlight extends P5Mesh {

   constructor(name, location, rotation, scale, color, lightColor) {
      super(name, location, rotation, scale, color);
      for (let o = 0; o < lightpostData['streetlight'].length; o++) {
         let obj = loadObject(lightpostData['streetlight'][o], undefined, color);
         obj.outline = obj.name == 'light' ? 0 : 1;
         obj.color = obj.name == 'light' ? lightColor : color;
         this.addChild(obj);
      }
   }

}

class Block extends P5Mesh{

   buildings;
   curbs;
   lightposts;
   ground;

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
            new p5.Vector(buildingDepth, height, buildingSizes[i]),
            1
         ));
         disp += buildingSizes[i] / 2;
      }

      // curbs

      this.curbs.push(new P5Box(
         'curb_front',
         new p5.Vector((isLeft ? 1 : -1) * (buildingDepth / 2 + curbDistance), 0, blockSize / 2),
         new p5.Vector(0, 0, 0),
         new p5.Vector(1, 1, 1),
         color,
         new p5.Vector(curbRadius, curbRadius, blockSize + 2 * curbDistance),
         1
      ));

      for (let i = 0; i < 2; i++) {
         this.curbs.push(new P5Box(
            i == 0 ? 'curb_left' : 'curb_right',
            new p5.Vector(0, 0, i == 0 ? -curbDistance : blockSize + curbDistance),
            new p5.Vector(0, 0, 0),
            new p5.Vector(1, 1, 1),
            color,
            new p5.Vector(buildingDepth + 2 * curbDistance, curbRadius, curbRadius),
            1
         ));
      }

      // lightposts

      let lightpostSpace = blockSize / (lightpostCount - 1); // one on each end, so one less space than lightposts
      let lightpostX = buildingDepth / 2 + curbDistance;
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

      // ground

      this.ground = new P5Plane(
         'ground',
         new p5.Vector(0, 0, blockSize / 2),
         new p5.Vector(Math.PI / 2, 0, 0),
         new p5.Vector(1, 1, 1),
         color,
         new p5.Vector(buildingDepth + 2 * curbDistance, blockSize + 2 * curbDistance)
      );
   }

   drawMesh(instance) {
      this.buildings.forEach(e => e.addToScene(instance));
      this.curbs.forEach(e => e.addToScene(instance));
      this.lightposts.forEach(e => e.addToScene(instance));
      this.ground.addToScene(instance);
   }

}

let sketch = function(p) {
   
   let sceneCamera;
   let cameraSwingProg;

   let blocks;
   let street;
   let stars;

   let song;
   let nextPulse;
   let songStateIndex; // index of the current song state
   let songStateDelayCycle; // index of the current delay within the song state
   let songJustStarted;

   function generateBlockPair(zPos) {
      let x = streetWidth + buildingDepth / 2;
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

   function rotateVector(v, r) {
      let tempR;
      tempR = p.createVector(v.x, v.y);
      tempR.rotate(r.z);
      v.y = tempR.y;
      tempR.y = v.z;
      tempR.rotate(-r.y);
      v.x = tempR.x;
      tempR.x = v.y;
      tempR.rotate(r.x);
      v.y = tempR.x;
      v.z = tempR.y;

   }

   function pulse() {
      outlineRGB = {'r': p.random(50, 255), 'g': 0, 'b': p.random(50, 255)};
      outlineIntensity = 1;
      skyIntensity = 3;
   }

   function updatePulseClock() {
      let beats = (song.currentTime() / 60) * songBPM;

      // songJustStarted fixes a bug where the current time hangs onto the next playthrough for a single frame,
      // causing the songStateIndex to immediately skip to the end when the song starts.
      while (!songJustStarted && songStateIndex + 1 < songStates.length && songStates[songStateIndex + 1][0] < beats) {
         songStateIndex++;
         songStateDelayCycle = 0;
         nextPulse = songStates[songStateIndex][0];
      }
      let ss = songStates[songStateIndex];
      songJustStarted = false;

      if (ss[1] == 0) return;

      if (beats > nextPulse) {
         pulse();
         nextPulse += ss[1][songStateDelayCycle];
         if (++songStateDelayCycle >= ss[1].length) songStateDelayCycle = 0;
      }

   }

   p.preload = function() {
      lightpostData = p.loadJSON('lightpost.json');
      song = p.loadSound('https://emuman.net/static/music/originals/zenith.mp3');
      songJustStarted = false;
   }

   p.setup = function() {
      blocks = [];
      stars = [];
      cameraSwingProg = 0;

      p.createCanvas(400, 400, p.WEBGL);

      outlineRGB = {'r': 0, 'g': 0, 'b': 0};
      skyIntensity = 1;

      let cameraPos = p.createVector(0, 100, -500);
      let cameraUp = p.createVector(0, -1, 0);
      let cameraFacing = p.createVector(0, 100, 0);
      sceneCamera = new P5Camera('main_camera', cameraPos, cameraUp, cameraFacing);

      streetLength = (blockSize + blockSpace) * (blockCount + 1);
      street = new P5Plane(
         'street',
         p.createVector(0, -1, sceneCamera.location.z + (streetLength / 2)),
         p.createVector(p.PI / 2, 0, 0),
         p.createVector(1, 1, 1),
         p.color(30, 30, 30),
         p.createVector(streetWidth + 2 * (buildingDepth + curbDistance), streetLength)
      );

      for (let i = 0; i < starCount; i++) {
         let star = new P5Sphere(
            'star_' + i,
            p.createVector(p.random(-starSpread[0] / 2, starSpread[0] / 2), p.random(0, starSpread[1]), starDepth),
            p.createVector(0, p.PI / 2, 0),
            p.createVector(1, 1, 1),
            p.color(255, 255, 255),
            5
         );
         star.setDetail(2);
         stars.push(star);
      }
   }
   

   p.draw = function() {
                          // bpm to measures per frame (fps changes every frame)
      if (p.frameRate() != 0) cameraSwingProg += ((songBPM / 4) / 60) / p.frameRate();
      let cameraAngle = p.sin(cameraSwingProg * p.PI) * cameraSwing;
      let cameraUp = p.createVector(0, -1, 0);
      rotateVector(cameraUp, p.createVector(0, 0, cameraAngle));    
      sceneCamera.up = cameraUp;
      
      let lightDirection = p.createVector(1, 0, -1);

      p.ambientLight(165, 165, 165);
      p.directionalLight(p.color(255, 255, 255), lightDirection)

      sceneCamera.addToScene(p);

      if (song.isPlaying()) updatePulseClock();

      if (skyIntensity > 1) skyIntensity -= 0.03;
      if (skyIntensity < 1) skyIntensity = 1;
      p.background(p.color(7 * skyIntensity, 0, 30 * skyIntensity));

      if (outlineIntensity > 0) outlineIntensity -= 0.007;
      if (outlineIntensity < 0) outlineIntensity = 0;
      let intensity = outlineIntensity * outlineIntensity; // quadratic for more punch
      p.stroke(outlineRGB.r * intensity, outlineRGB.g * intensity, outlineRGB.b * intensity);

      stars.forEach(e => e.addToScene(p));

      street.addToScene(p);

      while (blocks.length / 2 < blockCount) {
         var location = blocks.length == 0 ? sceneCamera.location.z : blocks[blocks.length - 1].location.z + blockSpace + blockSize;
         generateBlockPair(location);
      }

      let oldBlocks = 0;
      blocks.forEach(block => {
         if (block.location.z < sceneCamera.location.z - blockSize) {
            oldBlocks += 1;
            return;
         }
         block.location.add(p.createVector(0, 0, -cameraSpeed * p.deltaTime / 1000 /*dT is millis*/));
         block.addToScene(p);
      });

      for (let i = 0; i < oldBlocks; i++) {
         // the blocks array is effectively ordered so we can get away with just doing fifo operations
         blocks.shift();
      }
   }

   p.mouseClicked = function() {
      if (!song.isPlaying()) {
         song.play();
         songJustStarted = true;
         cameraSwingProg = 0;
         songStateIndex = 0;
         songStateDelayCycle = 0;
         nextPulse = 0;
      }
   }
   
}

let instance = new p5(sketch);
