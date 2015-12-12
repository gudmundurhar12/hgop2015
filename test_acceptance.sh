sudo service docker start
rc=$?; if [[ $rc != 0 ]]; then echo "Docker didn't start"; exit $rc; fi

echo ---- Starting docker on $1 ----
ssh root@$1 "sudo service docker stop ; sudo pkill -9 docker; docker rm -f $(docker ps -aq); docker rmi -f $(docker images -q); sudo service docker start ; docker pull hardag/tictactoe:"$GIT_COMMIT" && docker run -p 80:8080 -d -e "NODE_ENV=production" hardag/tictactoe:"$GIT_COMMIT" && echo ---- Docker running on $1 ----"

echo ---- Run Acceptance Test on $1 ----
export ACCEPTANCE_URL=http://$1
export MOCHA_REPORTER=xunit
export MOCHA_REPORT=server-tests.xml
sleep 2
grunt mochaTest:acceptance
rc=$?; if [[ $rc != 0 ]]; then echo "Acceptance test failed"; exit $rc; fi

export GIT_PREVIOUS_SUCCESSFUL_COMMIT=$(echo $GIT_COMMIT)
echo GIT_PREVIOUS_SUCCESSFUL_COMMIT=$GIT_PREVIOUS_SUCCESSFUL_COMMIT > ../properties.txt