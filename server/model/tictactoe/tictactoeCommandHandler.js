module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    GameJoinedEvent  : events[1]
  
  };
  
  var handlers = {
    "CreateGame": function (cmd) {
      {
        if(gameState.gameCreatedEvent === undefined){
          return [{
            id: cmd.id,
            event:"GameCreated",
            userName: cmd.userName,
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
      }
    },
     "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        else if(gameState.GameJoinedEvent !== undefined){
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
      }
    }
  };

  return {
    executeCommand: function (cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};