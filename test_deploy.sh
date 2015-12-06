sudo service docker start
echo ---- Pushing to Docker ----
yes | docker push hardag/tictactoe
ssh root@$1 "sudo pkill -9 docker; docker rm -f $(docker ps -a -q); docker rmi -f $(docker images -q); sudo service docker start && docker pull hardag/tictactoe && docker run -p 80:8080 -d -e "NODE_ENV=production" hardag/tictactoe && echo ---- Docker running on $1 ----"
