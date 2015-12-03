module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id:"0",
          event:"GameCreated",
          userName: "Gummi",
          timeStamp: "2015.12.03T11:30:00"
        }];
      }
    },
  };

  return {
    executeCommand: function (cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};