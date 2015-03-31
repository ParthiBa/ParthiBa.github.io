
var game;
var platfrom;
var itemsInsky;
var dude;
var cursors;
var scoreSound; 
var score=0;
var scoreText;
$(function(){
game= new Phaser.Game(
    800,600,Phaser.AUTO,"",{
    preload:preload,
    create:create,
    update:update      
    
    
    
    
    }            



);

//alert("hello");
//console.log("hello");

});



// loading assests images in hrere 
function preload()
{
    console.log("-->preload");
    game.load.image("star","assets/star.png");
    game.load.image("diamond","assets/diamond.png");
    game.load.image("sky","assets/sky.png");
    game.load.image("ground","assets/platform.png");
    game.load.image("firstaid","assets/firstaid.png");
    game.load.spritesheet("dude","assets/dude.png",32,48);
    game.load.audio("score","assets/score.wav");
}



function create()
{
    console.log("---> create");
    game.physics.startSystem(Phaser.Physics.Arcade);
    
    game.add.sprite(0,0,"sky");
  //  game.add.sprite(50,50,"star");

    // after adding group , use the create funtions)
    platfrom=game.add.group();
    platfrom.enableBody=true;  
   var ledge1=platfrom.create(-150,200,"ground");
    ledge1.body.immovable=true;
   var ledge2= platfrom.create(400,400,"ground");
    ledge2.body.immovable=true;
    
    
    var ground= platfrom.create(0,game.world.height - 64,"ground");
    ground.scale.setTo(2,2);
    //ground.enableBody=true;
        //platfrom.enableBody=true;

    
    dude= game.add.sprite(32,game.world.height-150,"dude");
    dude.animations.add("normal",[5],10,true);
    dude.animations.add("left",[0,1,2,3],12,true);
    dude.animations.add("right",[5,6,7,8],12,true);
    
    game.physics.arcade.enable(dude);
    game.physics.arcade.enable(ground);
    game.physics.arcade.enable(platfrom);
  //  game.physics.arcade.enable(itemsInsky);
    ground.body.immovable=true;
    

    dude.body.bounce.y=0.5;
    dude.body.gravity.y=30;
    dude.body.collideWorldBounds=true;
       // game.add.sprite(150,150,"star");
        //    game.add.sprite(100,100,"star");
    itemsInsky=game.add.group();
    itemsInsky.enableBody=true;
    for(var i =0 ; i <= 12 ;i++)
    {
        var x = i * 70 ;
            var gravity= 30 * Math.random(0,12);
            if(i%2==0)
            {
                var star= itemsInsky.create(x,0,"star");
                star.body.bounce.y=0.5;
                star.body.gravity.y=gravity;
            }
            else
            {
                var diamond=  itemsInsky.create(x,0,"diamond");
                diamond.body.bounce.y=0.5;
                diamond.body.gravity.y=gravity;
            }
    
    }
    scoreSound=game.add.audio("score");
    cursors=game.input.keyboard.createCursorKeys();
    scoreText=game.add.text(30,30,"Score :0",{fontSize:"32px",fontWeight:"bolder",color:"blue"});

}

function update()
{
    game.physics.arcade.collide(dude,platfrom);
    game.physics.arcade.collide(platfrom, itemsInsky);
    //game.physics.aracde.collide(itemsInsky,platfrom);
    game.physics.arcade.collide(dude,itemsInsky,dudeAndStar);
    console.log("--> update")
    if(cursors.left.isDown)
    {console.log("left Key pressed");
     
        dude.body.velocity.x=-150;
        dude.animations.play("left");
    }
    else if(cursors.right.isDown)
    {
        console.log("right key pressed");
        dude.body.velocity.x=150;
        dude.animations.play("right");
        
    }
    else if(cursors.down.isDown)
    {
        dude.body.velocity.y=100;
    }
    else if(cursors.up.isDown)
    {
        dude.body.velocity.y=-100;
    }
    else 
    {
      //  dude.animations.stop();
        dude.body.velocity.x=0;
      //  dude.body.velocity.y=0;
        dude.animations.frame=4;
    }
    
}


function dudeAndStar(dude,oneStar)
{
    
    score = score + 10;
    scoreText.text="Score:" + score;
    scoreSound.play();
    oneStar.kill();
}