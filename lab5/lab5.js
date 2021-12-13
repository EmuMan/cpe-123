const spacing = 0.4;
const helixAmplitude = 30;
const helixFrequency = 0.05;
const helixThickness = 6;
const helixCount = 2;

const helixLifetime = 15;
const maxBases = 14;

const baseClosingSpeed = 1;

const cameraStartLoc = new p5.Vector(0, 0, 300);
const cameraEndLocInside = new p5.Vector(0, 250, 0);
const cameraEndLocOutside = new p5.Vector(0, -75, 0);

const cameraStartTime = 5;
const cameraEndTime = 10;

let cameraInside = false;

function drawSphere(instance, location, detail) {
   instance.push();
      instance.translate(location);
      instance.sphere(helixThickness / 2, detail, detail);
   instance.pop();
}

function drawLine(instance, p1, p2, color) {
   instance.strokeWeight(helixThickness);
   instance.stroke(color);
   if (p1) instance.line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
   instance.noStroke();
}

class AminoBase extends P5Mesh {

   length;
   helixColor;
   time;

   constructor(location, rotation, color, helixColor, length) {
      super('base', location, rotation, new p5.Vector(1, 1, 1), color);

      this.length = length;
      this.helixColor = helixColor;

      this.time = 0;
   }

   drawMesh(instance) {
      let currentLength = this.length * this.time;
      instance.fill(this.helixColor);
      drawSphere(instance, new p5.Vector(), 8);
      instance.fill(this.color);
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
      let startT = Math.max(0, this.time - helixLifetime);
      let oldPoint = this.equation(startT);
      startT += spacing - startT % spacing
      let newPoint;
      drawSphere(instance, oldPoint, 15);
      for (let t = startT; t < this.time; t += spacing) {
         newPoint = this.equation(t);
         drawSphere(instance, this.equation(t), 5);
         drawLine(instance, oldPoint, newPoint, this.color);
         oldPoint = newPoint;
      }
      newPoint = this.equation(this.time);
      drawSphere(instance, newPoint, 15);
      drawLine(instance, oldPoint, newPoint, this.color);
   }

   update(deltaTime, baseColor) {
      this.time += deltaTime;
      this.baseTimer += deltaTime;
      this.children.forEach(c => c.update(deltaTime));
      if (this.baseTimer > 1) {
         while (this.children.length >= maxBases) this.children.shift(); // remove old bases
         this.children.push(new AminoBase(this.equation(this.time), 
                                          new p5.Vector(0, -(this.time + Math.PI) % (2 * Math.PI), 0),
                                          baseColor, this.color, helixAmplitude));
         this.baseTimer = 0;
      }
   }

}

function interpolateVectors(t, t1, t2, v1, v2) {
   if (t <= t1) return v1.copy();
   if (t >= t2) return v2.copy();
   const normalized = (t - t1) / (t2 - t1);
   return p5.Vector.add(p5.Vector.mult(v1, 1 - normalized), p5.Vector.mult(v2, normalized));
}

let sketch = function(p) {

   let baseColors = [
      [
         p.color(255, 0, 0),
         p.color(0, 255, 0)
      ],
      [
         p.color(0, 0, 255),
         p.color(210, 210, 0)
      ]
   ]

   let helixes;
   let camera;
   let time;

   p.setup = function() {
      p.createCanvas(400, 400, p.WEBGL);

      helixes = [];

      time = 0;

      let rotation = 0;
      for (let i = 0; i < helixCount; i++) {
         helixes.push(new Helix(p.createVector(), p.createVector(0, rotation, 0), p.color(0), i));
         rotation += 2 * p.PI / helixCount;
      }

      camera = new P5Camera('camera', cameraStartLoc.copy(), p.createVector(0, 1, 1), p.createVector());
   };

   p.draw = function() {
      time += p.deltaTime / 1000;

      p.background(255, 255, 255);

      camera.location = interpolateVectors(time, cameraStartTime, cameraEndTime, cameraStartLoc, cameraInside ? cameraEndLocInside : cameraEndLocOutside);
      camera.up = p5.Vector.cross(camera.location, new p5.Vector(1, 0, 0));
      camera.location.y -= time / helixFrequency;
      camera.target.y = -time / helixFrequency;
      camera.addToScene(p);

      randomBaseSet = baseColors[Math.floor(Math.random() * baseColors.length)];
      randomBaseSet.sort((a, b) => Math.random() - 0.5); // this is awful, never do this
      for (let i = 0; i < helixes.length; i++) {
         helixes[i].update(p.deltaTime / 1000, randomBaseSet[i]);
         helixes[i].addToScene(p);
      }
   };

};

let instance = new p5(sketch);

const toggleButton = document.getElementById('toggle');
toggleButton.addEventListener('click', function() {
   cameraInside = !cameraInside;
   toggleButton.textContent = cameraInside ? 'Move Camera Outside' : 'Move Camera Inside';
});
