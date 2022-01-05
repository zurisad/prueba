class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }
    update(state){
      database.ref('/').update({
          gameState : state
      })
    }
    pequeña(sprite){
      for(i=0;i<50;i++){
        sprite.scale=0.01;
      }
    }
    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()){
              playerCount = playerCountRef.val();
              player.getCount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(0,0);
        car1.addImage("hola",carImg1);
        car1.scale = 0.05;
        car2 = createSprite(0,0);
        car2.addImage("h",carImg2);
        car2.scale = 0.05;
        cars = [car1,car2];
        banana = createSprite(1050,-1500);
        banana.addImage("j",bananaImg);
        banana.scale = 0.1;
        rock = createSprite(590,-800);
        rock.addImage("d",rockImg);
        rock.scale = 0.2;
        lodo = createSprite(1070,-700);
        lodo.addImage("g",lodoImg);
        lodo.scale = 0.15;
        box = createSprite(690,-1690);
        box.addImage("k",boxImg);
        box.scale = 0.4;
    }
    play(){
      form.hide();
      Player.getPlayerInfo();
      if(allPlayers !== undefined){
        background("green");
        image(backgroundImg,0,-displayHeight*4,displayWidth,displayHeight*5);

        
        var index = 0;
        // imprime a todos los jugadores
        for(var plr in allPlayers){
           //display_position +=20;
          // agrega 1 por cada vez que se repite el for
          index = index+1;
          // pone distancia entre los autos
          this.move = 100;
          // coloca los autos en posicion y utilizando la distancia
         var x = height/2-allPlayers[plr].move;
         var y = height/2-allPlayers[plr].distance;
          //z = displayWidth-allPlayers[plr].move;

          // asigna las posiciones de cada auto dentro de la matriz
          cars[index-1].x = x;
          cars[index-1].y = y;
        
          // el jugador que es se pinte de rojo y la camara lo siga
          if (index === player.index ){
             cars[index-1].shapeColor ="red";
             camera.position.x = displayWidth/2;
             camera.position.y = cars[index-1].y;
             stroke(5);
             fill("red");
             ellipse(x,y,35,35);
            //  console.log(x);
            //  console.log(y);
             //console.log(bananaImg.x);
             if (keyDown("LEFT_ARROW")){
              player.move +=5;
              player.update();
              for(var plr in allPlayers){
              if (index === player.index ){
              cars[index-1].rotationSpeed = -2;
              }
            }
            }
            else
            if (keyDown("RIGHT_ARROW")){
               player.move -=5;
               player.update();
               for(var plr in allPlayers){
                if (index === player.index ){
                cars[index-1].rotationSpeed = 2;
                }
               }
           }
           else{
             car2.rotationSpeed=0;
             car1.rotationSpeed=0;
           }
           if(car1.overlap(banana)||car2.overlap(banana)){
             player.distance= player.distance+200;
             player.update();
           }
           if(car1.overlap(lodo)||car2.overlap(lodo)){
             player.distance = player.distance-25;
             player.update();
           }
           if(car1.isTouching(rock)){
             this.pequeña(car1);
           }
           else if(i>=50 && player.distance<=820){
             car1.scale=0.05;
          }
           if(car2.isTouching(rock)){
            this.pequeña(car2);
          }
          else if(i>=50 && player.distance<=820){
            car2.scale=0.05;
          }
          if(car1.isTouching(box)||car2.isTouching(box)){
            player.distance=820;
            player.move=60;
            player.update();
          }  

          }
        }
      }
      // cuando se presiona la tecla de arriba el jugador avance
      if (keyDown("UP_ARROW")){
        player.distance +=30;
        player.update();
      }
      if (keyDown("DOWN_ARROW")){
        player.distance -=30;
        player.update();
      }
      
      // if (player.distance === 3850 ){
      //   game.update(2);
      //   player.rank +=1;
      //   Player.updateCarsAtEnd(player.rank);
      // }
     

      drawSprites();
       
    }
}