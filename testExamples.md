# Test Examples
=========

## Game creation/joining a game
Player creates a game

+ Given []
+ When  [ CreateGame(gameName, Player1) ]
+ Then  [ GameCreated(gameName, Player1) ]

Player tries to create a game with same name as another game

+ Given [ GameCreated(gameName, Player1) ]
+ When  [ CreateGame(gameName, Player2) ]
+ Then  [ GameWithSameNameExists(gameName, player2) ]

Player joins an existing game

+ Given [ GameCreated(gameName, Player1) ]
+ When  [ JoinGame(gameName, Player2) ]
+ Then  [ GameJoined(gameName, Player2) ]

Player tries to join a game with two players

+ Given [ GameCreated(gameName, Player1), GameJoined(gamename, Player2) ]
+ When  [ JoinGame(gameName, Player3) ]
+ Then  [ GameFull(gameName) ]

=========

## Illegal moves

Player tries to join a game when there is no game

+ Given []
+ When  [ JoinGame(gameName, Player1) ]
+ Then  [ GameDoesNotExist() ]

Player makes a move when it's not his turn

+ Given [ Placed(0, 0, X) ]
+ When  [ Place(0, 1, X) ]
+ Then  [ NotPlayersTurn(O) ]

Player places his mark on an occupied tile

+ Given [ Placed(0, 0, X) ]
+ When  [ Place(0, 0, O) ]
+ Then  [ TileOccupied(0, 0) ]

=========

## Win scenarios

Vertical win

+ Given [ Placed(0, 0, X), Placed(0, 1, O), Placed(2, 0, X), Placed(0, 2, O) ]
+ When  [ Place(1, 0, X) ]
+ Then  [ PlayerWins(X) ]

Horizontal win

+ Given [ Placed(0, 0, X), Placed(1, 0, O), Placed(0, 2, X), Placed(1, 2, O) ]
+ When  [ Place(0, 1, X) ]
+ Then  [ PlayerWins(X) ]

Diagonal win

+ Given [ Placed(0, 0, X), Placed(0, 1, O), Placed(1, 1, X), Placed(0, 2, O) ]
+ When  [ Place(2, 2, X) ]
+ Then  [ PlayerWins(X) ]

=========

## Draw scenarios

+ Given [ Placed(0, 0, X), Placed(0, 2, O), Placed(0, 1, X), Placed(1, 0, O), Placed(1, 2, X), Placed(1, 1, O), Placed(2, 0, X), Placed(2, 1, O) ]
+ When  [ Place(2, 2, X) ]
+ Then  [ Draw ]

=========