'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, gameState, guid, $location, $interval) {

    $scope.gameState = gameState();

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        $scope.gameState.mutate(data.data);
      });

      postPromise.then(function(){

        if (mySide() === 'X'){
          $scope.me = $scope.gameState.creatingUser;
          $scope.other = $scope.gameState.joiningUser;
        } else {
          $scope.other = $scope.gameState.creatingUser;
          $scope.me = $scope.gameState.joiningUser;
        }

        $scope.joinUrl = 'http://' + $location.host() +( $location.port() ? ':' + $location.port() :'') + '/join/' + $scope.gameState.gameId;

      });
    };


    var gameId = $location.search().gameId;

    function refresh() {
      thenHandleEvents($http.get('/api/gameHistory/' + gameId));
    }

    refresh();
    $interval(refresh, 2000);

    function mySide() {
      return $location.search().gameSide;
    }

    $scope.myTurn = function () {
      return mySide() === $scope.gameState.nextTurn;
    };

    $scope.placeMove = function (xCoords, yCoords) {
      if(!$scope.myTurn()){
        return;
      }
      $scope.me.side = mySide();
      $scope.me.state = 
      thenHandleEvents($http.post('/api/placeMove/', {
          gameId: $scope.gameState.gameId,
          command: 'MakeMove',
          user: $scope.me,
          timeStamp: '2014-12-02T11:29:29',
          x: xCoords,
          y: yCoords
        }

      ));
    };
  });
