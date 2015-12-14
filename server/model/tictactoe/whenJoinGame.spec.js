var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('JoinGame command', function(){

  var given, when, then;

  it('should join a created game',function(){
    given=[{
      id:"0",
      gameId: "1",
      event:"GameCreated",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      timeStamp: "2015.12.03T11:30:00"
    }];
    when={
      id:"01",
      gameId: "1",
      command:"JoinGame",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      timeStamp: "2015.12.03T11:40:00"
    };
    then=[{
      id:"01",
      gameId: "1",
      event:"GameJoined",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      timeStamp: "2015.12.03T11:40:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject trying to join a non-existing game',function(){
    given=[];
    when={
      id:"02",
      gameId: "1",
      command:"JoinGame",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      timeStamp: "2015.12.03T11:45:00"
    };
    then=[{
      id:"02",
      gameId: "1",
      event:"GameDoesNotExist",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      timeStamp: "2015.12.03T11:45:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject trying to join a full game',function(){
    given=[{
      id:"0",
      gameId: "1",
      event:"GameCreated",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      timeStamp: "2015.12.03T11:30:00"
    },
    {
      id:"01",
      gameId: "1",
      event:"GameJoined",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      timeStamp: "2015.12.03T11:40:00"
    }];
    when={
      id:"03",
      gameId: "1",
      command:"JoinGame",
      user : {
        userName:'Pétur',
        side: 'O'
      },
      name:"FirstGame",
      timeStamp: "2015.12.03T11:50:00"
    };
    then=[{
      id:"03",
      gameId: "1",
      event:"GameFull",
      user : {
        userName:'Pétur',
        side: 'O'
      },
      timeStamp: "2015.12.03T11:50:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});