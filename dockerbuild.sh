#!/bin/bash

echo Starting Docker
sudo service docker start
[ $? -eq 0 ] || exit $?

echo NPM Install
npm install
rc=$?; if [[ $rc != 0 ]]; then echo "NPM install failed"; exit $rc; fi

echo Bower Install
bower install || sudo bower --allow-root install
rc=$?; if [[ $rc != 0 ]]; then echo "Bower install failed"; exit $rc; fi

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
rc=$?; if [[ $rc != 0 ]]; then echo "Grunt build failed"; exit $rc; fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
rc=$?; if [[ $rc != 0 ]]; then echo "NPM-production install failed"; exit $rc; fi

echo Building docker image
docker build -t hardag/tictactoe . 
rc=$?; if [[ $rc != 0 ]]; then echo "Docker build failed"; exit $rc; fi

echo "Done"
