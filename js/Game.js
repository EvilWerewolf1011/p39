class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.trex.addAnimation("running", trex_running);

    player2 = createSprite(300,200);
    player2.trex.addAnimation("running", trex_running2);


    cars = [player1,player2];
  }

  end()
  {

    console.log("Game_Ended")

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){

      background(groundimg);
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 190;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      console.log(player.distance);
      player.update();
    }

    if(player.distance > 3420)
    {

      gameState = 2;

    }

    

    drawSprites();
  }
}
