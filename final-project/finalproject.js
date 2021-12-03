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
      this.trunk = new Branch(30, 2, new p5.Vector());
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

class MonsterParticle extends P5Sphere {

   time;
   velocity;
   originalRadius;

   constructor(name, location, scale, color, velocity) {
      super(name, location, new p5.Vector(0, 0, 0), scale, color, Math.random() * 2 + 2);
      this.setDetail(5);
      this.time = 0;
      this.velocity = velocity;
      this.originalRadius = this.radius;
   }

   update(instance) {
      const dt = instance.deltaTime / 1000;
      const noiseScale = 20;
      this.time += dt;
      let acc = new p5.Vector(instance.noise(this.location.x * noiseScale) - 0.5,
                              instance.noise(this.location.y * noiseScale) - 0.5,
                              instance.noise(this.location.z * noiseScale) - 0.5);
      acc.mult(dt * 1000);
      this.velocity.add(acc);
      let _velocity = this.velocity.copy();
      _velocity.mult(dt);
      this.location.add(_velocity);

      this.radius = this.originalRadius * (1 - this.time);
   }

}

class Monster extends P5Mesh {

   collider;

   state;

   health;
   time;
   particles;

   constructor(name, location, rotation, scale, color) {
      super(name, location, rotation, scale, color);

      this.collider = new SphereTrigger('monster_collider', this.location, 10);

      this.health = 100;
      this.time = 0;
      this.particles = [];
   }

   drawMesh(instance) {
      this.particles.forEach(p => p.addToScene(instance));
      instance.push();
         instance.rotateX(this.time);
         instance.rotateY(this.time);
         instance.sphere(7, 5, 5);
      instance.pop();
   }

   addParticle() {
      const v = p5.Vector.random3D();
      v.mult(30);
      this.particles.push(new MonsterParticle(`${this.name}_particle`, this.location.copy(),
                                              this.scale.copy(), this.color, v));
   }

   update(instance) {
      this.time += instance.deltaTime / 1000;
      let toRemove = 0;
      this.particles.forEach(p => {
         if (p.time > 1) {
            toRemove++;
            return;
         }
         p.update(instance);
      });
      for (let i = 0; i < toRemove; i++) this.particles.shift();
   }

   damage(hp) {
      this.health -= hp;
      if (this.health <= 0) {
         this.health = 0;
         this.onDeath();
      }
      console.log(this.health);
   }
   
   onDeath() {

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

      bossFight._load(p, canvas);
   };
   
   p.draw = function() {
      bossFight._draw();
   };

};


let instance = new p5(sketch);
