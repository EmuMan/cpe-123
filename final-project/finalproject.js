// Starting code for Lab 4 - Generative Art
// This should be your organic sketch

let cameraDistance = 100;
let cameraSpeed = 1 / 360;

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
      this.trunk = new Branch(20, 2, new p5.Vector());
   }

   drawMesh(instance) {
      this.trunk.drawRecursive(instance);
   }

   generateBranches() {
      this._branchRecursive(0, this.trunk);
   }

   _branchRecursive(depth, currentBranch) {
      if (depth == 4) return;

      let branchChance = 75; // percent chance that a branch will form every attempt
      let maxBranches = 3;
      let rotationFactor = Math.PI / 4;

      let branchCount = 0;
      let rotations = [];

      while ((Math.random() * 100 < branchChance && branchCount < maxBranches) || (depth < 3 && branchCount < 1)) {
         for (let i = 0; i < 3; i++) {
            rotations.push(i != 1 ? Math.random() * rotationFactor * 2 - rotationFactor : 0);
         }
         let rotation = new p5.Vector(rotations[0], rotations[1], rotations[2]);
         let length = currentBranch.length * (Math.random() * 0.2 + 0.7);
         let newBranch = new Branch(length, currentBranch.radius * 0.8, rotation);
         currentBranch.addChild(newBranch);
         this._branchRecursive(depth + 1, newBranch);
         branchCount += 1;
         rotations.splice(0, rotations.length);
      }
   }

}

let sketch = function(p) {

   let ground;
   let tree;

   p.setup = function() {
      let cameraPos = p.createVector(0, 0, cameraDistance);
      let cameraUp = p.createVector(0, -1, 0);
      let cameraFacing = p.createVector(0, 0, 0);
      sceneCamera = new P5Camera('main_camera', cameraPos, cameraUp, cameraFacing);

      ground = new P5Sphere('ground', p.createVector(0, -130, 0), p.createVector(0, 0, 0), p.createVector(1, 1, 1), p.color(40, 181, 70), 100);
      ground.setDetail(64);

      let treePos = p.createVector(0, -30, 0);
      tree = new Tree('tree', treePos, p.createVector(0, 0, 0), p.createVector(1, 1, 1), p.color(100, 60, 20));
      tree.generateBranches(0, tree.trunk);

      p.pixelDensity(1);
      p.createCanvas(400, 400, p.WEBGL);
      p.noStroke();
   };
   
   p.draw = function() {
      let cameraPos = p.createVector(0, 0, cameraDistance);
      rotateVector(cameraPos, p.createVector(0, -p.frameCount * cameraSpeed, 0));
      sceneCamera.location = cameraPos;

      p.ambientLight(165, 165, 165);
      p.directionalLight(p.color(255, 255, 255), p.createVector(1, 0, -1))

      sceneCamera.addToScene(p);

      p.background(44, 184, 216);

      ground.addToScene(p);

      tree.addToScene(p);
   };

};


let instance = new p5(sketch);
