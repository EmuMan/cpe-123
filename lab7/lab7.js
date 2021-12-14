const gravity = -1000;
const legAngles = [-15, -10, -5, 5, 10, 15];

const leafEquation = theta => 1 + Math.cos(theta); // cardioid
const leafResolution = 100;
const leafThingFrequency = 10;

function deg2rad(d) { return d * (Math.PI / 180); }

class SpiderLeg extends P5Mesh2D {

    parent;
    length;
    
    angle;
    av;

    constructor(name, location, rotation, scale, color, parent, length, angle) {
        super(name, location, rotation, scale, color);
        this.parent = parent;
        this.length = length;
        this.angle = angle;
        this.av = 0;
    }

    drawMesh(instance) {
        instance.rotate(this.angle);
        instance.stroke(0);
        instance.strokeWeight(1);
        instance.line(0, 0, 0, this.length);
        instance.noStroke();
        instance.circle(0, this.length, 3);
    }
    
    update(instance) {
        const dt = instance.deltaTime / 1000;
        if (dt === 0.0) return;
        const v2old = p5.Vector.sub(this.parent.oldLocation, this.parent.location);
        const directionVector = p5.Vector.rotate(new p5.Vector(0, this.length), this.angle);
        const toOldDirectionVector = p5.Vector.add(directionVector, v2old);
        const newInfluencedAV = directionVector.angleBetween(toOldDirectionVector);
        const totalAA = newInfluencedAV / dt * 2 + (gravity / this.length) * Math.sin(this.angle);
        this.av += totalAA * dt;
        this.av *= 0.99;
        this.angle += this.av * dt;
    }

}

class Spider extends P5Mesh2D {

    origin;
    legs;
    
    originalLocation;
    oldLocation;

    constructor(name, location, rotation, scale, color, origin) {
        super(name, location, rotation, scale, color);
        this.originalLocation = location.copy();
        this.oldLocation = location.copy();
        this.origin = origin;
        this.legs = [];
        for (let i = 0; i < 6; i++) {
            this.legs.push(new SpiderLeg(`${name}_leg`, new p5.Vector(), 0, 1, this.color, this, 50, deg2rad(-25 + i * 10)));
        }
    }

    drawMesh(instance) {
        instance.stroke(0);
        instance.strokeWeight(1);
        const toOrigin = p5.Vector.sub(this.origin, this.location);
        instance.line(0, 0, toOrigin.x, toOrigin.y);
        instance.noStroke();
        instance.circle(0, 0, 10);
        this.legs.forEach(l => l.addToScene(instance));
    }

    update(instance) {
        this.legs.forEach(l => l.update(instance));
        this.oldLocation = this.location.copy();
    }

    setAngle(r) {
        const displacement = p5.Vector.sub(this.originalLocation, this.origin);
        displacement.rotate(r);
        this.location = p5.Vector.add(this.origin, displacement);
    }

}

class StaticSpider extends Spider {

    time;
    startingAngle;

    constructor(name, location, rotation, scale, color, origin, startingAngle) {
        super(name, location, rotation, scale, color, origin);
        this.time = 0;
        this.startingAngle = startingAngle;
        this.legs.splice(0, this.legs.length);
        for (let i = 0; i < legAngles.length; i++) {
            this.legs.push(new SpiderLeg(`${this.name}_leg_${i}`, new p5.Vector(), deg2rad(legAngles[i]), 1, color, this, 50, 0));
        }
    }

    update(instance) {
        this.time += instance.deltaTime / 1000;
        const timeScale = this.time * 2.0;
        this.setAngle(Math.cos(timeScale + this.startingAngle) / (p5.Vector.sub(this.location, this.origin).mag() / 30));
        this.legs.forEach(l => l.angle = Math.sin(timeScale + this.startingAngle) * 0.7);
    }

}

class Leaf extends P5Mesh2D {

    size;

    constructor(name, location, rotation, scale, color, size) {
        super(name, location, rotation, scale, color);
        this.size = size;
    }

    drawMesh(instance) {
        for (let i = 0; i < leafResolution; i++) {
            const theta = (i / leafResolution) * 2 * Math.PI;
            const r = leafEquation(theta);
            const isThing = i % leafThingFrequency === 0;
            instance.stroke(isThing ? instance.color(0, 90, 50) : this.color);
            instance.strokeWeight(isThing ? 3 : 5);
            instance.line(0, 0, Math.cos(theta) * r * this.size, Math.sin(theta) * r * this.size);
        }
    }

}

let sketch = function (p) {

    let mainSpider;
    let spiders;
    
    let leaves;

    p.setup = function () {
        p.pixelDensity(1);
        p.createCanvas(400, 400);
        p.noStroke();
        
        mainSpider = new Spider('spider', new p5.Vector(p.width / 2, p.height / 2), 0, 1, p.color(0), new p5.Vector(p.width / 2, -200));
        
        spiders = [];
        spiders.push(new StaticSpider('s_spider_0', new p5.Vector(70, 100), 0, 1, p.color(0), new p5.Vector(70, -50), p.random(2 * p.PI)));
        spiders.push(new StaticSpider('s_spider_1', new p5.Vector(120, 300), 0, 1, p.color(0), new p5.Vector(120, -50), p.random(2 * p.PI)));
        spiders.push(new StaticSpider('s_spider_2', new p5.Vector(270, 100), 0, 1, p.color(0), new p5.Vector(270, -50), p.random(2 * p.PI)));
        spiders.push(new StaticSpider('s_spider_3', new p5.Vector(320, 300), 0, 1, p.color(0), new p5.Vector(320, -50), p.random(2 * p.PI)));

        leaves = [];
        for (let i = 0; i < 20; i++) {
            const xLoc = p.random(p.width * 0.75);
            const scale = Math.sqrt(p.width * 0.75 - xLoc) / 10;
            leaves.push(new Leaf(`leaf_${i}`, new p5.Vector(xLoc, p.random(p.height)),
                                 p.random(p.PI), scale, p.color(50, p.random(150, 225), p.random(100, 130)), 30));
        }
    };

    p.draw = function () {
        p.background(110, 200, 240);

        mainSpider.location = new p5.Vector(p.mouseX, p.mouseY);

        leaves.forEach(l => l.addToScene(p));
        mainSpider.update(p);
        mainSpider.addToScene(p);
        spiders.forEach(s => { s.update(p); s.addToScene(p); });
    };

};


let instance = new p5(sketch);
