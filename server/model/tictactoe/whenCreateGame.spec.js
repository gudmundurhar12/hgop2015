var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('CreateGame command', function(){
    var given, when, then;

    it('should create game',function(){
        given= [];
        when={
            id:"0",
            gameId : "1",
            command:"CreateGame",
            user : {
              userName:'Gummi',
              side: 'X'
            },
            name:"FirstGame",
            timeStamp: "2015.12.03T11:30:00"
        };
        then=[{
            id:"0",
            gameId : "1",
            event:"GameCreated",
            user : {
              userName:'Gummi',
              side: 'X'
            },
            name: "FirstGame",
            timeStamp: "2015.12.03T11:30:00"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should create game with other id, user and time',function(){
        given= [];
        when={
            id:"1",
            gameId : "2",
            command:"CreateGame",
            user : {
              userName:'Jonni',
              side: 'X'
            },
            name:"FirstGame",
            timeStamp: "2015.12.03T11:35:00"
        };
        then=[{
            id:"1",
            gameId : "2",
            event:"GameCreated",
            user : {
              userName:'Jonni',
              side: 'X'
            },
            name:"FirstGame",
            timeStamp: "2015.12.03T11:35:00"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

  it('should not create game with same id',function(){
    var id = "1";

    given= [{
      id:"0",
      gameId : id,
      event:"GameCreated",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name: "FirstGame",
      timeStamp: "2015.12.03T11:30:00"
    }];
    when={
      id:"1",
      gameId : id,
      command:"CreateGame",
      user : {
        userName:'Rúnar',
        side: 'X'
      },
      name:"FirstGame",
      timeStamp: "2015.12.03T11:50:00"
    };
    then=[{
      id:"1",
      gameId : id,
      event:"GameWithIdExists",
      user : {
        userName:'Rúnar',
        side: 'X'
      },
      timeStamp: "2015.12.03T11:50:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});
