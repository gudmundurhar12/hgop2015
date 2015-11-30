sudo service docker start
docker push hardag/tictactoe
ssh root@162.243.121.139 "sudo pkill -9 docker; sudo service docker start && docker pull hardag/tictactoe && docker run -p 80:8080 -d -e "NODE_ENV=production" hardag/tictactoe"
