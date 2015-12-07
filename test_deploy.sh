sudo service docker start
rc=$?; if [[ $rc != 0 ]]; then echo "Docker didn't start"; exit $rc; fi

echo ---- Pushing to Docker ----
yes | docker push hardag/tictactoe

ssh root@$1 "sudo pkill -9 docker; docker rm -f $(docker ps -a -q); docker rmi -f $(docker images -q); sudo service docker start && docker pull hardag/tictactoe && docker run -p 80:8080 -d -e "NODE_ENV=production" hardag/tictactoe && echo ---- Docker running on $1 ---- && "

export ACCEPTANCE_URL=http://162.243.121.139
grunt mochaTest:acceptance
rc=$?; if [[ $rc != 0 ]]; then echo "Acceptance test failed"; exit $rc; fi