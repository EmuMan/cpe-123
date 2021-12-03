class Monster2D extends P5Mesh2D {

    time;

    constructor(location, rotation, scale) {
        super('monster', location, rotation, scale, null, null);
        this.time = 0;
    }

    drawMesh(instance) {

    }

    update(deltaTime) { this.time += deltaTime; }

}

class Person2D extends P5Mesh2D {

    leftEyeLoc;
    rightEyeLoc;

    constructor(location, rotation, scale) {
        super('Person2D', location, rotation, scale, null, null);
    }

    drawMesh(instance) {
        //head and neck
        instance.fill(219, 190, 150);
        //head
        instance.ellipse(300, 265, 42.5);
        //neck
        instance.rect(295, 285, 10, 10);

        //white of eyes
        instance.fill(255);
        //L
        instance.ellipse(290, 260, 15);
        //R
        instance.ellipse(310, 260, 15);

        this.leftEyeLoc = new p5.Vector(instance.mouseX - 290, instance.mouseY - 260);
        this.rightEyeLoc = new p5.Vector(instance.mouseX - 310, instance.mouseY - 260);

        this.leftEyeLoc.setMag(5);
        this.rightEyeLoc.setMag(5);
    
        //pupils
        instance.fill(0);
        //L
        instance.ellipse(290 + this.leftEyeLoc.x, 260 + this.leftEyeLoc.y, 7.5);
        //R
        instance.ellipse(310 + this.rightEyeLoc.x, 260 + this.rightEyeLoc.y, 7.5);

        //mouth
        instance.fill(0);
        instance.ellipse(300, 275, 10, 5);

        //pants
        instance.fill(0, 0, 100);
        instance.rect(290, 325, 20, 25);
        
        //shirt
        instance.fill(150, 0, 0);
        instance.beginShape();
            instance.curveVertex(300, 290);
            instance.curveVertex(300, 290);
            instance.curveVertex(295, 290);
            instance.curveVertex(285, 310);
            instance.curveVertex(285, 325);
            instance.curveVertex(315, 325);
            instance.curveVertex(315, 310);
            instance.curveVertex(305, 290);
        instance.endShape(instance.CLOSE);
        
        //hands
        instance.fill(219, 190, 150);
        instance.ellipse(290, 325, 10);
        instance.ellipse(310, 325, 10);

        //shoes
        instance.fill(255);
        instance.ellipse(295, 350, 10, 3);
        instance.ellipse(305, 350, 10, 3);
    }

}

class Tree2D extends P5Mesh2D {

    constructor(location, rotation, scale) {
        super('tree', location, rotation, scale);
    }

    drawMesh(instance) {
        instance.fill(70, 40, 20);
        instance.rect(-5, -30, 10, 30);
		instance.fill(0, 50, 0);
		instance.triangle(-15, -20, 0, -45, 15, -20);
		instance.triangle(-13, -30, 0, -55, 13, -30);
		instance.triangle(-11, -40, 0, -65, 11, -40);
    }

}

function convertScene(instance) {
    instance.translate(-instance.width / 2, -instance.height / 2, 0);
}

// can
function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
}

const states = {
    INITIAL: 'initial',
    MONSTER_MOVE: 'monster_move',
    WAIT_FOR_PLAYER_CLICK: 'wait_for_player_click',
    PLAYER_MOVE: 'player_move'
}

const openingScene = new Scene('opening_scene', function(scene) {

    let c;
    let p;

    let person;
    let monster;
    let stars;
    let trees;

    let state;

    const starCount = randomBetween(200, 300);
    const treeCount = randomBetween(80, 150);

    function onMouseClick() {
        if (state === states.INITIAL) {
            
        } else if (state === states.WAIT_FOR_PLAYER_CLICK) {

        }
    }

    scene.load = (instance, canvas) => {
        c = canvas;
        p = instance;

        person = new Person2D(p.createVector(), 0, p.createVector(1, 1));
        monster = new Monster2D(p.createVector(), 0, p.createVector(1, 1));

        person.addChild(monster);

        stars = [];
        trees = [];

        for (let i = 0; i < starCount; i++) {
            stars.push(new P5Ellipse2D(`star_${i}`,
                                       p.createVector(p.random(600), p.random(150)),
                                       0,
                                       p.createVector(1, 1),
                                       p.color(180),
                                       p.random(0.3, 1.4) * 2.5));
        }

        for (let i = 0; i < treeCount; i++) {
            trees.push(new Tree2D(p.createVector(p.random(600), p.random(160, 175)),
                                                 0, p.random(0.4, 0.8)));
        }

        scene.ready = true;
    };

    scene.unload = function () {
        p = null;
        c = null;

        person = null;
        monster = null;
    }

    scene.draw = function () {
        convertScene(p);

        p.background(20);

        // ground
        p.fill(0, 100, 0)
        p.rect(0, 150, p.width, 250)

        person.addToScene(p);
        monster.addToScene(p);

        stars.forEach(s => s.addToScene(p));
        trees.forEach(t => t.addToScene(p));
    }

});