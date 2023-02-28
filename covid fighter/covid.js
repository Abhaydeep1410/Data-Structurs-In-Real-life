function loadimg(){
    corona_img=new Image();
    corona_img.src='corona.jpeg';
    
    heroimg=new Image();
    heroimg.src='hero.webp';
    
    heroineimg=new Image();
    heroineimg.src='heroine.png';
    
}


function checkcollision(rect1,rect2){
    if(rect1.x +10< rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x +10 &&
    rect1.y +20< rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y+20){
        return true;
    }
    return false;
}



function init(){
    score=100;
    gameover=false;
     mycanvas=document.getElementById("mycanvas");
    w=mycanvas.width=900;
    h=mycanvas.height=600;
    pen=mycanvas.getContext('2d');
    
    
    
    enemy1={
        x:250,
        y:50,
        w:60,
        h:60,
        speed:30
    };
    enemy2={
        x:450,
        y:50,
        w:60,
        h:60,
        speed:60
    };
    enemy3={
        x:650,
        y:50,
        w:60,
        h:60,
        speed:-40
    };
    enemy=[enemy1,enemy2,enemy3];
    
    
    hero={
        x:30,
        y:250,
        w:60,
        h:60,
        speed:30,
        moving:false,
        health:100
    };
    
    heroine={
        x:w-100,
        y:250,
        w:60,
        h:60,
    }
    
    mycanvas.addEventListener('mousedown',function(){
                hero.moving=true;
                              });
    mycanvas.addEventListener('mouseup',function(){
                hero.moving=false;
                              });
    
    
}
function draw(){
    pen.clearRect(0,0,w,h);
    
    for(var i=0;i<enemy.length;i++){
    pen.drawImage(corona_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
        
    }
    
    
    pen.drawImage(heroimg,hero.x,hero.y,hero.w,hero.h);
    pen.drawImage(heroineimg,heroine.x,heroine.y,heroine.w,heroine.h);
    
    
    
    pen.font="40px Roboto";
    pen.fillStyle="black";
    pen.fillText(hero.health,40,40);
}
function update(){
    

    
    for(var i=0;i<enemy.length;i++){
        enemy[i].y+=enemy[i].speed;
        
        if(enemy[i].y>=h-enemy[i].h ||enemy[i].y<=0){
            enemy[i].speed*=-1;
        }
        
    }
    
    if(hero.moving==true){
    hero.x+=hero.speed;
    hero.health+=20;}
    //to check collision between hero and heroine
//    if(Math.abs(hero.x-heroine.x)<=hero.w-20 && Math.abs(hero.y-heroine.y)<=hero.h){
//        gameover=true;
//    }
    
    if(checkcollision(hero,heroine)){
        gameover=true;
    }
    
    //to check collision between hero and virus
    for(var i=0;i<enemy.length;i++){
    if(checkcollision(hero,enemy[i])){
        hero.health-=50;

    }
    if(hero.health<0){
        gameover=true;
    }
        
    }
    
    
}
function gameloop(){
    if(gameover==true){
        
        alert("game finished Your score is "+(hero.health-20));
        
        clearInterval(f);
        return;
    }
    draw();
    update();
}

loadimg();
init();

var f = setInterval(gameloop,100);
