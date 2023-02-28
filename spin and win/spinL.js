// use phaser as framework
//hello world of phaser = basic game= single screen of spin and win game
// how to create a basic skeleton for the game loop

let prizes={
  count:10,
    prizes_names:["700","200","500","100","800","200","jackpot","500","900","100"]
};

let config={
    type: Phaser.CANVAS,
    width:800,
    height:700,
    backgroundColor:0xfcc,
    scene:{
        preload: preload,
        create:create,
        update:update
    }
};

let game= new Phaser.Game(config);


function preload(){
    this.load.image('background','background.avif');
    
    this.load.image('wheel','wheel2.png');
    
    this.load.image('pin','pin.webp');
    
}

function create(){
    
    W=game.config.width;
    H=game.config.height;
    
    let back=this.add.sprite(W/2,H/2,'background');
    back.scaleX=1.8;

    this.wheel=this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.4);
    
    let pin=this.add.sprite(W/2+16,H/2-260,'pin');
    pin.setScale(0.27);
    
    
    //creating event listner for mouse click
    this.input.on("pointerdown",spinwheel, this);
    
    
    
    //create a text object
    font_style={
        font: "Bold 40px Arial",
            align: "center",
                color:"red",
        paddingLeft:30,
    }
    this.gametext=this.add.text(10,10,"click to spin and win rewards",font_style);
    
}


function update(){
// this.wheel.angle+=1;
    
    
}



function spinwheel(){
// this.gametext.setText("Hurrah! you win this price");
    
    //generate a random number
    let rounds =Phaser.Math.Between(2,4);
    let degree=Phaser.Math.Between(0,9)*30;
    
    let totalangle=rounds*360+degree;
    
    
    let idx=prizes.count-1-Math.floor(degree/(360/prizes.count));
    
    tween=this.tweens.add({
        targets: this.wheel,
        angle:totalangle,
        duration:3000,
        ease: "Cubic.easeOut",
        callbackScope:this,
        onComplete:function(){
            this.gametext.setText("yeh you won "+ prizes.prizes_names[idx]);
        }
    });
}