// Starting code for Lab 4 - Generative Art
// This should be your organic sketch

class Branch {

   length;
   radius;
   rotation;
   children;

   constructor(length, radius, rotation) {
      this.length = length;
      this.radius = radius;
      this.rotation = rotation;
      this.children = [];
   }

   addChild(child) {
      this.children.push(child);
   }

   drawRecursive(instance) {
      instance.push();
         instance.rotateZ(this.rotation.z);
         instance.rotateY(this.rotation.y);
         instance.rotateX(this.rotation.x);
         instance.translate(0, this.length / 2, 0);
         instance.cylinder(this.radius, this.length);
         instance.translate(0, this.length / 2, 0);
         for (let i = 0; i < this.children.length; i++) {
            this.children[i].drawRecursive(instance);
         }
      instance.pop();
   }

}

class Tree extends P5Mesh {
   
   trunk;
   leaves;
   fallingLeaves;

   constructor(name, location, rotation, scale, color) {
      super(name, location, rotation, scale, color);
      this.leaves = [];
      this.fallingLeaves = [];
   }

   addLeaf(leaf) {
      this.leaves.push(leaf);
   }

   spawnFallingLeaf(vel, accel, ground) {
      while (this.fallingLeaves.length >= 50) {
         this.fallingLeaves.shift();
      }
      let leaf = this.leaves[Math.floor(Math.random() * this.leaves.length)];
      this.fallingLeaves.push(new FallingLeaf('falling', this, leaf, vel, accel, ground));
   }

   drawMesh(instance) {
      this.trunk.drawRecursive(instance);
      for (let i = 0; i < this.leaves.length; i++) {
         this.leaves[i].addToScene(instance);
      }
      for (let i = 0; i < this.fallingLeaves.length; i++) {
         this.fallingLeaves[i].addToScene(instance);
      }
   }

   update() {
      for (let i = 0; i < this.fallingLeaves.length; i++) {
         this.fallingLeaves[i].update();
      }
   }

}

class FallingLeaf extends P5Sphere {

   vel;
   accel;
   maxVel;
   ground;
   tree;

   constructor(name, tree, original, vel, accel, groundSphere) {
      let scale = original.scale.copy();
      scale.mult(1 / 2);
      super(name, original.location.copy(), original.rotation.copy(), scale, original.color, original.radius);
      this.vel = vel;
      this.accel = accel;
      this.maxVel = 0.5;
      this.ground = groundSphere; // for collisions
      this.tree = tree;
      this.setDetail(4);
   }

   update() {
      if (this.testCollision()) return; // incredibly janky, but i think the leaves are falling slowly enough for it to not matter

      this.vel.add(this.accel);
      if (Math.abs(this.vel.y) > this.maxVel) {
         this.vel.y = this.maxVel * Math.sign(this.vel.y);
      }
      this.location.add(this.vel);
   }

   testCollision() {
      let dist = this.ground.location.copy();
      dist.sub(this.tree.location);
      dist.sub(this.location);
      let r2 = this.ground.radius * this.ground.radius;
      if (dist.magSq() <= r2) {
         return true;
      }
      return false;
   }

}

let sketch = function(p) {

   let ground;
   let tree;

   let leafWind = 0.2;
   
   let cloudCount = 150;
   let cloudsRadius = 100;
   let cloudSize = 25;

   function rotateVector(v, r) {
      // because apparently p5 doesn't natively provide this functionality for 3d vectors...
      // luckily, we can use a short - albeit fairly inefficient - trick to extend the 2d rotation into a 3rd dimension,
      // by simply performing it for every axis required (in xyz format) (trust me it works, i think)
      let tempR;
      //*
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
      /*/
      // more intuitive version

      tempR = p.createVector(v.y, v.z);
      tempR.rotate(r.x);
      v.y = tempR.x;
      v.z = tempR.y;

      tempR = p.createVector(v.x, v.z);
      tempR.rotate(-r.y);
      v.x = tempR.x;
      v.z = tempR.y;
      
      tempR = p.createVector(v.x, v.y);
      tempR.rotate(r.z);
      v.x = tempR.x;
      v.y = tempR.y;
      //*/

   }

   function generateBranches(tree, depth, currentBranch, currentVector, currentPosition) {

      let newPosition = currentPosition.copy();
      newPosition.add(currentVector);

      if (depth > 1) {
         // This is not actually entirely accurate. I believe it has something to do with relative rotations and spaces, and
         // theoretically it's fixable but that's not really practical here. Basically, it's close enough.
         for (let i = 0; i < currentBranch.length; i++) {
            let displacement = p5.Vector.random3D();
            displacement.mult(currentBranch.length * 0.7);
            displacement.add(newPosition);
            let leaf = new P5Sphere('leaf', displacement, p.createVector(0, 0, 0), p.createVector(1, 1, 1), p.color(255, 173, 243, 200), 3);
            leaf.setDetail(7);
            tree.addLeaf(leaf);
         }
      }
      
      if (depth == 4) return;

      let branchChance = 75; // percent chance that a branch will form every attempt
      let maxBranches = 3;
      let rotationFactor = p.PI / 4;

      let branchCount = 0;
      let rotations = [];

      while ((p.random(0, 100) < branchChance && branchCount < maxBranches) || (depth < 3 && branchCount < 1)) {
         for (let i = 0; i < 3; i++) {
            rotations.push(i != 1 ? p.random(-rotationFactor, rotationFactor) : 0);
         }
         let rotation = p.createVector(rotations[0], rotations[1], rotations[2]);
         let length = currentBranch.length * p.random(0.7, 0.9);
         let newBranch = new Branch(length, currentBranch.radius * 0.8, rotation);
         currentBranch.addChild(newBranch);
         let newVector = currentVector.copy();
         newVector.setMag(newBranch.length);
         rotateVector(newVector, rotation);
         generateBranches(tree, depth + 1, newBranch, newVector, newPosition);
         branchCount += 1;
         rotations.splice(0, rotations.length); // clear array
      }
   }

   function circularNoise(noiseScale, offset, time) {
      // this is supposed to interpolate between the ends of a circle. i think it works?
      let baseNoise = p.noise(noiseScale * offset, time);
      let threshold = (7 / 4) * p.PI;
      if (offset > threshold) {
         let localized = offset - threshold;
         let normalized = localized / (2 * p.PI - threshold);
         let altNoise = p.noise(noiseScale * (localized - (2 * p.PI - threshold)), time);
         baseNoise = (1 - normalized) * baseNoise + normalized * altNoise;
      }
      return baseNoise;
   }

   p.setup = function() {
      let cameraPos = p.createVector(0, 0, 100);
      let cameraUp = p.createVector(0, -1, 0);
      let cameraFacing = p.createVector(0, 0, 0);
      sceneCamera = new P5Camera('main_camera', cameraPos, cameraUp, cameraFacing);

      ground = new P5Sphere('ground', p.createVector(0, -130, 0), p.createVector(0, 0, 0), p.createVector(1, 1, 1), p.color(40, 181, 70), 100);
      ground.setDetail(64);

      let treePos = p.createVector(0, -30, 0);
      let treeSize = 20;
      tree = new Tree('tree', treePos, p.createVector(0, 0, 0), p.createVector(1, 1, 1), p.color(100, 60, 20));
      tree.trunk = new Branch(treeSize, 2, p.createVector(0, 0, 0));
      generateBranches(tree, 0, tree.trunk, p.createVector(0, treeSize, 0), p.createVector(0, 0, 0));

      p.pixelDensity(1);
      p.createCanvas(400, 400, p.WEBGL);
      p.noStroke();
   };
   
   p.draw = function() {
      let sceneRotation = p.frameCount / 360;
      let lightDirection = p.createVector(1, 0, -1);
      rotateVector(lightDirection, p.createVector(0, sceneRotation, 0));

      p.ambientLight(165, 165, 165);
      p.directionalLight(p.color(255, 255, 255), lightDirection)

      sceneCamera.addToScene(p);

      p.background(44, 184, 216);

      p.rotateY(sceneRotation);

      ground.addToScene(p);

      p.fill(p.color(255, 255, 255, 220));
      for (let i = 0; i < cloudCount; i++) {
         let theta = (i / cloudCount) * (2 * p.PI);
         p.push();
         // lower layer
            p.translate(p.cos(theta) * cloudsRadius, 50, p.sin(theta) * cloudsRadius);
            let r = Math.max((circularNoise(2, theta, p.frameCount / 500) - 0.3) * cloudSize, 0);
            if (r > 1.5) p.sphere(r, 5, 5);
         p.pop();
         p.push();
            // upper layer
            p.translate(p.cos(theta) * cloudsRadius * 0.8, 80, p.sin(theta) * cloudsRadius * 0.8);
            r = Math.max((circularNoise(2, theta, p.frameCount / 500 + 50) - 0.3) * cloudSize, 0);
            if (r > 1.5) p.sphere(r, 5, 5);
         p.pop();
      }

      if (p.frameCount % 20 == 0) {
         tree.spawnFallingLeaf(p.createVector(leafWind, 0, 0), p.createVector(0, -0.01, 0), ground);
      }

      tree.update();
      tree.addToScene(p);
   };

};


let instance = new p5(sketch);