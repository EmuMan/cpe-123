class Monster2D extends P5Mesh2D {

    time;
    movementRadius;
    movementSpeed;

    constructor(location, rotation, scale) {
        super('monster', location, rotation, scale, null, null);
        this.time = 0;
        this.movementRadius = 40;
        this.movementSpeed = 3;
    }

    drawMesh(instance) {
        const theta = this.time * this.movementSpeed;
        instance.translate(Math.cos(theta) * this.movementRadius,
                           Math.sin(theta) * this.movementRadius);
        
        //body
        instance.fill(50);
        instance.beginShape();
        instance.curveVertex(50, 175);
        instance.curveVertex(50, 175);
        instance.curveVertex(70, 140);
        instance.curveVertex(100, 150);
        instance.curveVertex(135, 140);
        instance.curveVertex(120, 180);
        instance.curveVertex(130, 200);
        instance.curveVertex(125, 240);
        instance.curveVertex(95, 225);
        instance.curveVertex(75, 260);
        instance.curveVertex(60, 235);
        instance.curveVertex(25, 200);
        instance.curveVertex(40, 215);
        instance.curveVertex(10, 180);
        instance.endShape(instance.CLOSE);
        
        //face	
        instance.fill(255);
        instance.ellipse(75, 160, 5, 15);
        instance.ellipse(90, 160, 5, 15);
    }

    update(deltaTime) { this.time += deltaTime; }

}

class Person2D extends P5Mesh2D {

    surprised;

    leftEyeLoc;
    rightEyeLoc;

    constructor(location, rotation, scale) {
        super('Person2D', location, rotation, scale, null, null);
        this.surprised = false;
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
        if (this.surprised) instance.ellipse(300, 275, 10);
        else instance.ellipse(300, 275, 10, 5);

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

function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
}

const states = {
    INITIAL: 'initial',
    MONSTER_MOVE: 'monster_move',
    WAIT_FOR_PLAYER_CLICK: 'wait_for_player_click',
    PERSON_MOVE: 'person_move'
}

const openingScene = new Scene('opening_scene', function(scene) {

    let c;
    let p;

    let font;

    let person;
    let monster;
    let stars;
    let trees;

    let state;

    const starCount = randomBetween(200, 300);
    const treeCount = randomBetween(80, 150);

    function onMouseClick() {
        if (state === states.INITIAL && p.mouseX > 150 &&
            p.mouseX < 450 && p.mouseY > 350)  state = states.MONSTER_MOVE;
        else if (state === states.WAIT_FOR_PLAYER_CLICK &&
                 p.mouseX > 275 && p.mouseX < 325 && p.mouseY > 240 && p.mouseY < 350)
            state = states.PERSON_MOVE;
    }

    scene.load = (instance, canvas) => {
        c = canvas;
        p = instance;

        state = states.INITIAL;

        p.mousePressed = onMouseClick;

        person = new Person2D(p.createVector(), 0, 1);
        monster = new Monster2D(p.createVector(-130, 0), 0, 0.75);

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

        font = p.loadFont('./scenes/assets/FreeSans.ttf', function () { scene.ready = true; });
    };

    scene.unload = function () {
        p = null;
        c = null;

        person = null;
        monster = null;
    }

    scene.draw = function () {
        convertScene(p);

        monster.update(p.deltaTime / 1000);

        if (state === states.MONSTER_MOVE) {
            if (monster.location.x > 150) {
                state = states.WAIT_FOR_PLAYER_CLICK;
                person.surprised = true;
                monster.location.x = 150;
            } else {
                monster.location.x += 300 * (p.deltaTime / 1000);
            }
        } else if (state === states.PERSON_MOVE) {
            if (person.location.x > p.width) {
                scene.sceneManager.load('tiles');
                return;
            }
            person.location.x += 300 * (p.deltaTime / 1000);
        }

        p.background(20);

        // ground
        p.fill(0, 100, 0)
        p.rect(0, 150, p.width, 250)

        stars.forEach(s => s.addToScene(p));
        trees.forEach(t => t.addToScene(p));

        person.addToScene(p);
        
        // text box
        p.fill(0);
        p.quad(0, 350, p.width, 350, p.width, p.height, 0, p.height);
        p.fill(255);
        p.noStroke();
        p.quad(p.width / 4, 350, 3 * p.width / 4, 350, 3 * p.width / 4, p.height, p.width / 4, p.height);
        // text
        p.textFont(font);
        p.fill(0);
        switch (state) {
            case states.INITIAL:
            case states.MONSTER_MOVE:
                p.textSize(60);
                p.text("Start", 230, 397.5);
                break;
            case states.WAIT_FOR_PLAYER_CLICK:
            case states.PERSON_MOVE:
                p.textSize(10);
                p.text("You are running through the woods being chased by a monster", 160, 365);
                p.text("You need to find to a way to both escape and defeat them", 170, 380);
                p.text("Click on the player to begin your journey", 210, 395);
        }
    }

});