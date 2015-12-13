HGOP Project Template (TicTacToe) 
=========
# Build Pipeline
[Build Pipeline](http://178.62.75.111/view/Hagn%C3%BDt%20g%C3%A6%C3%B0astj%C3%B3rnun%20og%20pr%C3%B3fanir%202015/)

# Commit stage status
[![Build Status](http://178.62.75.111/job/TicTacToe%20-%20Commit%20stage/badge/icon)](http://178.62.75.111/job/TicTacToe%20-%20Commit%20stage/)	

# Acceptance stage status
[![Build Status](http://178.62.75.111/job/TicTacToe%20-%20Acceptance%20stage/badge/icon)](http://178.62.75.111/job/TicTacToe%20-%20Acceptance%20stage/)

# Capacity test status
[![Build Status](http://178.62.75.111/job/TicTacToe%20-%20Load%20Test/badge/icon)](http://178.62.75.111/job/TicTacToe%20-%20Load%20Test/)

# Deployment status
[![Build Status](http://178.62.75.111/job/TicTacToe%20-%20Deploy/badge/icon)](http://178.62.75.111/job/TicTacToe%20-%20Deploy/)

### Project backlog

*	Can update latest version in production by push of a button
  
* Can get feedback on failed tests in CI
 
*	Can play tic-tac-toe against another user
 Implement using TDD
 Controller TDD
 Acceptance TDD
 Server side, API TDD
 Client TDD (React demo)
 
*	Can get an email when I win a match

 Implement an acceptance test, using test double to simulate email sending

*	Can see how many users played Tic-Tac-Toe in a given period

 Metrics and monitoring

*	Can know how many users our application supports on given hardware

 Automated capacity testing

*	Can be sure that latest version in production supports happy path after upgrade

 Acceptance test through UI
 Acceptance test through API

*	Can be sure that deployment is not continued if key resources are missing
  Env smoke tests
  Auto rollback

*	Can be sure that deployment is not continued if configuration parameter is not set
  Env smoke tests - use simple wget/curl/similar.
  
*	Can continue playing even if the whole world is playing back games
  CQRS - separate deployment for playback

*	Can downgrade to selected version by push of a button
 Implement rollback, including down migrations (demo)

*	Can playback old games after data structure has changed
 Database migration (demo)


*	Can update to latest version with zero downtime
  Blue/Green deployment and testing ?

*	Can play-back any given game to see how it was played
 Use event sourcing - record every user interaction

* Can trace binary back to version control.
 Store git hash for commit and package in build.
