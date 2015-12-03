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

  it('should make first move',function(){
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
  });

  it('should not make move with same player',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:00:00"
    });
    when={
      id:"0110",
      command:"MakeMove",
      userName : "Jonni",
      x:0,
      y:1,
      side:'X',
      timeStamp: "2015.12.03T12:01:00"
    };
    then=[{
      id:"0110",
      event:"NotPlayersTurn",
      userName:"Jonni",
      name:"FirstGame",
      side:'X',
      timeStamp: "2015.12.03T12:01:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should make second move',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:00:00"
    });
    when={
      id:"0111",
      command:"MakeMove",
      userName : "Gummi",
      x:0,
      y:1,
      side:'O',
      timeStamp: "2015.12.03T12:01:00"
    };
    then=[{
      id:"0111",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:1,
      side:'O',
      timeStamp: "2015.12.03T12:01:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should not allow to put into same cell',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:00:00"
    });
    when={
      id:"0112",
      command:"MakeMove",
      userName : "Gummi",
      x:0,
      y:0,
      side:'O',
      timeStamp: "2015.12.03T12:01:00"
    };
    then=[{
      id:"0112",
      event:"IllegalMove",
      userName:"Gummi",
      name:"FirstGame",
      side:'O',
      timeStamp: "2015.12.03T12:01:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('Player should win on Vertical',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:00:00"
    },
    {
      id:"012",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:1,
      side:'O',
      timeStamp: "2015.12.03T12:01:00"
    },
    {
      id:"013",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:2,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:02:00"
    },
    {
      id:"014",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:2,
      side:'O',
      timeStamp: "2015.12.03T12:03:00"
    });
    when={
      id:"015",
      command:"MakeMove",
      userName : "Jonni",
      x:1,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:04:00"
    };
    then=[{
      id:"015",
      event:"Jonni Wins",
      userName:"Jonni",
      name:"FirstGame",
      x:1,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T12:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

    it('Player should win on Horizontal',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T13:00:00"
    },
    {
      id:"012",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:1,
      y:0,
      side:'O',
      timeStamp: "2015.12.03T13:01:00"
    },
    {
      id:"013",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:2,
      side:'X',
      timeStamp: "2015.12.03T13:02:00"
    },
    {
      id:"014",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:1,
      y:2,
      side:'O',
      timeStamp: "2015.12.03T13:03:00"
    });
    when={
      id:"015",
      command:"MakeMove",
      userName : "Jonni",
      x:0,
      y:1,
      side:'X',
      timeStamp: "2015.12.03T13:04:00"
    };
    then=[{
      id:"015",
      event:"Jonni Wins",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:1,
      side:'X',
      timeStamp: "2015.12.03T13:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

it('Player should win on Diagonal \\ ',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T14:00:00"
    },
    {
      id:"012",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:1,
      side:'O',
      timeStamp: "2015.12.03T14:01:00"
    },
    {
      id:"013",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:1,
      y:1,
      side:'X',
      timeStamp: "2015.12.03T14:02:00"
    },
    {
      id:"014",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:2,
      side:'O',
      timeStamp: "2015.12.03T14:03:00"
    });
    when={
      id:"015",
      command:"MakeMove",
      userName : "Jonni",
      x:2,
      y:2,
      side:'X',
      timeStamp: "2015.12.03T14:04:00"
    };
    then=[{
      id:"015",
      event:"Jonni Wins",
      userName:"Jonni",
      name:"FirstGame",
      x:2,
      y:2,
      side:'X',
      timeStamp: "2015.12.03T14:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

it('Player should win on Diagonal \/ ',function(){
    given.push({
      id:"011",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:0,
      y:2,
      side:'X',
      timeStamp: "2015.12.03T14:00:00"
    },
    {
      id:"012",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:1,
      side:'O',
      timeStamp: "2015.12.03T14:01:00"
    },
    {
      id:"013",
      event:"MoveMade",
      userName:"Jonni",
      name:"FirstGame",
      x:1,
      y:1,
      side:'X',
      timeStamp: "2015.12.03T14:02:00"
    },
    {
      id:"014",
      event:"MoveMade",
      userName:"Gummi",
      name:"FirstGame",
      x:0,
      y:0,
      side:'O',
      timeStamp: "2015.12.03T14:03:00"
    });
    when={
      id:"015",
      command:"MakeMove",
      userName : "Jonni",
      x:2,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T14:04:00"
    };
    then=[{
      id:"015",
      event:"Jonni Wins",
      userName:"Jonni",
      name:"FirstGame",
      x:2,
      y:0,
      side:'X',
      timeStamp: "2015.12.03T14:04:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});