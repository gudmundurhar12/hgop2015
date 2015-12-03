var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      id:"0",
      command:"CreateGame",
      userName : "Gummi",
      name:"FirstGame",
      timeStamp: "2015.12.03T11:30:00"
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

  it('should create game with other id, user and time',function(){
    given= [];
    when={
      id:"1",
      command:"CreateGame",
      userName : "Jonni",
      name:"FirstGame",
      timeStamp: "2015.12.03T11:35:00"
    };
    then=[{
      id:"1",
      event:"GameCreated",
      userName: "Jonni",
      timeStamp: "2015.12.03T11:35:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
describe('join game command', function(){

  var given, when, then;

  it('should join a created game',function(){
    given= [{
      id:"0",
      event:"GameCreated",
      userName: "Gummi",
      timeStamp: "2015.12.03T11:30:00"
    }];
    when={
      id:"01",
      command:"JoinGame",
      userName : "Jonni",
      name:"FirstGame",
      timeStamp: "2015.12.03T11:40:00"
    };
    then=[{
      id:"01",
      event:"GameJoined",
      userName : "Jonni",
      otherUserName: "Gummi",
      timeStamp: "2015.12.03T11:40:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});