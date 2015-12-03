var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('CreateGame command', function(){
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
			command:"CreateGame",
			userName : "Jonni",
			name:"FirstGame",
			timeStamp: "2015.12.03T11:35:00"
		};
		then=[{
			id:"1",
			event:"GameCreated",
			userName: "Jonni",
      name:"FirstGame",
			timeStamp: "2015.12.03T11:35:00"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

  it('should not create game with same name',function(){
    given= [{
      id:"0",
      event:"GameCreated",
      userName: "Gummi",
      name: "FirstGame",
      timeStamp: "2015.12.03T11:30:00"
    }];
    when={
      id:"1",
      command:"CreateGame",
      userName : "Rúnar",
      name:"FirstGame",
      timeStamp: "2015.12.03T11:50:00"
    };
    then=[{
      id:"1",
      event:"GameWithSameNameExists",
      userName: "Rúnar",
      timeStamp: "2015.12.03T11:50:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});
