canvas=document.getElementById("mycanvas");

function init(){
score=0;
gameover=false;
	
	//dont change
	W=canvas.width=600;
	H=canvas.height=600;
pen=canvas.getContext('2d');

cs=32;
food=getRandomFood();

//add a event listener
function keypressed(e){
			if(e.key=="ArrowRight"){
				snake.direction="right";
			}
			else if(e.key=="ArrowLeft"){
				snake.direction="left";				
			}
			else if(e.key=="ArrowUp"){
				snake.direction="Top";				
			}
			else if(e.key=="ArrowDown"){
				snake.direction="down";				
			}

}


document.addEventListener('keydown',keypressed);





snake={
	init_len:14,
	color:"blue",
	cell:[],
	direction:"right",


	createSnake:function(){
		for(var i=this.init_len;i>0;i--){
			this.cell.push({x:i,y:0});
		}
	},

	drawSnake:function(){
		for(var i=0;i<this.cell.length;i++){
			pen.fillStyle=this.color;
		pen.fillRect(this.cell[i].x*cs,this.cell[i].y*cs,cs-4,cs-4);
	}
	},

	updateSnake:function(){

//if food get eaten
		var headx=this.cell[0].x;
		var heady=this.cell[0].y;
		if(headx==food.x && heady==food.y){
			//food eaten
			food=getRandomFood();


			score++;
		}
else{
	this.cell.pop();
}


		// this.cell.pop();
		// var headx=this.cell[0].x;
		// var heady=this.cell[0].y;
		// var  X=headx+1;
		// var Y=heady;
		// this.cell.unshift({x:X,y:Y});

// to make changes when key pressed//
		
		var nextx, nexty;
		if(this.direction=="right"){
			nextx=headx+1;
			nexty=heady;
		}
		else if(this.direction=="left"){
			nextx=headx-1;
			nexty=heady;	
		}
		else if(this.direction=="Top"){
			nextx=headx;
			nexty=heady-1;	
		}
		else {
			nextx=headx;
			nexty=heady+1;	
		}

//to check snake not collide with itself
		
for(var i=0;i<this.cell.length;i++){

				if(nextx==this.cell[i].x && nexty==this.cell[i].y ){
					gameover=true;

				}
			}

		this.cell.unshift({x:nextx,y:nexty});

			

		//to set boundary conditions
		var lastx=Math.round(W/cs);
		var lasty=Math.round(H/cs);

		if(this.cell[0].y<0||this.cell[0].x<0 ||this.cell[0].y>=lasty||this.cell[0].x>=lastx){
			gameover=true;
		}



	}
};
snake.createSnake();



}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle=food.color;
	pen.drawImage(foodimg,food.x*cs,food.y*cs,cs-4,cs-4);


	
	pen.font="40px Roboto ";
	pen.fillSyle='black';
	pen.fillText(score,20,50);

	pen.drawImage(scoreimg,15,50,cs,cs);
}


function update(){

	snake.updateSnake();

}


function getRandomFood(){
	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);

	foodimg=new Image();
	foodimg.src='whole-apple.png';

	scoreimg=new Image();
	scoreimg.src='test-failed.png';



	var food={
		x:foodX,
		y:foodY,
		color:"red"

	};
	return food;
}


function gameloop(){
	
if(gameover==true){
	clearInterval(f);
	alert("game over");
	return ;
}

draw();
update();
}

init();
var f=setInterval(gameloop,100);
