class Quaternion {

    // https://api.flutter.dev/flutter/vector_math/Quaternion-class.html

    x;
    y;
    z;
    w;

    constructor(x, y, z, w) {
        if (w === undefined) {
            this.setEuler(x, y, z);
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        this.w += other.w;
    }

    copy() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    length() {
        return Math.sqrt(this.lengthSq())
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    normalize() {
        let l = this.length();
        if (l == 0.0) return;
        
        let d = 1.0 / l;
        this.x *= l;
        this.y *= l;
        this.z *= l;
        this.w *= l;
    }

    rotate(v) {
        // god help me

        // conjugate(this) * [v,0] * this
        
        let tiw = this.w;
        let tiz = -this.z;
        let tiy = -this.y;
        let tix = -this.x;
        
        let tx = tiw * v.x + tix * 0.0 + tiy * v.z - tiz * v.y;
        let ty = tiw * v.y + tiy * 0.0 + tiz * v.x - tix * v.z;
        let tz = tiw * v.z + tiz * 0.0 + tix * v.y - tiy * v.x;
        let tw = tiw * 0.0 - tix * v.x - tiy * v.y - tiz * v.z;
        
        v.x = tw * this.x + tx * this.w + ty * this.z - tz * this.y;
        v.y = tw * this.y + ty * this.w + tz * this.x - tx * this.z;
        v.z = tw * this.z + tz * this.w + tx * this.y - ty * this.x;
    }

    setEuler(yaw, pitch, roll) {
        let halfYaw = yaw * 0.5;
        let halfPitch = pitch * 0.5;
        let halfRoll = roll * 0.5;

        let cosYaw = Math.cos(halfYaw);
        let sinYaw = Math.sin(halfYaw);
        let cosPitch = Math.cos(halfPitch);
        let sinPitch = Math.sin(halfPitch);
        let cosRoll = Math.cos(halfRoll);
        let sinRoll = Math.sin(halfRoll);

        this.x = cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw;
        this.y = cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw;
        this.z = sinRoll * cosPitch * cosYaw - cosRoll * sinPitch * sinYaw;
        this.w = cosRoll * cosPitch * cosYaw + sinRoll * sinPitch * sinYaw;
    }

}

class P5Object {

    name;
    location;

    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    addToScene(instance) { }

    move(x, y, z) {
        this.location.x += x;
        this.location.y += y;
        this.location.z += z;
    }

}

class P5Camera extends P5Object {

    up;
    target;

    constructor(name, location, up, target) {
        super(name, location);
        this.up = up;
        this.target = target;
    }

    addToScene(instance) {
        instance.camera(this.location.x, this.location.y, this.location.z,
            this.target.x, this.target.y, this.target.z,
            this.up.x, this.up.y, this.up.z);
    }

}

class P5Mesh extends P5Object {

    rotation;
    scale;
    color;
    children;
    outline;

    constructor(name, location, rotation, scale, color, outline) {
        super(name, location);
        this.rotation = rotation;
        this.scale = scale;
        this.color = color;
        this.children = [];
        if (outline) this.outline = outline; else this.outline = 0;
    }

    addChild(obj) {
        this.children.push(obj);
    }

    addToScene(instance) {
        instance.push();
            instance.translate(this.location.x, this.location.y, this.location.z);
            instance.scale(this.scale.x, this.scale.y, this.scale.z);
            instance.rotateZ(this.rotation.z);
            instance.rotateY(this.rotation.y);
            instance.rotateX(this.rotation.x);
            instance.fill(this.color);
            instance.strokeWeight(this.outline);
            this.drawMesh(instance);
            this.children.forEach(c => c.addToScene(instance));
        instance.pop();
    }

    drawMesh() { }

}

class P5Box extends P5Mesh {

    dimensions;

    constructor(name, location, rotation, scale, color, dimensions, outline) {
        super(name, location, rotation, scale, color, outline);
        this.dimensions = dimensions;
    }

    drawMesh(instance) { instance.box(this.dimensions.x, this.dimensions.y, this.dimensions.z); }

}

class P5Plane extends P5Mesh {

    dimensions;

    constructor(name, location, rotation, scale, color, dimensions, outline) {
        super(name, location, rotation, scale, color, outline);
        this.dimensions = dimensions;
    }

    drawMesh(instance) { instance.plane(this.dimensions.x, this.dimensions.y); }

}

class P5Sphere extends P5Mesh {

    radius;
    detailX;
    detailY;

    constructor(name, location, rotation, scale, color, radius, outline) {
        super(name, location, rotation, scale, color, outline);
        this.radius = radius;
        this.detailX = this.detailY = 16;
    }

    setDetail(detail) { this.detailX = this.detailY = detail; }

    drawMesh(instance) { instance.sphere(this.radius, this.detailX, this.detailY); }

}

class P5Cylinder extends P5Mesh {

    radius;
    height;

    constructor(name, location, rotation, scale, color, radius, height, outline) {
        super(name, location, rotation, scale, color, outline);
        this.radius = radius;
        this.height = height;
    }

    drawMesh(instance) { instance.cylinder(this.radius, this.height, 16, 1, true, true); }

}

class P5Cone extends P5Mesh {

    radius;
    height;

    constructor(name, location, rotation, scale, color, radius, height, outline) {
        super(name, location, rotation, scale, color, outline);
        this.radius = radius;
        this.height = height;
    }

    drawMesh(instance) { instance.cone(this.radius, this.height, 16, 1, true); }

}

class P5Ellipsoid extends P5Mesh {
    radii;

    constructor(name, location, rotation, scale, color, radii, outline) {
        super(name, location, rotation, scale, color, outline);
        this.radii = radii;
    }

    drawMesh(instance) { instance.ellipsoid(this.radii.x, this.radii.y, this.radii.z, 24, 24); }

}

class P5Torus extends P5Mesh {

    radius;
    tubeRadius;

    constructor(name, location, rotation, scale, color, radius, tubeRadius, outline) {
        super(name, location, rotation, scale, color, outline);
        this.radius = radius;
        this.tubeRadius = tubeRadius;
    }

    drawMesh(instance) { instance.torus(this.radius, this.tubeRadius, 24, 16); }

}

// a2v = array to vector
function a2v(a) {
    if (a.length == 2) {
        return new p5.Vector(a[0], a[1]);
    } else {
        return new p5.Vector(a[0], a[1], a[2]);
    }
}

function loadObject(data, instance, color) {
    if (instance && !color && data['type'] != 'camera') {
        color = instance.color(data['color']);
    }
    switch(data['type']) {
        case 'camera':
            return new P5Camera(data['name'], a2v(data['location']), a2v(data['up']), a2v(data['target']))
        case 'box':
            return new P5Box(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, a2v(data['dimensions']));
        case 'plane':
            return new P5Plane(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, a2v(data['dimensions']));
        case 'sphere':
            return new P5Sphere(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, data['dimensions'][0]);
        case 'cylinder':
            return new P5Cylinder(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, data['dimensions'][0], data['dimensions'][1]);
        case 'cone':
            return new P5Cone(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, data['dimensions'][0], data['dimensions'][1]);
        case 'ellipsoid':
            return new P5Ellipsoid(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, a2v(data['dimensions']));
        case 'torus':
            return new P5Torus(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color, data['dimensions'][0], data['dimensions'][1]);
    }
    return null;
}