head	1.1;
access;
symbols;
locks; strict;
comment	@# @;


1.1
date	2015.11.27.13.13.12;	author vagrant;	state Exp;
branches;
next	;


desc
@q
@


1.1
log
@Initial revision
@
text
@#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
[ $? -eq 0 ] || exit $?

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t hardag/tictactoe .
[ $? -eq 0 ] || exit $?

echo "Done"
@
