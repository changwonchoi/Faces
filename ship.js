function Ship(){
    this.pos = createVector(width/2,height-50);
    this.w = 30;
    this.h = 50;
    this.hp = 3;
    this.speed = 6;
    this.vel = createVector(0,0);
    this.img = loadImage('images/ship.png');    
    
    this.update = function(){
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x,this.w/2,width-this.w/2);
        this.display();
    }
    
    this.display = function(){
        image(this.img,this.pos.x-this.w/2,this.pos.y-5,this.w,this.h);
    }
}