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
      gameState.gameBoard[gameEvent.x][gameEvent.y] = gameEvent.user.side;
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
          user: cmd.user,
          name: cmd.name,
          timeStamp: cmd.timeStamp
        }];
      }

      else if(gameState.gameCreatedEvent.gameId === cmd.gameId){
        return [{
          id: cmd.id,
          gameId : cmd.gameId,
          event:"GameWithIdExists",
          user: cmd.user,
          timeStamp: cmd.timeStamp
        }];
      }
    },

    "JoinGame": function (cmd) {
      
      if (gameState.gameCreatedEvent === undefined) {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameDoesNotExist",
          user: cmd.user,
          timeStamp: cmd.timeStamp
        }];
      }
      else if(gameState.gameJoinedEvent !== undefined){
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameFull",
          user: cmd.user,
          timeStamp: cmd.timeStamp
        }];
      }
      return [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "GameJoined",
        user: cmd.user,
        timeStamp: cmd.timeStamp
      }];
      
    },
    
    "MakeMove" : function (cmd){
     
     var lastMove = gameState.gameLastMove

     // Make sure that the same player doesn't make two moves in a row
     if(lastMove.user !== undefined){
        if(gameState.gameLastMove.user.userName === cmd.user.userName && lastMove.event !== "GameJoined"){
          return [{
            id: cmd.id,
            gameId: cmd.gameId,
            event:"NotPlayersTurn",
            user: cmd.user,
            name: gameState.gameCreatedEvent.name,
            timeStamp: cmd.timeStamp
          }];
        }
      }

      // Make sure the cell is empty
      if(gameState.gameBoard[cmd.x][cmd.y] !== ''){
        return [{
            id: cmd.id,
            gameId: cmd.gameId,
            event:"IllegalMove",
            user: cmd.user,
            name: gameState.gameCreatedEvent.name,
            timeStamp: cmd.timeStamp
          }];
      }

      var gameBoard = gameState.gameBoard;

      var gameWin = [{
              id: cmd.id,
              gameId: cmd.gameId,
              event: "Game Won",
              user: cmd.user,
              name: gameState.gameCreatedEvent.name,
              x : cmd.x,
              y : cmd.y,
              timeStamp: cmd.timeStamp
            }];

      var draw = true;

      if(gameBoard[cmd.x][cmd.y] === ''){
        gameBoard[cmd.x][cmd.y] = cmd.user.side;

        // Check for horizontal and vertical wins
        for(var i = 0 ; i < gameBoard.length ; i++){
          if(gameBoard[0][i] === cmd.user.side && gameBoard[1][i] === cmd.user.side && gameBoard[2][i] === cmd.user.side ){
            return gameWin;
          }
          if(gameBoard[i][0] === cmd.user.side && gameBoard[i][1] === cmd.user.side && gameBoard[i][2] === cmd.user.side ){
            return gameWin;
          }
          for(var j = 0 ; j < gameBoard[i].length ; j++){
            if(gameBoard[i][j] === ''){
              draw = false;
            }
          }
        }

        // Check for diagonal wins
        if(gameBoard[0][0] === cmd.user.side && gameBoard[1][1] === cmd.user.side && gameBoard[2][2] === cmd.user.side){
          return gameWin;
        }

        if(gameBoard[0][2] === cmd.user.side && gameBoard[1][1] === cmd.user.side && gameBoard[2][0] === cmd.user.side){
          return gameWin;
        }
        if(!draw){
          return [{
            id: cmd.id,
            gameId: cmd.gameId,
            event: "MoveMade",
            user: cmd.user,
            name: gameState.gameCreatedEvent.name,
            x : cmd.x,
            y : cmd.y,
            timeStamp: cmd.timeStamp
          }];
        }
        else{
          return [{
            id: cmd.id,
            gameId: cmd.gameId,
            event: "Game Draw",
            user: cmd.user,
            name: gameState.gameCreatedEvent.name,
            x : cmd.x,
            y : cmd.y,
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