echo ---- Deploy to Production Machine on $3----
ssh root@$3 "sudo service docker stop ; sudo pkill -9 docker; docker rm -f $(docker ps -aq); docker rmi -f $(docker images -q); sudo service docker start ; docker pull hardag/tictactoe:"$GIT_PREVIOUS_SUCCESSFUL_COMMIT" && docker run -p 80:8080 -d -e "NODE_ENV=production" hardag/tictactoe:"$GIT_PREVIOUS_SUCCESSFUL_COMMIT" && echo ---- Docker running on $3 ----"