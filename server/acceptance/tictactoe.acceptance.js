'use strict';

var user = require('../fluid-api/tictactoeFluidApi').user;
var given = require('../fluid-api/tictactoeFluidApi').given;
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command =     {
      id : "1",
      gameId : "8888",
      command: "CreateGame",
      user: {
        userName: 'Gummi',
        side: 'X'
      },
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
          .get('/api/gameHistory/8888')
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
                "gameId": "8888",
                "event": "GameCreated",
                "user": {
                  "userName": 'Gummi',
                  "side": 'X'
                },
                "name": "FirstGame",
                "timeStamp": "2015-12-07T11:29:29"
              }]);
            done();
          });
      });
  });

  it('Should result in Draw', function (done) {
    given(user("Gummi").createsGame("1212").named("ThirdGame"))
    .and(user("Jonni").joinsGame("1212").named("ThirdGame"))
    .and(user("Gummi").placesMove("1212", 0, 0, "X"))
    .and(user("Jonni").placesMove("1212", 0, 2, "O"))
    .and(user("Gummi").placesMove("1212", 0, 1, "X"))
    .and(user("Jonni").placesMove("1212", 1, 0, "O"))
    .and(user("Gummi").placesMove("1212", 1, 2, "X"))
    .and(user("Jonni").placesMove("1212", 1, 1, "O"))
    .and(user("Gummi").placesMove("1212", 2, 0, "X"))
    .and(user("Jonni").placesMove("1212", 2, 1, "O"))
    .and(user("Gummi").placesMove("1212", 2, 2, "X"))
    .expect("Game Draw").byUser("Gummi").markOnCell(2, 2, "X").isOk(done);
  });

});
