#!/bin/bash

echo Starting Docker
sudo service docker start
[ $? -eq 0 ] || exit $?

echo NPM Install
sudo npm install
[ $? -eq 0 ] || exit $?

echo Bower Install
sudo bower install
[ $? -eq 0 ] || exit $?

echo Cleaning...
rm -rf ./dist

echo Building app
sudo grunt
[ $? -eq 0 ] || exit $?

cp ./Dockerfile ./dist/

cd dist
sudo npm install --production

echo Building docker image
docker build -t hardag/tictactoe . && echo "Done"
