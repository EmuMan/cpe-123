let spacing = 0.05;
let helixAmplitude = 30;
let helixFrequency = 0.05;
let helixCount = 2;

let helixLifetime = 10;
let maxBases = 10;

let baseClosingSpeed = 1;

function rotateVector(v, r) {
   // the implementation in lab4 is a classic example of me overthinking things i guess
   v.rotateZ(r.z);
   v.rotateY(r.y);
   v.rotateX(r.x);
}

function drawSphere(instance, location) {
   instance.push();
      instance.translate(location);
      instance.sphere(3, 3, 3);
   instance.pop();
}

class AminoBase extends P5Mesh {

   length;
   time;

   constructor(location, rotation, color, length) {
      super('base', location, rotation, new p5.Vector(1, 1, 1), color);

      this.length = length;

      this.time = 0;
   }

   drawMesh(instance) {
      let currentLength = this.length * this.time;
      instance.translate(currentLength / 2, 0, 0);
      instance.rotateZ(instance.PI / 2);
      instance.cylinder(2, currentLength);
   }

   update(deltaTime) {
      this.time += deltaTime * baseClosingSpeed;
      if (this.time > 1) this.time = 1;
   }

}

class Helix extends P5Mesh {

   time;
   baseTimer;
   equation;

   constructor(location, rotation, color, selfIndex) {
      super('helix', location, rotation, new p5.Vector(1, 1, 1), color);

      this.selfIndex = selfIndex;
      this.time = 0;
      this.baseTimer = 0;
      this.equation = t => new p5.Vector(Math.cos(t) * helixAmplitude, -t / helixFrequency, Math.sin(t) * helixAmplitude);
   }

   drawMesh(instance) {
      // draw a parametric equation
      for (let t = Math.max(0, this.time - helixLifetime); t < this.time; t += spacing) {
         drawSphere(instance, this.equation(t));
      }
      drawSphere(instance, this.equation(this.time));
   }

   update(deltaTime, baseColor) {
      this.time += deltaTime;
      this.baseTimer += deltaTime;
      this.children.forEach(c => c.update(deltaTime));
      if (this.baseTimer > 1) {
         while (this.children.length >= maxBases) this.children.shift(); // remove old bases
         this.children.push(new AminoBase(this.equation(this.time), 
                                          new p5.Vector(0, -(this.time + Math.PI) % (2 * Math.PI), 0),
                                          baseColor, helixAmplitude));
         this.baseTimer = 0;
      }
   }

}

let sketch = function(p) {

   let baseColors = [
      [
         p.color(255, 0, 0),
         p.color(0, 255, 0)
      ],
      [
         p.color(0, 0, 255),
         p.color(170, 170, 0)
      ]
   ]

   let helixes;
   let camera;

   p.setup = function() {
      p.createCanvas(400, 400, p.WEBGL);

      helixes = [];

      let rotation = 0;
      for (let i = 0; i < helixCount; i++) {
         helixes.push(new Helix(p.createVector(), p.createVector(0, rotation, 0), p.color(0), i));
         rotation += 2 * p.PI / helixCount;
      }

      camera = new P5Camera('camera', p.createVector(0, 0, 300), p.createVector(0, 1, 0), p.createVector());
   };

   p.draw = function() {
      p.background(255, 255, 255);

      camera.location.y = -helixes[0].time / helixFrequency;
      camera.target.y = camera.location.y;
      camera.addToScene(p);

      randomBaseSet = baseColors[Math.floor(Math.random() * baseColors.length)];
      for (let i = 0; i < helixes.length; i++) {
         helixes[i].update(p.deltaTime / 1000, randomBaseSet[i]);
         helixes[i].addToScene(p);
      }
   };

};

let instance = new p5(sketch);
