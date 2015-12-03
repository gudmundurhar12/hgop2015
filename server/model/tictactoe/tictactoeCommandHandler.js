var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  
  var gameState = {
    gameCreatedEvent : events[0],
    gameJoinedEvent  : events[1],
    gameLastMove : events[events.length - 1],
    gameBoard : [['','',''],['','',''],['','','']],
  };
  
  var gameEvents={
    'MoveMade': function(gameEvent){
      gameState.gameBoard[gameEvent.x][gameEvent.y] = gameEvent.side;
    }
  };

  _.each(events, function(gameEvent){
    var eventHandler = gameEvents[gameEvent.event];
    eventHandler && eventHandler(gameEvent);
  }); 


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

     if(lastMove.userName !== undefined){
        if(gameState.gameLastMove.userName === cmd.userName && lastMove.event === "MoveMade"){
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

      if(gameState.gameBoard[cmd.x][cmd.y] !== ''){
        return [{
            id: cmd.id,
            event:"IllegalMove",
            userName: cmd.userName,
            name: gameState.gameCreatedEvent.name,
            side: cmd.side,
            timeStamp: cmd.timeStamp
          }];
      }

      var gameBoard = gameState.gameBoard;
      if(gameBoard[cmd.x][cmd.y] === ''){
        gameBoard[cmd.x][cmd.y] = cmd.side;

        for(var i = 0 ; i < gameBoard.length ; i++){
          if(gameBoard[0][i] === cmd.side && gameBoard[1][i] === cmd.side && gameBoard[2][i] === cmd.side ){
            return [{
              id: cmd.id,
              event: cmd.userName + " Winns",
              userName: cmd.userName,
              name: gameState.gameCreatedEvent.name,
              x : cmd.x,
              y : cmd.y,
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
      
    }
  };

  return {
    executeCommand: function (cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};