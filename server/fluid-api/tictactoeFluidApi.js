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
      async.eachSeries(commands, function (item, callback){
        var req = request(acceptanceUrl);
        req.post(commandUri(item.command))
        .type('json')
        .send(item)
        .end( function(err, res){  
          if (err) {
            return done(err);
          }
          callback();
        });
      }, function(callback, err){
          request(acceptanceUrl)
          .get('/api/gameHistory/' + commands[0].gameId)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.instanceof(Array);
            should(res.body[res.body.length - 1]).match(expectations[expectations.length - 1]);
            done();
          });
      })
    }
  };
  return givenApi;
}

module.exports.user = user;
module.exports.given = given;