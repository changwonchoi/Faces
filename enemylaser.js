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
		var d = ship.pos.dist(this.pos);
            return (d < 50);
	}
}