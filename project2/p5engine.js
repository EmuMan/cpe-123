class P5Object {

    name;
    location;

    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    addToScene() { }

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

    addToScene() {
        camera(this.location.x, this.location.y, this.location.z,
            this.target.x, this.target.y, this.target.z,
            this.up.x, this.up.y, this.up.z);
    }

}

class P5Mesh extends P5Object {

    rotation;
    scale;
    color;

    constructor(name, location, rotation, scale, color) {
        super(name, location);
        this.rotation = rotation;
        this.scale = scale;
        this.color = color;
    }

    addToScene() {
        push();
            translate(this.location.x, this.location.y, this.location.z);
            scale(this.scale.x, this.scale.y, this.scale.z);
            rotateZ(this.rotation.z);
            rotateY(this.rotation.y);
            rotateX(this.rotation.x);
            fill(this.color);
            this.drawMesh();
        pop();
    }

    drawMesh() { }

}

class P5Box extends P5Mesh {

    dimensions;

    constructor(name, location, rotation, scale, color, dimensions) {
        super(name, location, rotation, scale, color);
        this.dimensions = dimensions;
    }

    drawMesh() { box(this.dimensions.x, this.dimensions.y, this.dimensions.z); }

}

class P5Plane extends P5Mesh {

    dimensions;

    constructor(name, location, rotation, scale, color, dimensions) {
        super(name, location, rotation, scale, color);
        this.dimensions = dimensions;
    }

    drawMesh() { plane(this.dimensions.x, this.dimensions.y); }

}

class P5Sphere extends P5Mesh {

    radius;

    constructor(name, location, rotation, scale, color, radius) {
        super(name, location, rotation, scale, color);
        this.radius = radius;
    }

    drawMesh() { sphere(this.radius, 16, 16); }

}

class P5Cylinder extends P5Mesh {

    radius;
    height;

    constructor(name, location, rotation, scale, color, radius, height) {
        super(name, location, rotation, scale, color);
        this.radius = radius;
        this.height = height;
    }

    drawMesh() { cylinder(this.radius, this.height, 16, 1, true, true); }

}

class P5Cone extends P5Mesh {

    radius;
    height;

    constructor(name, location, rotation, scale, color, radius, height) {
        super(name, location, rotation, scale, color);
        this.radius = radius;
        this.height = height;
    }

    drawMesh() { cone(this.radius, this.height, 16, 1, true); }

}

class P5Ellipsoid extends P5Mesh {
    radii;

    constructor(name, location, rotation, scale, color, radii) {
        super(name, location, rotation, scale, color);
        this.radii = radii;
    }

    drawMesh() { ellipsoid(this.radii.x, this.radii.y, this.radii.z, 24, 24); }

}

class P5Torus extends P5Mesh {

    radius;
    tubeRadius;

    constructor(name, location, rotation, scale, color, radius, tubeRadius) {
        super(name, location, rotation, scale, color);
        this.radius = radius;
        this.tubeRadius = tubeRadius;
    }

    drawMesh() { torus(this.radius, this.tubeRadius, 24, 16); }

}

// a2v = array to vector
function a2v(a) {
    if (a.length == 2) {
        return createVector(a[0], a[1]);
    } else {
        return createVector(a[0], a[1], a[2]);
    }
}

function loadObject(data) {
    switch(data['type']) {
        case 'camera':
            return new P5Camera(data['name'], a2v(data['location']), a2v(data['up']), a2v(data['target']))
        case 'box':
            return new P5Box(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), a2v(data['dimensions']));
        case 'plane':
            return new P5Plane(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), a2v(data['dimensions']));
        case 'sphere':
            return new P5Sphere(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), data['dimensions'][0]);
        case 'cylinder':
            return new P5Cylinder(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), data['dimensions'][0], data['dimensions'][1]);
        case 'cone':
            return new P5Cone(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), data['dimensions'][0], data['dimensions'][1]);
        case 'ellipsoid':
            return new P5Ellipsoid(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), a2v(data['dimensions']));
        case 'torus':
            return new P5Torus(data['name'], a2v(data['location']), a2v(data['rotation']), a2v(data['scale']), color(data['color']), data['dimensions'][0], data['dimensions'][1]);
    }
    return null;
}