const sampleCount = 60;
const energyParticleCount = 50;

const cameraPitch = 5.53;
const cameraYaw = -0.4;

let sketch = function(p) {

   let data;

   let objects;
   let objColliders;
   let markers;
   let camera;

   let energy;

   function getClosestHit(ray) {
      let closestHit = null;
      objColliders.forEach(c => {
         const hit = c.testRay(ray);
         if (hit && (!closestHit || hit.time < closestHit.time)) {
            closestHit = hit;
         }
      });
      return closestHit;
   }

   p.preload = function () {
      data = p.loadJSON('impressionism.json');
   }

   p.setup = function () {
      objects = [];
      objColliders = [];
      markers = [];

      data['objects'].forEach(e => {
         const o = loadObject(e);
         objects.push(o);
         // whyyyy do i have to do this
         const colDimensions = new p5.Vector(o.dimensions.x, o.dimensions.z, o.dimensions.y);
         objColliders.push(new StaticCollider(`${o.name}_col`, o.location, colDimensions, 0));
      });
      data['markers'].forEach(e => {
         const o = loadObject(e)
         markers.push(o);
         if (e['name'] === 'energy') energy = o;
      });
      camera = loadObject(data['camera'][0]);
      // so we can work with pitch/yaw
      camera = new PlayerCamera('camera', camera.location, cameraPitch, cameraYaw);

      p.pixelDensity(1);
      p.createCanvas(400, 400, p.WEBGL);
      p.noStroke();
   };
   
   p.draw = function () {
      p.background(0);

      p.noLoop();

      camera.addToScene(p);

      for (let i = 0; i < energyParticleCount; i++) {
         const r = p.random(1, 3.2);
         // exponential to concentrate particles towards the center
         const dist = p5.Vector.mult(p5.Vector.random3D(), r * r);
         p.push();
            p.fill(255);
            p.translate(p5.Vector.add(energy.location, dist));
            p.sphere(3.2 - r + 0.5);
         p.pop();
      }

      // this is so bad. really. but i don't really want to do fancy math right now, so this it will be.
      for (let i = -sampleCount / 2; i <= sampleCount / 2; i++) {
         for (let o = -sampleCount / 2; o <= sampleCount / 2; o++) {
            const dir = new p5.Vector(0, 1, 0);
            rotateVector(dir, new p5.Vector(cameraYaw + (o / sampleCount) * 1.1 + p.random(-0.008, 0.008), 0, 0));
            rotateVector(dir, new p5.Vector(0, 0, cameraPitch + (i / sampleCount) * 1.4 + p.random(-0.008, 0.008)));
            ray = new Ray(camera.location, dir);
            const closestHit = getClosestHit(ray);
            if (closestHit) {
               dir.mult(closestHit.time);
               // normal used to move the vector slightly away from the collider to avoid ray passthroughs
               const point = p5.Vector.add(camera.location, p5.Vector.add(dir, p5.Vector.mult(closestHit.normal, 0.1)));
               const distToEnergy = p5.Vector.sub(energy.location, point);
               const lightCastHit = getClosestHit(new Ray(point, distToEnergy));
               if (lightCastHit && lightCastHit.time <= 1) {
                  p.fill(0);
               } else {
                  let brightness = 255 / (distToEnergy.magSq() / 2000);
                  // surfaces facing the light get more brightness
                  brightness *= distToEnergy.dot(closestHit.normal) / distToEnergy.mag();
                  p.fill(brightness / 2.5, brightness / 1.3, brightness);
               }
               p.push();
                  p.translate(point);
                  p.sphere((closestHit.time / 100) * p.random(1.1, 1.6)); // scale further points linearly to match depth
               p.pop();
            }
         }
      }
   };

};


let instance = new p5(sketch);
