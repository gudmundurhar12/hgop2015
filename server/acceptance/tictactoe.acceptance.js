'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function user(name){

  var cmd = {
    id : "1",
    gameId : "999",
    command: undefined,
    userName: name,
    name: undefined,
    timeStamp: "2015-12-07T11:29:29"
  };

  var apiCommand = {
    createsGame: function(gameName){
      cmd.command = "CreateGame";
      cmd.name = gameName;

      return cmd;
    }
  };
  return apiCommand;
}


function given(cmd){

  var expectations = [];
  var expectation = {};
  var givenApi = {
    expect: function(eventType){
      expectation.event = eventType;
      return givenApi;
    },
    withName: function(gameName){
      expectation.gameName = gameName;
      return givenApi;
    },
    isOk: function(done){
      var req = request(acceptanceUrl);
      req
      .post('/api/createGame')
      .type('json')
      .send(cmd)
      .end((err, res) => {  
        if (err) return done(err);
          should(res.body[res.body.length - 1]).have.property('event', expectation.event);
          should(res.body[res.body.length - 1]).have.property('name', expectation.gameName);
          done();
      });
    }
  };
  return givenApi;
}



describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command =     {
      id : "1",
      gameId : "888",
      command: "CreateGame",
      userName: "Gummi",
      name: "FirstGame",
      timeStamp: "2015-12-07T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/888')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1",
                "gameId": "888",
                "event": "GameCreated",
                "userName": "Gummi",
                "name": "FirstGame",
                "timeStamp": "2015-12-07T11:29:29"
              }]);
            done();
          });
      });
  });


   it('Should execute fluid API test', function (done) {
     
     given(user("Gummi").createsGame("TheFirstGame"))
     .expect("GameCreated").withName("TheFirstGame").isOk(done);
   });

});
