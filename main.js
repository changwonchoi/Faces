var ship;
var lasers = [];
var enemies = [];
var stars = [];
var is_start = false;
var is_pause = false;
var gameScreen, button, start_btn_clicked, start_btn_hovering, quit_btn_clicked, quit_btn_hovering;

function setup(){
    gameScreen = createCanvas(800,600);
    gameScreen.parent("game-screen");
    gameScreen.id("game");
    gameScreen = document.getElementById("game");
    button = {
        x:width/2-100,
        y:height/2+40,
        width:200,
        height:55
    };
    gameScreen.addEventListener('click', start_btn_clicked = function(evt) {
        var mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            init().then(function(){start();});
        }
    }, false);

    gameScreen.addEventListener('mousemove', start_btn_hovering = function(evt) {
        mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            gameScreen.style.cursor="pointer";
        }
        else {
            gameScreen.style.cursor="default"
        }
    }, false);
}

function start() {
    is_start = true;
    is_pause = false;
    gameScreen.removeEventListener('click', start_btn_clicked);
    gameScreen.removeEventListener('mousemove', start_btn_hovering);
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
}

function pause() {
    is_not_pause = false;
    is_pause = true;
    gameScreen.addEventListener('click', quit_btn_clicked = function(evt) {
        var mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            quit_game();
        }
    }, false);

    gameScreen.addEventListener('mousemove', quit_btn_hovering = function(evt) {
        mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            gameScreen.style.cursor="pointer";
        }
        else {
            gameScreen.style.cursor="default"
        }
    }, false);
}

function unpause() {
    is_not_pause = false;
    is_pause = false;
}

function quit_game() {
    is_start = false;
    is_pause = false;
    ship = null;
    lasers = [];
    enemies = [];
    gameScreen.removeEventListener('click', quit_btn_clicked);
    gameScreen.removeEventListener('mousemove', quit_btn_hovering);

    gameScreen.addEventListener('click', start_btn_clicked = function(evt) {
        var mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            start();
        }
    }, false);

    gameScreen.addEventListener('mousemove', start_btn_hovering = function(evt) {
        mousePos = getMousePos(gameScreen, evt);

        if (isInside(mousePos,button)) {
            gameScreen.style.cursor="pointer";
        }
        else {
            gameScreen.style.cursor="default"
        }
    }, false);
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
    if (is_start && !is_pause) {
        noStroke();
        if (enemies.length == 0 || ship.hp <0) {
            is_start = false;
            is_pause = false;
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
    else if (is_pause) {
        if(stars.length <= 100){
            stars.push(new Star());
        }

        for( let i = 0; i < stars.length; i++){
            stars[i].update();

            if(stars[i].isOffScreen()){
                stars[i] = new Star();
            }
        }
        strokeWeight(5);
        stroke(255,255,255);
        fill(255,255,0);
        textSize(70);
        text("MOTION SHOOTER",width/9,height/2-10);
        strokeWeight(4);
        stroke(192 ,192,192);
        noFill();
        rect(width/2-100,height/2+40,200,55,15);
        fill(192,192,192);
        textSize(45);
        text("QUIT",width/2-54,height/2+84);
    }
    else if (!is_start && !is_pause && is_init) {
        if(stars.length <= 100){
            stars.push(new Star());
        }

        for( let i = 0; i < stars.length; i++){
            stars[i].update();

            if(stars[i].isOffScreen()){
                stars[i] = new Star();
            }
        }
        strokeWeight(3);
        stroke(255,255,255);
        if(enemies.length == 0){
            fill(0,255,0);
            textSize(100);
            text("You win!", width/2-195,height/2-15);
        }else if(ship.hp <0){
            fill(255,0,0);
            textSize(100);
            text("You lose!", width/2-200,height/2-15);
        }

        strokeWeight(4);
        stroke(192 ,192,192);
        noFill();
        rect(width/2-100,height/2+40,200,55,15);
        fill(192,192,192);
        textSize(45);
        text("REPLAY",width/2-73,height/2+84);
        noStroke();
    }
    else {
        if(stars.length <= 100){
            stars.push(new Star());
        }

        for( let i = 0; i < stars.length; i++){
            stars[i].update();

            if(stars[i].isOffScreen()){
                stars[i] = new Star();
            }
        }
        strokeWeight(5);
        stroke(255,255,255);
        fill(255,255,0);
        textSize(70);
        text("MOTION SHOOTER",width/9,height/2-10);
        strokeWeight(4);
        stroke(192 ,192,192);
        noFill();
        rect(width/2-100,height/2+40,200,55,15);
        fill(192,192,192);
        textSize(45);
        text("PLAY",width/2-54,height/2+84);
    }
}

// Copyright (c) 2020 by Steven Green (https://codepen.io/stevengreens10/pen/XMyogX)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.