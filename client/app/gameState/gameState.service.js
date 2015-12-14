'use strict';

angular.module('tictactoeApp')
  .factory('gameState', function () {
    return function () {

      var gameState = {
        created: false,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        nextTurn: 'X',
        gameDraw: false,
        winner: undefined,
        mutate: function (events) {
          var handlers = {
            'GameCreated': function (event, gameState) {
              gameState.created = true;
              gameState.name = event.name;
              gameState.gameId = event.gameId;
              gameState.creatingUser = event.user;
            },
            'GameJoined': function (event, gameState) {
              gameState.joiningUser = event.user;
            },
            'MoveMade': function (event, gameState) {
              var x = event.x, y = event.y;
              gameState.board[x][y] = event.user.side;
              gameState.nextTurn = event.user.side === 'X' ? 'O' : 'X';
            },
            'IllegalMove' : function(event, gameState){
              gameState.nextTurn = event.user.side;
            },
            'NotPlayersTurn': function(event, gameState){
              gameState.nextTurn = event.user.side;
            },
            'Game Won': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.winner = event.user;
            },
            'Game Draw': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.gameDraw = true;
            }
          };
          console.debug('Mutating with events', events);
          _.each(events, function (ev) {
            if(!ev) {
              return;
            }
            if(handlers[ev.event]){
              handlers[ev.event](ev, gameState);
            }
          });
        }
      };
      return gameState;
    };
  });
