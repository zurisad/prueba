class Player{
    constructor(){
      this.index = null;
      this.distance = 700;
      this.name = null;
      this.move = -650;
    }
    getCount(){
        var playerCountRef = database.ref('playerCount')
        playerCountRef.on("value",function(data){
            playerCount = data.val();
        })
    }
    updateCount(count){
        database.ref('/').update({
            playerCount : count
        })
      }
    update(){
        var playerIndex = "players/player"+this.index
        database.ref(playerIndex).set({
            name:this.name,
            distance : this.distance,
            move : this.move
        })
    }
    static getPlayerInfo(){
        var playerInfoRef = database.ref('players')
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
        })  
    }
}