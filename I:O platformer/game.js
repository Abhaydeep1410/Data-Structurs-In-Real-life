let config={
    type: Phaser.AUTO,
    scale:{
        //mode to fit the game into screen
        mode:Phaser.Scale.FIT,
        width: 1000,
        height: 600,
    },
    
    backgroundColor: 0xffffcc,
    
    
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:1000,
                
            },
            //debug:true
        }
        
    },
    
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
    
    
    

};

let game=new Phaser.Game(config);
let player_config={
    playerspeed:250,
    
    playerjumpSpeed:500
};





function preload(){
    this.load.image("ground","Assets/topground.png");
    this.load.image("sky","Assets/background.png");
    
    
    this.load.spritesheet("player","Assets/dude.png",{frameWidth:32,frameHeight:48});
    
    this.load.image("apple","Assets/apple.png");
    
    this.load.image("ray","Assets/ray.png")
    this.load.image("maxmin","Assets/maxMin.jpg");
    
}

function create(){
    W=game.config.width;
    H=game.config.height;
    
    //use tileSprite to repeat the image
    let ground=this.add.tileSprite(0,H-128,W,128,'ground');
        
    //use set origin to 0,0 because origin will set to center of image by default
        ground.setOrigin(0,0);
    
    
//    let background=this.add.tileSprite(0,0,W,H,'sky');
//    background.setOrigin(0,0);
//    background.depth=-1;
    //or
    
    let background=this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.displayWidth=W;
    background.displayHeight=H;
    background.depth=-2;
    
//add image and apply physics also    
this.player=this.physics.add.sprite(100,100,'player',/*which sprite pic shown default*/ 4 );
//not using let player using this.player so that player can be used in other functions    

    
    // add group of apples , we want apples as physical objects//
    let apples=this.physics.add.group({
       key:"apple",
        repeat:8,
        setScale:{x:0.3,y:0.3},
        setXY: {x:10,y:0,stepX:100}
    });
    
    
    
    
    
    
    
    //    this.physics.add.existing(ground);
//    console.log(ground);
//    // we can check body element of ground in console of browser//
//    ground.body.allowGravity=false;
//    ground.body.immovable=true;
    // .... or...//
    
//    this.physics.add.existing(ground,true);  commented as we added ground to the platforms created later
    // means static == true ground becomes static body
    
    
    //add collision between player and ground
    this.physics.add.collider(ground,this.player);
    this.physics.add.collider(ground,apples);
    
    
    this.player.setBounce(0.5);
    //add bouncing effect
    
    apples.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.7))
    });
    
    
    //add more platforms
    let platforms=this.physics.add.staticGroup();
    platforms.create(600,400,'ground').setScale(2,0.5).refreshBody();
    platforms.create(700,200,'ground').setScale(2,0.5).refreshBody();
    platforms.create(100,200,'ground').setScale(2,0.5).refreshBody();
    platforms.add(ground);
    //we can add ground to platforms also
    
    
    this.physics.add.collider(platforms,apples);
    this.physics.add.collider(platforms,this.player);
    
    
    
    
    //player animations//
    //keyboard
    this.cursors=this.input.keyboard.createCursorKeys();
    
    //add animation on left and right movement
    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('player',{start:0, end:3}),
        frameRate:10,
        repeat:-1
    });
    this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('player',{start:5, end:8}),
        frameRate:10,
        repeat:-1,
    });
    this.anims.create({
        key:'center',
        frames: this.anims.generateFrameNumbers('player',{start:4, end:4}),
        frameRate:10
        
    });
    
    
    
    //ovelap between apples and player
    //overlap can accept 5 argument 3rd argument is function which will call
    this.physics.add.overlap(this.player,apples,eatFruits,null,this);
    
    
    //collides with the boundary of the world
    this.player.setCollideWorldBounds(true);
    
    //creating cameras
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    this.cameras.main.startFollow(this.player,true,true);
    //this.cameras.main.setZoom(1.5);
    
    
    //adding sunset
    let rays=[];
    for(let i=-10;i<=10;i++){
    let ray=this.add.sprite(W/2,H-128,'ray');
        ray.displayHeight=1.5*H;
    ray.setOrigin(0.5,1);
    ray.alpha=0.2;
    ray.angle=i*20;
        ray.depth=-1;
        rays.push(ray);
    }
    
    //rotating the sunset
    this.tweens.add({
       targets:rays,
        props:{
            angle:{
                value:"+=20"
            },
        },
        duration:8000,
        repeat:-1
    });
    
    
    
    
    //adding maximize button
    let maxmin=this.add.sprite(50,50,'maxmin').setInteractive();
    maxmin.setScale(0.1);
    
    maxmin.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                maxmin.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                maxmin.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);
    

var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen)
            {
                maxmin.setFrame(0);
                this.scale.stopFullscreen();
            }
            else
            {
                maxmin.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);
    



}

function update(){
    
    if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.playerspeed); 
        this.player.anims.play('right',true);
    }
    else if(this.cursors.left.isDown){
        this.player.setVelocityX(player_config.playerspeed*-1);
        this.player.anims.play('left',true);
    }
     else{
         this.player.setVelocityX(0);
         this.player.anims.play('center',true);
     }
    
    //add jumping ability && stop the player when in air
    if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(player_config.playerjumpSpeed*-1);
    }
    
    
}


function eatFruits(player,fruit){
    fruit.disableBody(true,true);
    //first parameter deactivate the game object 
    //second parameter hide the object fromt the screen
    
}