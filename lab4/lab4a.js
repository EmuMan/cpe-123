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

   constructor(name, location, rotation, scale, color) {
      super(name, location, rotation, scale, color);
      this.leaves = [];
   }

   addLeaf(leaf) {
      this.leaves.push(leaf);
   }

   drawMesh(instance) {
      this.trunk.drawRecursive(instance);
      for (let i = 0; i < this.leaves.length; i++) {
         this.leaves[i].addToScene(instance);
      }
   }

}

let sketch = function(p) {

   let ground;
   let tree;

   function rotateVector(v, r) {
      // because apparently p5 doesn't natively provide this functionality for 3d vectors...
      // luckily, we can use a short - albeit fairly inefficient - trick to extend the 2d rotation into a 3rd dimension,
      // by simply performing it for every axis required (in xyz format) (trust me it works, i think)
      let tempR;
      /*
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

      if (depth > -1) {
         tree.addLeaf(new P5Sphere('leaf', newPosition, p.createVector(0, 0, 0), p.createVector(1, 1, 1), p.color(0, 255, 0), 2));
      }
      
      if (depth == 4) return;

      let branchChance = 75; // percent chance that a branch will form every attempt
      let maxBranches = 1;
      let rotationFactor = p.PI / 4;

      let branchCount = 0;
      let rotations = [];

      while ((p.random(0, 100) < branchChance && branchCount < maxBranches) || (depth < 3 && branchCount < 1)) {
         for (let i = 0; i < 3; i++) {
            //rotations.push(p.random(-rotationFactor, rotationFactor));
            rotations.push(i != -1 ? (i + 1) * p.PI / 8 : 0);
            //rotations.push(i != 0 ? (i + 1) * (1 / (depth + 1)) * p.PI / 8 : 0);
            //rotations.push(i != 0 ? (i + 1) * ((depth + 1) / 5) * p.PI / 8 : 0);
         }
         let rotation = p.createVector(rotations[0], rotations[1], rotations[2]);
         let length = currentBranch.length * p.random(0.7, 0.9);
         let newBranch = new Branch(length, currentBranch.radius * 0.8, rotation);
         currentBranch.addChild(newBranch);
         let newVector = currentVector.copy();
         newVector.setMag(newBranch.length);
         console.log(newVector);
         rotateVector(newVector, rotation);
         console.log(newVector);
         generateBranches(tree, depth + 1, newBranch, newVector, newPosition);
         branchCount += 1;
         rotations.splice(0, rotations.length); // clear array
      }
   }

   p.setup = function() {
      let cameraPos = p.createVector(0, 100, 0);
      let cameraUp = p.createVector(0, 0, -1); // TODO: This should not have to be negative. Figure out why it does.
      let cameraFacing = p.createVector(0, 0, 0);
      sceneCamera = new P5Camera('main_camera', cameraPos, cameraUp, cameraFacing);

      ground = new P5Sphere('ground', p.createVector(0, 0, -130), p.createVector(0, 0, 0), p.createVector(2, 1, 1), p.color(40, 181, 70), 100);
      ground.setDetail(64);

      let treePos = p.createVector(0, 0, -30);
      let treeSize = 20;
      tree = new Tree('tree', treePos, p.createVector(p.PI / 2, 0, 0), p.createVector(1, 1, 1), p.color(69, 41, 9));
      tree.trunk = new Branch(treeSize, 2, p.createVector(0, 0, 0));
      generateBranches(tree, 0, tree.trunk, p.createVector(0, treeSize, 0), p.createVector(0, 0, 0));

      p.pixelDensity(1);
      p.createCanvas(400, 400, p.WEBGL);
      p.noStroke();
   };
   
   p.draw = function() {
      p.ambientLight(125, 125, 125);
      p.directionalLight(p.color(255, 255, 255), p.createVector(-1, 0, -1))

      sceneCamera.addToScene(p);

      p.background(44, 184, 216);

      //ground.addToScene(p);

      let rotVec = p.createVector(p.frameCount / 200, p.mouseX / 200, p.mouseY / 200);

      p.push();
         let pos = p.createVector(10, 0, 0);
         rotateVector(pos, rotVec);
         pos.add(p.createVector(0, 0, -30));
         p.translate(pos);
         p.box(10, 10, 10);
      p.pop();

      p.push();
         tree.rotation = rotVec;
         tree.addToScene(p);
      p.pop();
   };

};


let instance = new p5(sketch);