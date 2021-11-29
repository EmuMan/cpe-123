const openingScene = new Scene('opening', function(scene) {

    let p;
    let c;

    let camera;
    let character;

    let terrain;
    let trees;
    let markers;

    let physics;

    function lockPointer() {
        c.elt.requestPointerLock();
    }

    function unlockPointer() {
        document.exitPointerLock();
    }

    function pointerLockChange() {
        if (document.pointerLockElement === c.elt || document.mozPointerLockElement === c.elt) {
            document.addEventListener('mousemove', mouseMoveHandler, false);
        } else {
            document.removeEventListener('mousemove', mouseMoveHandler, false);
        }
    }

    function mouseMoveHandler(e) {
        camera.pitch += e.movementX * cameraSensitivity;
        camera.yaw -= e.movementY * cameraSensitivity;
        while (camera.pitch < 0) camera.pitch += 2 * Math.PI;
        while (camera.pitch > 2 * Math.PI) camera.pitch -= 2 * Math.PI;
        let yawLimit = Math.PI / 2 - cameraYawThreshold;
        while (camera.yaw < -yawLimit) camera.yaw = -yawLimit;
        while (camera.yaw > yawLimit) camera.yaw = yawLimit;
    }

    function pointerSetup() {
        c.elt.requestPointerLock = c.elt.requestPointerLock || c.elt.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
        c.mouseClicked(lockPointer);
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
    }

    function processInput() {
        let rot = p.createVector(0, camera.pitch, 0);
        let grounded = false;
        character.collisions.forEach(c => {
            if (c.normal.equals(p.createVector(0, -1, 0))) grounded = true;
        });
        let ma = grounded ? movementAccel : movementAccel / 4;
        if (p.keyIsDown(65)) character.addForce(rotateVector(p.createVector(ma, 0, 0), rot)); // a
        if (p.keyIsDown(68)) character.addForce(rotateVector(p.createVector(-ma, 0, 0), rot)); // d
        if (p.keyIsDown(87)) character.addForce(rotateVector(p.createVector(0, 0, -ma), rot)); // w
        if (p.keyIsDown(83)) character.addForce(rotateVector(p.createVector(0, 0, ma), rot)); // s
        if (p.keyIsDown(32) && grounded) character.addForce(p.createVector(0, 3000, 0)); // space
        if (p.keyIsDown(27)) unlockPointer(); // esc
    }

    scene.load = function(instance, canvas) {
        c = canvas;
        p = instance;

        camera = new PlayerCamera('camera', p.createVector(0, 10, 0), 0, 0);
        physics = new Physics(p.createVector(0, -100, 0));
        pointerSetup();

        terrain = [];
        markers = [];
        trees = [];

        let data = p.loadJSON('./opening_scene.json', function () {
            data['terrain'].forEach(o => terrain.push(loadObject(o, p)));
            data['trees'].forEach(o => trees.push(loadObject(o, p)));
            data['markers'].forEach(o => markers.push(loadObject(o, p)));

            terrain.forEach(t => {
                if (t instanceof P5Box) {
                    physics.addStaticCollider(new StaticCollider(t.name, t.location, t.dimensions, 0.0015));
                }
            });

            for (let i = 0; i < trees.length; i++) {
                let tree = new Tree(trees[i].name, trees[i].location, p.createVector(), trees[i].scale, p.color(100, 60, 20));
                tree.generateBranches();
                trees[i] = tree;
            }

            markers.forEach(m => {
                if (m.name === 'spawn') {
                    character = new DynamicCollider('character',
                        m.location,
                        p.createVector(10, 30, 10));
                    camera.setParent(character);
                    physics.addDynamicCollider(character);
                }
            });

            scene.ready = true;
        });
    };

    scene.draw = function() {
        processInput();

        physics.update(p.deltaTime / 1000);

        let cvxz = getXZ(character.velocity);
        if (cvxz.magSq() > maxMovementSpeed * maxMovementSpeed) {
            cvxz.setMag(maxMovementSpeed);
            character.velocity = p.createVector(cvxz.x, character.velocity.y, cvxz.z);
        }

        p.ambientLight(120, 120, 120);
        p.directionalLight(p.color(175, 175, 175), p.createVector(1, -3, -2))

        p.background(20, 30, 40);

        camera.addToScene(p);

        terrain.forEach(t => t.addToScene(p));
        trees.forEach(t => t.addToScene(p));
    }

});