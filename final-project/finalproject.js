const maxMovementSpeed = 80;
const movementAccel = 350;

const cameraSensitivity = 0.001;
const cameraYawThreshold = 0.1;

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

   let canvas;

   p.setup = function() {
      p.pixelDensity(1);
      canvas = p.createCanvas(800, 450, p.WEBGL);
      p.noStroke();

      let eyeZ = ((p.height / 2) / p.tan(p.PI / 6));
      p.perspective(p.PI / 3, p.width / p.height, eyeZ / 400, eyeZ * 10);

      openingScene._load(p, canvas);
   };
   
   p.draw = function() {
      openingScene._draw();
   };

};


let instance = new p5(sketch);
