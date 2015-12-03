var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      id:"1234",
      command:"CreateGame",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };
    then=[{
      id:"0",
      event:"GameCreated",
      userName: "Gummi",
      timeStamp: "2015.12.03T11:30:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});