// Starting code for Project 3 - Art Nouveau animated curves

// Starting code for Lab 4 - Generative Art
// This should be your organic sketch

const spiralDecayRate = 0.03;
const spiralSpheresPerRev = 30;
const spiralSizeFactor = 3;

const treeSizeFactor = 1;
const treeHeight = 30;

function noiseFromVec(instance, v, ns) {
   ns *= 3;
   return new p5.Vector(
      instance.noise(v.x * ns, v.y * ns, 0) - 0.45,
      instance.noise(v.x * ns, v.y * ns, 1000) - 0.5
   );
}

class BasicCircle {

   location;
   radius;

   constructor(location, radius) {
      this.location = location;
      this.radius = radius;
   }

   draw(instance) {
      instance.push();
         instance.translate(this.location);
         instance.circle(0, 0, this.radius);
      instance.pop();
   }

}

class BranchPath {

   points;
   direction;
   currentSize;
   noiseScale;
   color;

   timeSinceBranch;

   constructor(location, direction, size, noiseScale, color) {
      this.points = [];
      this.points.push(new BasicCircle(location.copy(), size));
      this.direction = direction;
      this.currentSize = size;
      this.noiseScale = noiseScale;
      this.color = color;
      this.timeSinceBranch = 0;
   }

   update(instance) {
      if (this.currentSize <= 0) return;
      const lastPoint = this.getLastPoint();
      const rx = noiseFromVec(instance, lastPoint.location, this.noiseScale);
      this.direction.mult(3 / (this.noiseScale / 10));
      this.direction.add(p5.Vector.mult(rx, 0.2));
      this.direction.setMag(2);
      this.currentSize -= 0.01 * treeSizeFactor;
      this.points.push(new BasicCircle(p5.Vector.add(lastPoint.location, p5.Vector.mult(this.direction, 0.2)), this.currentSize));
      this.timeSinceBranch++;
   }

   draw(instance) {
      instance.fill(this.color);
      this.points.forEach(p => p.draw(instance));
   }

   getLastPoint() {
      return this.points[this.points.length - 1];
   }

}

class ReverseSpiral {

   location;
   direction;
   scale;
   pointCount;
   points;
   color;

   flipped;

   constructor(location, direction, scale, color) {
      this.scale = scale;
      this.pointCount = scale / (spiralDecayRate * treeSizeFactor);
      this.direction = new p5.Vector(direction.y, -direction.x);
      this.direction.setMag(-scale * spiralSizeFactor);
      this.flipped = this.direction.y > 0;
      if (this.flipped > 0) this.direction.mult(-1);
      this.location = p5.Vector.sub(location, this.direction);
      this.color = color;
      this.points = [];
   }

   update(instance) {
      if (this.scale < 0) return;
      const newLoc = p5.Vector.add(this.location, p5.Vector.mult(this.direction, 1 - this.points.length / this.pointCount));
      this.points.push(new BasicCircle(newLoc, this.scale));
      this.scale -= spiralDecayRate * treeSizeFactor;
      this.direction.rotate((this.flipped ? 2 : -2) * Math.PI / spiralSpheresPerRev);
   }

   draw(instance) {
      instance.fill(this.color);
      this.points.forEach(p => p.draw(instance));
   }

}

class Tree extends P5Mesh2D {
   
   branches;

   constructor(name, location, rotation, scale, color) {
      super(name, location, rotation, scale, color);
      this.branches = [];
      this.branches.push(new BranchPath(new p5.Vector(0, 0), new p5.Vector(0, -1), 4 * treeSizeFactor, 20, this.color));
   }

   addBranch(originalBranch) {
      const lastPoint = originalBranch.getLastPoint();
      const newDir = p5.Vector.add(originalBranch.direction, p5.Vector.mult(new p5.Vector.random3D(), 3));
      newDir.normalize();
      this.branches.push(new BranchPath(lastPoint.location, newDir, originalBranch.currentSize, originalBranch.noiseScale * 2, originalBranch.color));
   }

   addSpiral(originalBranch) {
      this.branches.push(new ReverseSpiral(originalBranch.getLastPoint().location, originalBranch.direction, originalBranch.currentSize, originalBranch.color));
   }

   drawMesh(instance) {
      this.branches.forEach(b => b.draw(instance));
   }

   update(instance) {
      this.branches.forEach(b => {
         b.update(instance);
         if (!(b instanceof BranchPath) || b.currentSize === 0) return;
         if (b.currentSize < 1) {
            this.addSpiral(b);
            b.currentSize = 0;
         }
         if (b.timeSinceBranch > 30 && instance.random(0, 100) < 4 + 40 / this.branches.length) {
            b.timeSinceBranch = 0;
            if (b.currentSize < 2.5 * treeSizeFactor && instance.random(0, 100) < 80) {
               this.addSpiral(b);
            } else {
               this.addBranch(b);
            }
         }
      });
   }

}

class Flower extends P5Mesh2D {

   sColor;
   cColor;
   pColor;
   type;

   constructor(name, location, rotation, scale, sColor, cColor, pColor, type) {
      super(name, location, rotation, scale, null);
      this.sColor = sColor;
      this.cColor = cColor;
      this.pColor = pColor;
      this.type = type;
   }

   drawMesh(instance) {
      instance.fill(this.sColor);
      instance.rect(-1, 0, 2, 20);
      instance.fill(this.pColor);
      if (this.type < 1) {
         instance.circle(0, 0, 15);
      } else {
         const pCount = this.type + 3;
         const dVec = instance.createVector(0, -5);
         for (let i = 0; i < pCount; i++) {
            dVec.rotate(2 * Math.PI / pCount);
            instance.circle(dVec.x, dVec.y, 10);
         }
      }
      if (this.type > 3.5) return;
      instance.fill(this.cColor);
      instance.circle(0, 0, 5);
   }

}

let sketch = function(p) {

   let c;

   let tree;
   let flowersAbove;
   let flowersBelow;

   const flowerColors = [
      p.color(210, 30, 40),
      p.color(110, 30, 40),
      p.color(50, 30, 230),
      p.color(40, 20, 140)
   ];
   
   function initTree() {
      tree = new Tree('tree', p.createVector(p.width / 2, p.height - treeHeight), 0, 4, p.color(200, 130, 50));
   }

   function addFlower(location, type) {
      const c = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      flowersAbove.push(new Flower('flower', location, 0, 1, p.color(20, 150, 20), p.color(255), c, type));
   }

   p.setup = function() {
      p.pixelDensity(1);
      c = p.createCanvas(400, 400);
      p.noStroke();

      flowersAbove = [];
      flowersBelow = []

      let col, f;
      for (let i = 0; i < 50; i++) {
         col = flowerColors[Math.floor(Math.random() * flowerColors.length)];
         f = new Flower('flower', p.createVector(p.random(p.width), p.random(p.height - 75, p.height)),
                        0, 1, p.color(20, 150, 20), p.color(255), col, p.random(5));
         if (f.location.y > p.height - treeHeight) {
            flowersBelow.push(f);
         } else {
            flowersAbove.push(f);
         }
      }
      
      initTree();

      c.mousePressed(initTree);
   };
   
   p.draw = function() {
      p.background(230, 190, 110);

      p.fill(p.color(160, 100, 30));

      p.circle(p.width / 2, p.height + 500, 1150);

      flowersAbove.forEach(f => f.addToScene(p));

      tree.update(p);
      tree.addToScene(p);
      
      flowersBelow.forEach(f => f.addToScene(p));

   };

};


let instance = new p5(sketch);
