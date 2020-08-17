function Laser(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,-10);
    this.w = 10;
    this.h = 20;
    this.img = loadImage('images/missile.png');
    
    this.update = function(){
        this.pos.add(this.vel);
        this.display();
    }
    
    this.display = function(){
        image(this.img,this.pos.x-5,this.pos.y,this.w,this.h);
    }
    
    this.isOffScreen = function(){
        return this.pos.y <= -20;
    }
    
    this.touching = function(enemy){
        var d = this.pos.dist(enemy.pos);
        return (d < 24);
    }
}