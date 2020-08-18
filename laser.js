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
        var check_left_hor = (this.pos.x-5) >= enemy.pos.x && (this.pos.x-5) <= enemy.pos.x+enemy.w;
        var check_right_hor = (this.pos.x+5) >= enemy.pos.x && (this.pos.x+5) <= enemy.pos.x+enemy.w;
        var check_top_ver = this.pos.y >= enemy.pos.y && this.pos.y <= enemy.pos.y+enemy.h;
        var check_bottom_ver = (this.pos.y+20) >= enemy.pos.y && (this.pos.y+20) <= enemy.pos.y+enemy.h;
        return ((check_left_hor || check_right_hor) && (check_top_ver || check_bottom_ver));
    }
}