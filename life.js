function Life(x,y) {
	this.pos = createVector(x,y);
	this.w = 30;
    this.h = 26;
    this.img = loadImage('images/heart.png');

    this.display = function(){
        image(this.img,this.pos.x,this.pos.y,this.w,this.h);
    }
}