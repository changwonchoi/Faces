function EnemyLaser(x,y){
	this.pos = createVector(x,y);
	this.vel = createVector(0,5);
	this.w = 10;
	this.h = 20;
	this.img = loadImage('images/laser.png');

	this.update = function(){
		this.pos.add(this.vel);
		this.display();
	}

	this.display = function(){
		image(this.img,this.pos.x,this.pos.y,this.w,this.h)
	}

	this.isOffScreen = function(){
		return this.pos.y > height+20;
	}

	this.touching = function(ship){
        var check_left_hor = (this.pos.x) >= ship.pos.x && (this.pos.x) <= ship.pos.x+ship.w;
        var check_right_hor = (this.pos.x+10) >= ship.pos.x && (this.pos.x+10) <= ship.pos.x+ship.w;
        var check_top_ver = this.pos.y >= ship.pos.y && this.pos.y <= ship.pos.y+ship.h;
        var check_bottom_ver = (this.pos.y+20) >= ship.pos.y && (this.pos.y+20) <= ship.pos.y+ship.h;
        return ((check_left_hor || check_right_hor) && (check_top_ver || check_bottom_ver));
	}
}