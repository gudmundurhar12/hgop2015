var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('MakeMove command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
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
  });

  it('should make first move',function(){
    when={
      id:"011",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      x:0,
      y:0,
      timeStamp: "2015.12.03T12:00:00"
    };
    then=[{
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T12:00:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should not make move with same player',function(){
    given.push({
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T12:00:00"
    });
    when={
      id:"0110",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      x:0,
      y:1,
      timeStamp: "2015.12.03T12:01:00"
    };
    then=[{
      id:"0110",
      gameId: "1",
      event:"NotPlayersTurn",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      timeStamp: "2015.12.03T12:01:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should make second move',function(){
    given.push({
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T12:00:00"
    });
    when={
      id:"0111",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      x:0,
      y:1,
      timeStamp: "2015.12.03T12:01:00"
    };
    then=[{
      id:"0111",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:0,
      y:1,
      timeStamp: "2015.12.03T12:01:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should not allow to put into same cell',function(){
    given.push({
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T12:00:00"
    });
    when={
      id:"0112",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      x:0,
      y:0,
      timeStamp: "2015.12.03T12:01:00"
    };
    then=[{
      id:"0112",
      gameId: "1",
      event:"IllegalMove",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      timeStamp: "2015.12.03T12:01:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  

it('Player should win on Diagonal \\ ',function(){
    given.push({
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T14:00:00"
    },
    {
      id:"012",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:0,
      y:1,
      timeStamp: "2015.12.03T14:01:00"
    },
    {
      id:"013",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:1,
      y:1,
      timeStamp: "2015.12.03T14:02:00"
    },
    {
      id:"014",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:0,
      y:2,
      timeStamp: "2015.12.03T14:03:00"
    });
    when={
      id:"015",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      x:2,
      y:2,
      timeStamp: "2015.12.03T14:04:00"
    };
    then=[{
      id:"015",
      gameId: "1",
      event:"Game Won",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:2,
      y:2,
      timeStamp: "2015.12.03T14:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Player should win on Diagonal \/ ',function(){
    given.push({
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:2,
      timeStamp: "2015.12.03T14:00:00"
    },
    {
      id:"012",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:0,
      y:1,
      timeStamp: "2015.12.03T14:01:00"
    },
    {
      id:"013",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:1,
      y:1,
      timeStamp: "2015.12.03T14:02:00"
    },
    {
      id:"014",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T14:03:00"
    });
    when={
      id:"015",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      x:2,
      y:0,
      timeStamp: "2015.12.03T14:04:00"
    };
    then=[{
      id:"015",
      gameId: "1",
      event:"Game Won",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:2,
      y:0,
      timeStamp: "2015.12.03T14:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

 it('Game should be Draw ',function(){
    given.push({
      id:"011",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:0,
      timeStamp: "2015.12.03T15:00:00"
    },
    {
      id:"012",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:0,
      y:2,
      timeStamp: "2015.12.03T15:01:00"
    },
    {
      id:"013",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:0,
      y:1,
      timeStamp: "2015.12.03T15:02:00"
    },
    {
      id:"014",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:1,
      y:0,
      timeStamp: "2015.12.03T15:03:00"
    },
    {
      id:"015",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:1,
      y:2,
      timeStamp: "2015.12.03T15:02:00"
    },
    {
      id:"016",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:1,
      y:1,
      timeStamp: "2015.12.03T15:03:00"
    },
    {
      id:"017",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:2,
      y:0,
      timeStamp: "2015.12.03T15:02:00"
    },
    {
      id:"018",
      gameId: "1",
      event:"MoveMade",
      user : {
        userName:'Gummi',
        side: 'X'
      },
      name:"FirstGame",
      x:2,
      y:1,
      timeStamp: "2015.12.03T15:03:00"
    });
    when={
      id:"019",
      gameId: "1",
      command:"MakeMove",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      x:2,
      y:2,
      timeStamp: "2015.12.03T15:04:00"
    };
    then=[{
      id:"019",
      gameId: "1",
      event:"Game Draw",
      user : {
        userName:'Jonni',
        side: 'O'
      },
      name:"FirstGame",
      x:2,
      y:2,
      timeStamp: "2015.12.03T15:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });


});


function _Fn(value){
  describe('Winning moves for lines', function(){

    var given, when, then;

    beforeEach(function(){
      given= [{
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
    });


    it('Player should win on Vertical on line ' + value,function(){
      given.push({
        id:"011",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        name:"FirstGame",
        x:0,
        y: value,
        timeStamp: "2015.12.03T12:00:00"
      },
      {
        id:"012",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Gummi',
          side: 'X'
        },
        name:"FirstGame",
        x: Math.max(0, 1-value),
        y: Math.max(0, 1-value),
        timeStamp: "2015.12.03T12:01:00"
      },
      {
        id:"013",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        name:"FirstGame",
        x:2,
        y: value,
        timeStamp: "2015.12.03T12:02:00"
      },
      {
        id:"014",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Gummi',
          side: 'X'
        },
        name:"FirstGame",
        x: Math.max(0, 1-value) + 1,
        y: Math.max(0, 1-value),
        timeStamp: "2015.12.03T12:03:00"
      });
      when={
        id:"015",
        gameId: "1",
        command:"MakeMove",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        x:1,
        y: value,
        timeStamp: "2015.12.03T12:04:00"
      };
      then=[{
        id:"015",
        gameId: "1",
        event:"Game Won",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        name:"FirstGame",
        x:1,
        y: value,
        timeStamp: "2015.12.03T12:04:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

      it('Player should win on Horizontal line ' + value,function(){
      given.push({
        id:"011",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        name:"FirstGame",
        x: value,
        y:0,
        timeStamp: "2015.12.03T13:00:00"
      },
      {
        id:"012",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Gummi',
          side: 'X'
        },
        name:"FirstGame",
        x: Math.max(0, 1-value),
        y: Math.max(0, 1-value),
        timeStamp: "2015.12.03T13:01:00"
      },
      {
        id:"013",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        name:"FirstGame",
        x: value,
        y:2,
        timeStamp: "2015.12.03T13:02:00"
      },
      {
        id:"014",
        gameId: "1",
        event:"MoveMade",
        user : {
          userName:'Gummi',
          side: 'X'
        },
        name:"FirstGame",
        x: Math.max(0, 1-value),
        y: Math.max(0, 1-value) + 1,
        timeStamp: "2015.12.03T13:03:00"
      });
      when={
        id:"015",
        gameId: "1",
        command:"MakeMove",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        x:value,
        y:1,
        timeStamp: "2015.12.03T13:04:00"
      };
      then=[{
        id:"015",
        gameId: "1",
        event:"Game Won",
        user : {
          userName:'Jonni',
          side: 'O'
        },
        name:"FirstGame",
        x:value,
        y:1,
        timeStamp: "2015.12.03T13:04:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    });
}

for(var i = 0 ; i < 3 ; i++){
  _Fn(i);
}