'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var async = require('async');

function commandUri(command){
  if(command === "CreateGame"){
    return "/api/createGame";
  }
  if(command === "JoinGame"){
    return "/api/joinGame";
  }
  if(command === "MakeMove"){
    return "/api/placeMove";
  }
}

function user(nameOfUser){

  var cmd = {
    createsGame: function(id){

      cmd.command = "CreateGame";
      cmd.gameId = id;

      return cmd;
    },
    named: function(gameName){
  
      cmd.name = gameName;
      
      return cmd;
    },
    joinsGame: function(id){
     
      cmd.command = "JoinGame";
      cmd.gameId = id;
     
      return cmd;
    },
    placesMove: function(gameId, x, y, token){
      cmd.gameId = gameId;
      cmd.command = "MakeMove";
      cmd.x = x;
      cmd.y = y;
      cmd.side = token; 

      return cmd;
    },
    id : "0",
    userName : nameOfUser,
    timeStamp: "2015-12-07T11:29:29"

  };
  return cmd;
}


function given(cmd){

  var commands = [cmd];
  var responses = [];
  var expectations = [];
  var givenApi = {
    expect: function(eventType){
      expectations.push({event: eventType});
      return givenApi;
    },
    withName: function(gameName){
      expectations[expectations.length - 1].name = gameName;
      return givenApi;
    },
    withGameId: function(gameId) {
      expectations[expectations.length - 1].gameId = gameId;
      return givenApi;
    },
    and: function(command) {
      commands.push(command);
      return givenApi;
    },
    byUser: function(userName) {
      expectations[expectations.length - 1].userName = userName;
      return givenApi;
    },
    markOnCell: function(x,y,token){
      expectations[expectations.length - 1].x = x;
      expectations[expectations.length - 1].y = y;
      expectations[expectations.length - 1].side = token;
      return givenApi;
    },
    isOk: function(done){
      async.each(commands, function (item, callback){
        var req = request(acceptanceUrl);
        req.post(commandUri(item.command))
        .type('json')
        .send(item)
        .end( function(err, res){  
          if (err) {
            return done(err);
          }
          responses.push(res.body[0]);
          callback();

        });
      }, function(err){
          request(acceptanceUrl)
          .get('/api/gameHistory/' + commands[0].gameId)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.instanceof(Array);
            should(responses[responses.length - 1]).match(expectations[expectations.length - 1]);
            done();
          });
      })
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
        if (err) {
          return done(err);
        }
        request(acceptanceUrl)
          .get('/api/gameHistory/888')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
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

  it('Should result in Draw', function (done) {
    given(user("Gummi").createsGame("12").named("ThirdGame"))
    .and(user("Jonni").joinsGame("12").named("ThirdGame"))
    .and(user("Gummi").placesMove("12", 0, 0, "X"))
    .and(user("Jonni").placesMove("12", 0, 2, "O"))
    .and(user("Gummi").placesMove("12", 0, 1, "X"))
    .and(user("Jonni").placesMove("12", 1, 0, "O"))
    .and(user("Gummi").placesMove("12", 1, 2, "X"))
    .and(user("Jonni").placesMove("12", 1, 1, "O"))
    .and(user("Gummi").placesMove("12", 2, 0, "X"))
    .and(user("Jonni").placesMove("12", 2, 1, "O"))
    .and(user("Gummi").placesMove("12", 2, 2, "X"))
    .expect("Game Draw").byUser("Gummi").markOnCell(2, 2, "X").isOk(done);
  });



});

describe('TEST response from post', function () {
/* 
  it('Should execute fluid API test', function (done) {
    
    given(user("Gummi").createsGame("999").named("TheFirstGame"))
    .expect("GameCreated").withName("TheFirstGame").isOk(done);
  });

  it('Should allow another player to join a game', function (done) {
     given(user("Gummi").createsGame("1").named("FirstGame"))
     .and(user("Jonni").joinsGame("1").named("FirstGame"))
     .expect("GameJoined").byUser("Jonni").isOk(done);
  });

  it('Should allow player to make a move', function (done) {
    given(user("Gummi").createsGame("11").named("SecondGame"))
    .and(user("Jonni").joinsGame("11").named("SecondGame"))
    .and(user("Gummi").placesMove("11", 0, 0, "X"))
    .expect("MoveMade").byUser("Gummi").markOnCell(0, 0, "X").isOk(done);
  });
*/


});