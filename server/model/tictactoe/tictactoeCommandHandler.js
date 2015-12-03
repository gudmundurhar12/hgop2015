module.exports = function tictactoeCommandHandler(events) {
  
  var gameState = {
    gameCreatedEvent : events[0],
    gameJoinedEvent  : events[1],
    gameLastMove : events[events.length - 1],
    gameBoard : [['','',''],['','',''],['','','']],
  };
  
  var handlers = {
    "CreateGame": function (cmd) {
      if(gameState.gameCreatedEvent === undefined){
        return [{
          id: cmd.id,
          event:"GameCreated",
          userName: cmd.userName,
          name: cmd.name,
          timeStamp: cmd.timeStamp
        }];
      }
      else if(gameState.gameCreatedEvent.name === cmd.name){
        return [{
          id: cmd.id,
          event:"GameWithSameNameExists",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },

    "JoinGame": function (cmd) {
      
      if (gameState.gameCreatedEvent === undefined) {
        return [{
          id: cmd.id,
          event: "GameDoesNotExist",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      else if(gameState.gameJoinedEvent !== undefined){
        return [{
          id: cmd.id,
          event: "GameFull",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      return [{
        id: cmd.id,
        event: "GameJoined",
        userName: cmd.userName,
        otherUserName: gameState.gameCreatedEvent.userName,
        timeStamp: cmd.timeStamp
      }];
      
    },
    
    "MakeMove" : function (cmd){
     
      var lastMove = gameState.gameLastMove

     if(lastMove.userName !== undefined && lastMove.event !== "GameJoined"){
        if(gameState.gameLastMove.userName === cmd.userName){
          return [{
            id: cmd.id,
            event:"NotPlayersTurn",
            userName: cmd.userName,
            name: gameState.gameCreatedEvent.name,
            side: cmd.side,
            timeStamp: cmd.timeStamp
          }];
        }
      }

      return [{
        id: cmd.id,
        event: "MoveMade",
        userName: cmd.userName,
        name: gameState.gameCreatedEvent.name,
        x : cmd.x,
        y : cmd.y,
        side : cmd.side,
        timeStamp: cmd.timeStamp
      }];
    }
  };

  return {
    executeCommand: function (cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};