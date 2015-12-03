var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

	var given, when, then;

	it('should join a created game',function(){
		given=[{
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

	it('should reject trying to join a non-existing game',function(){
		given=[];
		when={
			id:"02",
			command:"JoinGame",
			userName : "Gummi",
			name:"FirstGame",
			timeStamp: "2015.12.03T11:45:00"
		};
		then=[{
			id:"02",
			event:"GameDoesNotExist",
			userName: "Gummi",
			timeStamp: "2015.12.03T11:45:00"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

  it('should reject trying to join a full game',function(){
    given=[{
      id:"0",
      event:"GameCreated",
      userName: "Gummi",
      timeStamp: "2015.12.03T11:30:00"
    },
    {
      id:"01",
      event:"GameJoined",
      userName : "Jonni",
      otherUserName: "Gummi",
      timeStamp: "2015.12.03T11:40:00"
    }];
    when={
      id:"03",
      command:"JoinGame",
      userName : "Pétur",
      name:"FirstGame",
      timeStamp: "2015.12.03T11:50:00"
    };
    then=[{
      id:"03",
      event:"GameFull",
      userName : "Pétur",
      timeStamp: "2015.12.03T11:50:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});