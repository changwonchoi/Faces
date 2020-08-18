function Enemy(x,y,id){
    this.pos = createVector(x,y);
    this.vel = createVector(3 ,0);
    this.w = 30;
    this.h = 24;
    this.id = id;
    this.randomShoot = int(random(100,200));

    if(this.id == 0){
        this.img = loadImage('images/UFO-R.png');
    }else if(this.id == 1){
        this.img = loadImage('images/UFO-B.png');
    }
    
    this.update = function(){        
        if(id == 0 && frameCount % this.randomShoot == 0){
            this.shoot();
        }
        this.pos.add(this.vel);
        this.display();
    }
    
    this.move = function(){
        this.vel.x*=-1;
    }
    
    this.display = function(){
        image(this.img,this.pos.x,this.pos.y,this.w,this.h);
    }
     
    this.shoot = function(){
        lasers.push(new EnemyLaser(this.pos.x,this.pos.y));
    }
    
    
}
 
