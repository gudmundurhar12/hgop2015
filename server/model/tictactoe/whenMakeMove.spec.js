var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('MakeMove command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"0",
      event:"GameCreated",
      userName: "Gummi",
      name:"FirstGame",
      timeStamp: "2015.12.03T11:30:00"
    },
    {
      id:"01",
      event:"GameJoined",
      userName : "Jonni",
      otherUserName: "Gummi",
      timeStamp: "2015.12.03T11:40:00"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"011",
        command:"MakeMove",
        userName : "Jonni",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.03T12:00:00"
      };
      then=[{
        id:"011",
        event:"MoveMade",
        userName:"Jonni",
        name:"FirstGame",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.03T12:00:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

});