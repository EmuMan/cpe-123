//move/transition between scenes
var scene1x = 0;
var scene1y = 0;
var move_scene1;
var scene2x = 0;
var scene2y = 0;
var move_scene2;
var scene3x = 0;
var scene3y = 0;
var move_scene3;
//go back in and manually input the code for Jimmy's scenes 
var scene4x = 0;
var scene4y = 0;
var move_scene4;
var scene5x = 0;
var scene5y = 0;
var move_scene5;
var bx;
var by;
var scene6x = 0;
var scene6y = 0;
var move_scene6;
var sceneLastInx = 0;
var sceneLastIny = 0;
var move_sceneLastIn;
var sceneOutdoorx = 0;
var sceneOutdoory = 0;
var move_sceneOutdoor;
var sceneWINx = 0;
var sceneWINy = 0;
var move_sceneWINT;

var clicktiles;
var lastTile;
var deathscene;
var tileCol;
var tileCol2;
var tileCol3;
var tileCol4;
var tileCol5;
var tileCol6;


//stars and tree background

//stars
var left_starX = []
var left_starY = []
var right_starX = []
var right_starY = []
var starX = []
var starY = []
var starSc = []
var num_stars
//tree background
var treeX = []
var treeY = []
var treeSc = []
var num_trees


//monster
var dir;
var loc;
var sc;
var col;
var theta;

//add stairs to front of the house below the door

function setup() {
	createCanvas(600, 400);

	//move scenes
	move_scene1 = false;
	move_scene2 = false;
	move_scene3 = false;
	move_scene4 = false;
	move_scene5 = false;
	move_scene6 = false;
	move_sceneLastIn = false;
	move_sceneOutdoor = false;
	deathscene = false;
	clicktiles = false;
	lastTile = false;

	tileCol = color(240, 240, 240);
	tileCol2 = color(240, 240, 240);
	tileCol3 = color(240, 240, 240);
	tileCol4 = color(240, 240, 240);
	tileCol5 = color(240, 240, 240);
	tileCol6 = color(240, 240, 240);


	//stars and trees 
	num_stars = random(200, 300)
	num_trees = random(80, 150)

	for (var i = 0; i < num_stars; i++) {
		left_starX.push(random(150, 220))
		left_starY.push(random(50, 100))
		starX.push(random(0, 600))
		starY.push(random(2, 150))
		right_starX.push(random(430, 500))
		right_starY.push(random(50, 100))
		starSc.push(random(.3, 1.4))
	}

	for (var i = 0; i < num_trees; i++) {
		treeX.push(random(0, 600))
		treeY.push(random(160, 175))
		treeSc.push(random(.4, .8))
	}

	//monster
	loc = createVector(250, 250);
	dir = createVector(0, 0);
	theta = 0;
	sc = .75;
	col = color(50);



	noStroke();
}

function draw() {
	var leftEye;
	var rightEye;
	var next = createVector();

	push();
	translate(scene1x, scene1y);
	background(100)

	//starting page	
	//trees
	fill(30)
	rect(0, 0, width, 150)
	fill(0, 100, 0)
	rect(0, 150, width, 250)

	for (var i = 0; i < num_stars; i++) {
		push()
		translate(starX[i], starY[i])
		scale(starSc[i])


		fill(180)
		noStroke()
		ellipse(0, 0, 2.5)
		pop()
	}

	for (var i = 0; i < num_trees; i++) {
		push()
		translate(treeX[i], treeY[i])
		scale(treeSc[i])

		fill(70, 40, 20)
		rect(-5, -30, 10, 30)
		fill(0, 50, 0)
		triangle(-15, -20, 0, -45, 15, -20)
		triangle(-13, -30, 0, -55, 13, -30)
		triangle(-11, -40, 0, -65, 11, -40)
		pop()
	}

	//person
	//head and neck
	fill(219, 190, 150);
	//head
	ellipse(300, 265, 42.5);
	//neck
	rect(295, 285, 10, 10);

	//white of eyes
	fill(255);
	//L
	ellipse(290, 260, 15);
	//R
	ellipse(310, 260, 15);

	leftEye = createVector(mouseX - 290, mouseY - 260);
	leftEye.normalize();
	leftEye.mult(5)

	rightEye = createVector(mouseX - 310, mouseY - 260);
	rightEye.normalize();
	rightEye.mult(5)

	//pupils
	fill(0);
	//L
	ellipse(290 + leftEye.x, 260 + leftEye.y, 7.5);
	//R
	ellipse(310 + rightEye.x, 260 + rightEye.y, 7.5);

	//mouth
	fill(0);
	ellipse(300, 275, 10, 5)

	//pants
	fill(0, 0, 100);
	rect(290, 325, 20, 25);

	//shirt
	fill(150, 0, 0);
	beginShape();
	curveVertex(300, 290);
	curveVertex(300, 290);
	curveVertex(295, 290);
	curveVertex(285, 310);
	curveVertex(285, 325);
	curveVertex(315, 325);
	curveVertex(315, 310);
	curveVertex(305, 290);
	endShape(CLOSE);

	//hands
	fill(219, 190, 150);
	ellipse(290, 325, 10);
	ellipse(310, 325, 10);

	//shoes
	fill(255);
	ellipse(295, 350, 10, 3);
	ellipse(305, 350, 10, 3);


	//text box
	fill(0);
	quad(0, 350, width, 350, width, height, 0, height);
	fill(255);
	stroke(1);
	quad(width / 4, 350, 3 * width / 4, 350, 3 * width / 4, height, width / 4, height);
	//press start
	fill(0);
	textSize(60);
	noStroke();
	textFont("Helvetica");
	text("Start", 230, 397.5);

	pop();

	if (move_scene1) {
		scene1x += 10;
	}

	if (scene1x > 550) {
		//SCENE 2
		push();
		translate(scene2x, scene2y);
		background(155);

		fill(30)
		rect(0, 0, width, 150)
		fill(0, 100, 0)
		rect(0, 150, width, 250)

		for (var i = 0; i < num_stars; i++) {
			push()
			translate(starX[i], starY[i])
			scale(starSc[i])


			fill(180)
			noStroke()
			ellipse(0, 0, 2.5)
			pop()
		}

		for (var i = 0; i < num_trees; i++) {
			push()
			translate(treeX[i], treeY[i])
			scale(treeSc[i])

			fill(70, 40, 20)
			rect(-5, -30, 10, 30)
			fill(0, 50, 0)
			triangle(-15, -20, 0, -45, 15, -20)
			triangle(-13, -30, 0, -55, 13, -30)
			triangle(-11, -40, 0, -65, 11, -40)
			pop()
		}

		//monster
		drawMonster(loc.x, loc.y, dir.x, dir.y, sc, col);
		theta += -PI / 50;
		next.x = 150 + 50 * sin(theta);
		next.y = 0 + 50 * cos(theta);

		dir.x = next.x - loc.x;
		dir.y = next.y - loc.y;

		// loc.x += dir.x
		// loc.y += dir.y;
		loc.add(dir);

		//text box
		fill(0);
		quad(0, 350, width, 350, width, height, 0, height);
		fill(255);
		stroke(1);
		quad(width / 4, 350, 3 * width / 4, 350, 3 * width / 4, height, width / 4, height);
		//press start
		fill(0);
		textSize(10);
		noStroke();
		textFont("Helvetica");
		text("You are running through the woods being chased by a monster", 160, 365);
		text("You need to find to a way to both escape and defeat them", 170, 380);
		text("Click on the player to begin your journey", 210, 395);

		//person
		//head and neck
		fill(219, 190, 150);
		//head
		ellipse(300, 265, 42.5);
		//neck
		rect(295, 285, 10, 10);
		//white of eyes
		fill(255);
		ellipse(290, 260, 15);
		ellipse(310, 260, 15);

		leftEye = createVector(mouseX - 290, mouseY - 260);
		leftEye.normalize();
		leftEye.mult(5)

		rightEye = createVector(mouseX - 310, mouseY - 260);
		rightEye.normalize();
		rightEye.mult(5)

		//pupils
		fill(0);
		//L
		ellipse(290 + leftEye.x, 260 + leftEye.y, 7.5);
		//R
		ellipse(310 + rightEye.x, 260 + rightEye.y, 7.5);
		//mouth
		fill(0);
		ellipse(300, 275, 10)
		//pants
		fill(0, 0, 100);
		rect(290, 325, 20, 25);
		//shirt
		fill(150, 0, 0);
		beginShape();
		curveVertex(300, 290);
		curveVertex(300, 290);
		curveVertex(295, 290);
		curveVertex(285, 310);
		curveVertex(285, 325);
		curveVertex(315, 325);
		curveVertex(315, 310);
		curveVertex(305, 290);
		endShape(CLOSE);
		//hands
		fill(219, 190, 150);
		ellipse(290, 325, 10);
		ellipse(310, 325, 10);
		//shoes
		fill(255);
		ellipse(295, 350, 10, 3);
		ellipse(305, 350, 10, 3);

		pop();
	}


	if (move_scene2) {
		scene2x += 10

	}

	//SCENE 3
	if (scene2x >= 550) {
		push();
		translate(scene3x, scene3y);

		background(100);

		fill(30)
		rect(0, 0, width, 150)
		fill(0, 100, 0)
		rect(0, 150, width, 250)

		for (var i = 0; i < num_stars; i++) {
			push()
			translate(starX[i], starY[i])
			scale(starSc[i])


			fill(180)
			noStroke()
			ellipse(0, 0, 2.5)
			pop()
		}

		for (var i = 0; i < num_trees; i++) {
			push()
			translate(treeX[i], treeY[i])
			scale(treeSc[i])

			fill(70, 40, 20)
			rect(-5, -30, 10, 30)
			fill(0, 50, 0)
			triangle(-15, -20, 0, -45, 15, -20)
			triangle(-13, -30, 0, -55, 13, -30)
			triangle(-11, -40, 0, -65, 11, -40)
			pop()
		}
		//monster
		drawMonster(loc.x, loc.y, dir.x, dir.y, sc, col);
		theta += -PI / 50;
		next.x = 150 + 50 * sin(theta);
		next.y = 0 + 50 * cos(theta);

		dir.x = next.x - loc.x;
		dir.y = next.y - loc.y;

		// loc.x += dir.x
		// loc.y += dir.y;
		loc.add(dir);

		//person
		//head and neck
		fill(219, 190, 150);
		//head
		ellipse(300, 265, 42.5);
		//neck
		rect(295, 285, 10, 10);
		//white of eyes
		fill(255);
		ellipse(290, 260, 15);
		ellipse(310, 260, 15);

		leftEye = createVector(mouseX - 290, mouseY - 260);
		leftEye.normalize();
		leftEye.mult(5)

		rightEye = createVector(mouseX - 310, mouseY - 260);
		rightEye.normalize();
		rightEye.mult(5)

		//pupils
		fill(0);
		//L
		ellipse(290 + leftEye.x, 260 + leftEye.y, 7.5);
		//R
		ellipse(310 + rightEye.x, 260 + rightEye.y, 7.5);
		//mouth
		fill(0);
		ellipse(300, 275, 10)
		//pants
		fill(0, 0, 100);
		rect(290, 325, 20, 25);
		//shirt
		fill(150, 0, 0);
		beginShape();
		curveVertex(300, 290);
		curveVertex(300, 290);
		curveVertex(295, 290);
		curveVertex(285, 310);
		curveVertex(285, 325);
		curveVertex(315, 325);
		curveVertex(315, 310);
		curveVertex(305, 290);
		endShape(CLOSE);
		//hands
		fill(219, 190, 150);
		ellipse(290, 325, 10);
		ellipse(310, 325, 10);
		//shoes
		fill(255);
		ellipse(295, 350, 10, 3);
		ellipse(305, 350, 10, 3);

		//outside of house
		fill(105, 75, 60);
		quad(410, 180, width, 180, width, 350, 410, 350);
		//roof
		fill(105, 75, 60);
		//rect(410, 120, 50, 70);
		//triangle(410, 120, 435, 95, 460, 120)
		triangle(410, 180, 505, 120, width, 180)
		//door
		fill(250, 200, 40);
		rect(460, 225, 75, 170);
		fill(0);
		rect(463, 228, 70, 160);
		fill(250, 200, 40);
		ellipse(525, 290, 10);
		fill(0);
		ellipse(525, 290, 8);



		//try to write the if satement within this one, or if not then right below it

		//text box
		fill(0);
		quad(0, 350, width, 350, width, height, 0, height);
		fill(255);
		stroke(1);
		quad(width / 4, 350, 3 * width / 4, 350, 3 * width / 4, height, width / 4, height);
		//press start
		fill(0);
		textSize(10);
		noStroke();
		textFont("Helvetica");
		text("Run into the house", 250, 365);
		text("There you'll find items to help you defeat the monster ", 170, 380);
		text("Click on the door to enter!", 240, 395);

		pop();

	}

	if (move_scene3) {
		scene3x += 10

	}

	//SCENE 4 (DOORS)
	if (scene3x >= 550) {
		push();
		translate(scene4x, scene4y);
		noStroke();
		fill('#211605');
		rect(0, 300, 600, 100);
		fill(105, 75, 60);
		rect(0, 0, 600, 300);
		strokeWeight(1);
		stroke('#754F12');
		fill('#0F0A02');
		rect(160, 150, 80, 150);
		ellipse(230, 230, 10);
		rect(360, 150, 80, 150);
		ellipse(430, 230, 10);

		fill(255);
		textSize(32);
		text('1', 190, 140);
		text('2', 395, 140);

		//text box
		fill(0);
		quad(0, 350, width, 350, width, height, 0, height);
		fill(255);
		stroke(1);
		quad(width / 4, 350, 3 * width / 4, 350, 3 * width / 4, height, width / 4, height);

		//press start
		fill(0);
		textSize(10);
		noStroke();
		textFont("Helvetica");
		text("Click on a door to continue exploring the house", 175, 365);
		text("Choose the wrong one... and start over again!", 175, 380);
		text("DOOR 1", 275, 395)
		pop();
	}

	if (move_scene4) {
		scene4x += 10
	}


	//SCENE 5 TILES
	if (scene4x >= 550) {
		push();
		translate(scene5x, scene5y)
		//tiles
		//line 1
		fill(240);
		rect(0, 100, 40, 40);
		rect(80, 100, 40, 40);
		rect(160, 100, 40, 40);
		fill(tileCol6);
		rect(240, 100, 40, 40);
		fill(240);
		rect(320, 100, 40, 40);
		rect(400, 100, 40, 40);
		rect(480, 100, 40, 40);
		rect(560, 100, 40, 40);
		rect(640, 100, 40, 40);

		fill(0);
		rect(40, 100, 40, 40);
		rect(120, 100, 40, 40);
		rect(200, 100, 40, 40);
		rect(280, 100, 40, 40);
		rect(360, 100, 40, 40);
		rect(440, 100, 40, 40);
		rect(520, 100, 40, 40);
		rect(600, 100, 40, 40);

		//line 2
		fill(240);
		rect(40, 140, 40, 40);
		rect(120, 140, 40, 40);
		rect(200, 140, 40, 40);
		fill(tileCol5);
		rect(280, 140, 40, 40);
		fill(240);
		rect(360, 140, 40, 40);
		rect(440, 140, 40, 40);
		rect(520, 140, 40, 40);
		rect(600, 140, 40, 40);

		fill(0);
		rect(0, 140, 40, 40);
		rect(80, 140, 40, 40);
		rect(160, 140, 40, 40);
		rect(240, 140, 40, 40);
		rect(320, 140, 40, 40);
		rect(400, 140, 40, 40);
		rect(480, 140, 40, 40);
		rect(560, 140, 40, 40);
		rect(640, 140, 40, 40);

		//line 3
		fill(240);
		rect(0, 180, 40, 40);
		rect(80, 180, 40, 40);
		rect(160, 180, 40, 40);
		fill(tileCol4);
		rect(240, 180, 40, 40);
		fill(240);
		rect(320, 180, 40, 40);
		rect(400, 180, 40, 40);
		rect(480, 180, 40, 40);
		rect(560, 180, 40, 40);
		rect(640, 180, 40, 40);

		fill(0);
		rect(40, 180, 40, 40);
		rect(120, 180, 40, 40);
		rect(200, 180, 40, 40);
		rect(280, 180, 40, 40);
		rect(360, 180, 40, 40);
		rect(440, 180, 40, 40);
		rect(520, 180, 40, 40);
		rect(600, 180, 40, 40);

		//line 4
		fill(240);
		rect(40, 220, 40, 40);
		rect(120, 220, 40, 40);
		rect(200, 220, 40, 40);
		fill(tileCol3);
		rect(280, 220, 40, 40);
		fill(240);
		rect(360, 220, 40, 40);
		rect(440, 220, 40, 40);
		rect(520, 220, 40, 40);
		rect(600, 220, 40, 40);

		fill(0);
		rect(0, 220, 40, 40);
		rect(80, 220, 40, 40);
		rect(160, 220, 40, 40);
		rect(240, 220, 40, 40);
		rect(320, 220, 40, 40);
		rect(400, 220, 40, 40);
		rect(480, 220, 40, 40);
		rect(560, 220, 40, 40);
		rect(640, 220, 40, 40);

		//line 5
		fill(240);
		rect(0, 260, 40, 40);
		rect(80, 260, 40, 40);
		rect(160, 260, 40, 40);
		fill(tileCol2);
		rect(240, 260, 40, 40);
		fill(240);
		rect(320, 260, 40, 40);
		rect(400, 260, 40, 40);
		rect(480, 260, 40, 40);
		rect(560, 260, 40, 40);
		rect(640, 260, 40, 40);

		fill(0);
		rect(40, 260, 40, 40);
		rect(120, 260, 40, 40);
		rect(200, 260, 40, 40);
		rect(280, 260, 40, 40);
		rect(360, 260, 40, 40);
		rect(440, 260, 40, 40);
		rect(520, 260, 40, 40);
		rect(600, 260, 40, 40);

		//line 6
		fill(240);
		rect(40, 300, 40, 40);
		rect(120, 300, 40, 40);
		rect(200, 300, 40, 40);
		fill(tileCol);
		rect(280, 300, 40, 40);
		fill(240);
		rect(360, 300, 40, 40);
		rect(440, 300, 40, 40);
		rect(520, 300, 40, 40);
		rect(600, 300, 40, 40);

		fill(0);
		rect(0, 300, 40, 40);
		rect(80, 300, 40, 40);
		rect(160, 300, 40, 40);
		rect(240, 300, 40, 40);
		rect(320, 300, 40, 40);
		rect(400, 300, 40, 40);
		rect(480, 300, 40, 40);
		rect(560, 300, 40, 40);
		rect(640, 300, 40, 40);

		//line 7
		fill(240);
		rect(0, 340, 40, 40);
		rect(80, 340, 40, 40);
		rect(160, 340, 40, 40);
		rect(240, 340, 40, 40);
		rect(320, 340, 40, 40);
		rect(400, 340, 40, 40);
		rect(480, 340, 40, 40);
		rect(560, 340, 40, 40);
		rect(640, 340, 40, 40);

		fill(0);
		rect(40, 340, 40, 40);
		rect(120, 340, 40, 40);
		rect(200, 340, 40, 40);
		rect(280, 340, 40, 40);
		rect(360, 340, 40, 40);
		rect(440, 340, 40, 40);
		rect(520, 340, 40, 40);
		rect(600, 340, 40, 40);

		//walls
		noStroke();
		fill('#211605');
		rect(0, 340, 600, 60);
		fill('#211605');
		rect(0, 0, 600, 100);
		fill('#362109');
		triangle(0, 350, 0, 0, 100, 0);
		fill('#362109');
		triangle(600, 0, 600, 400, 500, 400);
		//door
		strokeWeight(2);
		stroke('#754F12');
		fill('#0F0A02');
		rect(245, 38, 30, 60);
		strokeWeight(1);
		ellipse(270, 75, 5);

		//sign
		fill('#73500D');
		noStroke();
		rect(130, 40, 70, 30);
		fill(255);
		textSize(9);
		text('watch your', 142, 53);
		text('step', 157, 63);

		//text box
		fill(0);
		quad(0, 350, width, 350, width, height, 0, height);
		fill(255);
		stroke(1);
		quad(width / 4, 350, 3 * width / 4, 350, 3 * width / 4, height, width / 4, height);

		fill(0);
		textSize(10);
		noStroke();
		textFont("Helvetica");
		text("Click on the tiles to make your way to the door", 180, 365);
		text("Be careful, a wrong click could be fatal", 200, 380);
		textSize(6);
		text("hint: white tiles only, straight path", 230, 392);

		pop();
		clicktiles = true;
	}

	if (move_scene5) {
		scene5x += 10;
	}

	//SCENE 6 BAT
	if (scene5x >= 550) {
		push();
		translate(scene6x, scene6y);
		fill(120)
		rect(0, 0, 600, 400)

		push()
		fill(20)
		strokeWeight(2)
		stroke(2550, 255, 0)
		quad(34, 240, 53, 315, 72, 280, 60, 220)
		quad(566, 240, 547, 315, 528, 280, 545, 220)
		noFill()
		ellipse(61, 260, 5)
		ellipse(541, 260, 5)
		pop()


		fill(60)
		quad(100, 225, 0, 400, 600, 400, 500, 225)

		strokeWeight(5)
		line(85, 0, 100, 225)
		line(515, 0, 500, 225)

		draw_bat(330, 310, radians(55))

		pop();
	}

	if (move_scene6) {
		scene6x += 10;
	}

	//LAST INDOOR SCENE
	if (scene6x >= 550) {
		push();
		translate(sceneLastInx, sceneLastIny);
		//windows
		fill(181, 84, 0)
		rect(0, 0, width, 150)
		fill(145, 55, 0)
		rect(0, 150, width, 250)

		fill(60)
		rect(150, 50, 70, 50)
		rect(430, 50, 70, 50)




		for (var i = 0; i < num_stars; i++) {
			push()
			translate(left_starX[i], left_starY[i])
			scale(starSc[i])


			fill(180)
			noStroke()
			ellipse(0, 0, 2)
			pop()
		}


		for (var i = 0; i < num_stars; i++) {
			push()
			translate(right_starX[i], right_starY[i])
			scale(starSc[i])


			fill(180)
			noStroke()
			ellipse(0, 0, 2)
			pop()
		}


		push()
		noFill()
		stroke(200, 200, 40)
		strokeWeight(2.5)
		rect(150, 50, 70, 50)
		rect(430, 50, 70, 50)
		fill(30)
		rect(310, 60, 45, 90)
		noFill()
		strokeWeight(2)
		ellipse(345, 105, 6)
		pop()

		fill(40)
		rect(308, 148, 49, 25)
		push()
		stroke(70)
		strokeWeight(3)
		ellipse(280, 290, 180, 80)
		pop()

		pop();
	}

	if (move_sceneLastIn) {
		sceneLastInx += 10;
	}

	//OUTDOOR SCENE
	if (sceneLastInx >= 550) {
		push();
		translate(sceneOutdoorx, sceneOutdoory);
		fill(30)
		rect(0, 0, width, 150)
		fill(0, 100, 0)
		rect(0, 150, width, 250)

		for (var i = 0; i < num_stars; i++) {
			push()
			translate(starX[i], starY[i])
			scale(starSc[i])


			fill(180)
			noStroke()
			ellipse(0, 0, 2.5)
			pop()
		}


		fill(18)
		rect(0, 220, 20, 120)
		triangle(0, 190, 30, 220, 0, 220)
		rect(0, 316, 27, 8)
		rect(0, 324, 34, 8)
		rect(0, 332, 41, 8)

		for (var i = 0; i < num_trees; i++) {
			push()
			translate(treeX[i], treeY[i])
			scale(treeSc[i])

			fill(70, 40, 20)
			rect(-5, -30, 10, 30)
			fill(0, 50, 0)
			triangle(-15, -20, 0, -45, 15, -20)
			triangle(-13, -30, 0, -55, 13, -30)
			triangle(-11, -40, 0, -65, 11, -40)
			pop()
		}

		pop();
	}

	if (move_sceneOutdoor) {
		sceneOutdoorx += 10;
	}

	if (sceneOutdoorx >= 550) {
		push();
		translate(sceneWINx, sceneWINy);
		//YOU WIN
		background(147, 209, 235);


		//person
		//head and neck
		fill(219, 190, 150);
		//head
		ellipse(300, 265, 42.5);
		//neck
		rect(295, 285, 10, 10);
		//white of eyes
		fill(255);
		ellipse(290, 260, 15);
		ellipse(310, 260, 15);

		leftEye = createVector(mouseX - 290, mouseY - 260);
		leftEye.normalize();
		leftEye.mult(5)

		rightEye = createVector(mouseX - 310, mouseY - 260);
		rightEye.normalize();
		rightEye.mult(5)

		//pupils
		fill(0);
		//L
		ellipse(290 + leftEye.x, 260 + leftEye.y, 7.5);
		//R
		ellipse(310 + rightEye.x, 260 + rightEye.y, 7.5);
		//mouth
		fill(0);
		arc(300, 275, 10, 10, radians(0), radians(180));
		//pants
		fill(0, 0, 100);
		rect(290, 325, 20, 25);
		//shirt
		fill(150, 0, 0);
		beginShape();
		curveVertex(300, 290);
		curveVertex(300, 290);
		curveVertex(295, 290);
		curveVertex(285, 310);
		curveVertex(285, 325);
		curveVertex(315, 325);
		curveVertex(315, 310);
		curveVertex(305, 290);
		endShape(CLOSE);
		//hands
		fill(219, 190, 150);
		ellipse(290, 325, 10);
		ellipse(310, 325, 10);
		//shoes
		fill(255);
		ellipse(295, 350, 10, 3);
		ellipse(305, 350, 10, 3);

		fill(0);
		textSize(61);
		textFont("Helvetica");
		text("YOU WIN", 147.5, 100);
		fill(255);
		textSize(60);
		textFont("Helvetica");
		text("YOU WIN", 150, 100);


		//FIREWORKS

		pop();
	}







	//visualize coordinates
	push();
	translate(mouseX, mouseY);
	strokeWeight(1);
	stroke(0);
	line(-10, 0, 10, 0);
	line(0, -10, 0, 10);
	strokeWeight(0);
	fill(0);
	textSize(10);
	text('x: ' + mouseX, 10, 10);
	text('y: ' + mouseY, 40, 10);
	pop();
}

// draws monster
function drawMonster(x, y, dx, dy, sc, c) {
	push();
	translate(x, y);
	//rotate(atan2(dy, dx)+PI/2);
	scale(sc);

	fill(c);
	//body
	beginShape();
	curveVertex(50, 175);
	curveVertex(50, 175);
	curveVertex(70, 140);
	curveVertex(100, 150);
	curveVertex(135, 140);
	curveVertex(120, 180);
	curveVertex(130, 200);
	curveVertex(125, 240);
	curveVertex(95, 225);
	curveVertex(75, 260);
	curveVertex(60, 235);
	curveVertex(25, 200);
	curveVertex(40, 215);
	curveVertex(10, 180);
	endShape(CLOSE);
	//face	
	fill(255);
	ellipse(75, 160, 5, 15);
	ellipse(90, 160, 5, 15);
	arc()

	pop();
}


function draw_bat(bx, by, rot) {
	push()

	translate(bx, by)
	rotate(rot)

	stroke(0)
	strokeWeight(2)
	fill(246, 169, 98)
	quad(-2.8, -3, -5.5, -50, 5.5, -50, 2.8, -3)
	ellipse(0, 0, 12, 8)
	arc(0, -51, 11, 13, radians(180), radians(360))
	noStroke()
	rect(-4.42, -51, 8.9, 2)

	stroke(0)
	strokeWeight(.6)
	fill(200)
	rect(-2, -8, 4.5, 3)
	rect(-2.2, -11.2, 4.5, 3)
	rect(-2.5, -14.2, 5, 3)

	pop()


}
function mouseClicked() {
	if (mouseX > 150 && mouseX < 450 && mouseY > 350) {
		move_scene1 = true
	}

	if (mouseX > 275 && mouseX < 325 && mouseY > 240 && mouseY < 350) {
		move_scene2 = true
	}

	if (mouseX > 500 && mouseX < 560 && mouseY > 180 && mouseY < 350) {
		move_scene3 = true
	}

	if (mouseX > 160 && mouseX < 240 && mouseY > 150 && mouseY < 300) {
		move_scene4 = true
	}

	if (lastTile = true && mouseX > 245 && mouseX < 275 && mouseY > 35 && mouseY < 100) {
		move_scene5 = true
	}

	//tiles
	if (clicktiles = true && mouseX > 280 && mouseX < 320 && mouseY > 300 && mouseY < 340) {
		tileCol = color(0, 255, 0);
		rect(280, 300, 40, 40);
	}
	else {
		deathscene = true;
	}
	if (clicktiles = true && mouseX > 240 && mouseX < 280 && mouseY > 260 && mouseY < 300) {
		tileCol2 = color(0, 255, 0);
		rect(240, 260, 40, 40);
	}
	else {
		deathscene = true;
	}
	if (clicktiles = true && mouseX > 280 && mouseX < 320 && mouseY > 220 && mouseY < 260) {
		tileCol3 = color(0, 255, 0);
		rect(280, 220, 40, 40);
	}
	else {
		deathscene = true;
	}
	if (clicktiles = true && mouseX > 240 && mouseX < 280 && mouseY > 180 && mouseY < 220) {
		tileCol4 = color(0, 255, 0);
		rect(240, 180, 40, 40);
	}
	else {
		deathscene = true;
	}
	if (clicktiles = true && mouseX > 280 && mouseX < 320 && mouseY > 140 && mouseY < 180) {
		tileCol5 = color(0, 255, 0);
		rect(280, 140, 40, 40);
	}
	else {
		deathscene = true;
	}
	if (clicktiles = true && mouseX > 240 && mouseX < 280 && mouseY > 100 && mouseY < 140) {
		tileCol6 = color(0, 255, 0);
		rect(240, 100, 40, 40);
		lastTile = true;
	}
	else {
		deathscene = true;
	}


	if (mouseX > 320 && mouseX < 380 && mouseY > 273 && mouseY < 315) {
		move_scene6 = true
	}


	if (mouseX > 310 && mouseX < 365 && mouseY > 60 && mouseY < 150) {
		move_sceneLastIn = true
	}

	if (mouseX > 0 && mouseX < 60 && mouseY > 180 && mouseY < 340) {
		move_sceneOutdoor = true
	}


}

//write code for the "YOU WIN" ending - Victoria


//create one more scene between the tiles and escaping scene
	//to get an item to defeat monster - Muhammad

//update final outdoor scene to include monster - Jacob

//write code that makes you start over at the front of the house if you 
	//choose wrong door - Victoria

//update bottom text for each scene to help walk the player through
