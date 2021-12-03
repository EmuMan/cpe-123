function convertScene(instance) {
    instance.translate(-instance.width / 2, -instance.height / 2, 0);
}

function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
}

const tilesScene = new Scene('tiles', function(scene) {

    let c;
    let p;

    let font;

    function onMouseClick() {
        
    }

    scene.load = (instance, canvas) => {
        c = canvas;
        p = instance;

        p.mousePressed = onMouseClick;

        font = p.loadFont('./scenes/assets/FreeSans.ttf', function () { scene.ready = true; });
    };

    scene.unload = function () {
        p = null;
        c = null;
    }

    scene.draw = function () {
        convertScene(p);

        p.background(20);
        
        // text box
        p.fill(0);
        p.quad(0, 350, p.width, 350, p.width, p.height, 0, p.height);
        p.fill(255);
        p.noStroke();
        p.quad(p.width / 4, 350, 3 * p.width / 4, 350, 3 * p.width / 4, p.height, p.width / 4, p.height);
        // text
        p.textFont(font);
        p.fill(0);
        p.textSize(10);
		p.text("Click on the tiles to make your way to the door", 180, 365);
		p.text("Be careful, a wrong click could be fatal", 200, 380);
		p.textSize(6);
		p.text("hint: white tiles only, straight path", 230, 392);
    }

});