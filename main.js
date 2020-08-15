var ship;
var lasers = [];
var enemies = [];
var stars = [];
var is_start = false;

function setup(){
    var gameScreen = createCanvas(800,600);
    gameScreen.parent("game-screen");
    gameScreen.id("game");
    gameScreen = document.getElementById("game");
    var context = gameScreen.getContext("2d");
    var button = {
        x:width/2-100,
        y:height/2+40,
        width:200,
        height:55
    };
    gameScreen.addEventListener('click', function(evt) {
        var mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            init().then(function(){start();});
        }
    }, false);

    gameScreen.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            gameScreen.style.cursor="pointer";
        }
        else {
            gameScreen.style.cursor="default"
        }
    }, false);

    noLoop();
}

function start() {
    is_start = true;
    ship = new Ship();
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,50,i % 2));
    }
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,120,i % 2));
    }
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,190,i % 2));
    }
    loop();
}

//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function draw(){
    background(0);

    if (is_start) {
        noStroke();
        if(enemies.length == 0){
            fill(0,255,0);
            textSize(100);
            text("You win!", width/2-200,height/2);
        }else if(ship.hp <0){
            fill(255,0,0);
            textSize(100);
            text("You lose!", width/2-200,height/2);
        }

        var maxX = enemies[0].pos.x;
        var minX = enemies[0].pos.x;
        var rightI = 0;
        var leftI = 0;

        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].pos.x > maxX){
                maxX = enemies[i].pos.x;
                rightI = i;
            }
            if(enemies[i].pos.x < minX){
                minX = enemies[i].pos.x;
                leftI = i;
            }
        }

        for(let i = 0; i < enemies.length; i++){
            if(enemies[rightI].pos.x > width-10){
                 enemies[i].move();
            }else if(enemies[leftI].pos.x < 10){
                 enemies[i].move();
            }
            enemies[i].update();
         }

        if(stars.length <= 100){
            stars.push(new Star());
        }

        for( let i = 0; i < stars.length; i++){
            stars[i].update();

            if(stars[i].isOffScreen()){
                stars[i] = new Star();
            }
        }

        for(let i = lasers.length-1; i>= 0; i--){
            lasers[i].update();
            for(let j = enemies.length -1; j>=0; j--){
                if(lasers[i] && lasers[i].touching(enemies[j])){
                    enemies.splice(j,1);
                    lasers.splice(i,1);
                }
            }
            if(lasers[i] && lasers[i].isOffScreen()){
                lasers.splice(i,1);
            }
        }
        ship.update();

        if (ship.hp > 0) {
            if (frameCount % 20 == 0) {
                lasers.push(new Laser(ship.pos.x,ship.pos.y));
            }
            switch (move) {
                case "Left":
                ship.vel.x = -ship.speed;
                break;
                case "Right":
                ship.vel.x = ship.speed;
                break;
                case "Stay":
                ship.vel.x = 0;
                break;
                default:
                ship.vel.x = 0;
                break;
            }
        }
    }
    else {
        fill(255,255,0);
        textSize(80);
        text("Motion shooter",width/6-10,height/2-10);
        strokeWeight(4);
        stroke(192 ,192,192);
        noFill();
        rect(width/2-100,height/2+40,200,55,15);
        fill(192,192,192);
        textSize(45);
        text("PLAY",width/2-54,height/2+84);
    }
}
