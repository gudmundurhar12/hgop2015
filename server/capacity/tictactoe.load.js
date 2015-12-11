var user = require('../fluid-api/tictactoeFluidApi').user;
var given = require('../fluid-api/tictactoeFluidApi').given;

it('Should play 1000 games in x seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 1000;
  var x = 30;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    /*
    given(user("TestUserOne").createsGame("" + gameId))

      ...play game to end...

      .expect("GameCreated").isOk(QED);
    */

     given(user("Gummi").createsGame("" + gameId).named("Game: " + gameId))
    .and(user("Jonni").joinsGame("" + gameId).named("Game: " + gameId))
    .and(user("Gummi").placesMove("" + gameId, 0, 0, "X"))
    .and(user("Jonni").placesMove("" + gameId, 0, 2, "O"))
    .and(user("Gummi").placesMove("" + gameId, 0, 1, "X"))
    .and(user("Jonni").placesMove("" + gameId, 1, 0, "O"))
    .and(user("Gummi").placesMove("" + gameId, 1, 2, "X"))
    .and(user("Jonni").placesMove("" + gameId, 1, 1, "O"))
    .and(user("Gummi").placesMove("" + gameId, 2, 0, "X"))
    .and(user("Jonni").placesMove("" + gameId, 2, 1, "O"))
    .and(user("Gummi").placesMove("" + gameId, 2, 2, "X"))
    .expect("Game Draw").byUser("Gummi").markOnCell(2, 2, "X").isOk(QED);
  }
});	