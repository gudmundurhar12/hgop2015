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
    if(eventHandler) eventHandler(gameEvent);
  }); 


  var handlers = {
    "CreateGame": function (cmd) {
      if(gameState.gameCreatedEvent === undefined){
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event:"GameCreated",
          userName: cmd.userName,
          name: cmd.name,
          timeStamp: cmd.timeStamp
        }];
      }

      else if(gameState.gameCreatedEvent.gameId === cmd.gameId){
        return [{
          id: cmd.id,
          gameId : cmd.gameId,
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

     // Make sure that the same player doesn't make two moves in a row
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

      // Make sure the cell is empty
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

      var gameWin = [{
              id: cmd.id,
              event: "Game Won",
              userName: cmd.userName,
              name: gameState.gameCreatedEvent.name,
              x : cmd.x,
              y : cmd.y,
              side: cmd.side,
              timeStamp: cmd.timeStamp
            }];

      var draw = true;

      if(gameBoard[cmd.x][cmd.y] === ''){
        gameBoard[cmd.x][cmd.y] = cmd.side;

        // Check for horizontal and vertical wins
        for(var i = 0 ; i < gameBoard.length ; i++){
          if(gameBoard[0][i] === cmd.side && gameBoard[1][i] === cmd.side && gameBoard[2][i] === cmd.side ){
            return gameWin;
          }
          if(gameBoard[i][0] === cmd.side && gameBoard[i][1] === cmd.side && gameBoard[i][2] === cmd.side ){
            return gameWin;
          }
          for(var j = 0 ; j < gameBoard[i].length ; j++){
            if(gameBoard[i][j] === ''){
              draw = false;
            }
          }
        }

        // Check for diagonal wins
        if(gameBoard[0][0] === cmd.side && gameBoard[1][1] === cmd.side && gameBoard[2][2] === cmd.side){
          return gameWin;
        }

        if(gameBoard[0][2] === cmd.side && gameBoard[1][1] === cmd.side && gameBoard[2][0] === cmd.side){
          return gameWin;
        }
        if(!draw){
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
        else{
          return [{
            id: cmd.id,
            event: "Game Draw",
            userName: cmd.userName,
            name: gameState.gameCreatedEvent.name,
            x : cmd.x,
            y : cmd.y,
            side : cmd.side,
            timeStamp: cmd.timeStamp
          }];
        }
      } 
      
    }
  };

  return {
executeCommand: function (cmd) {
      var handler = handlers[cmd.command];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};