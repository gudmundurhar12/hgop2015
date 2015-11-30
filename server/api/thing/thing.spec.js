head	1.1;
access;
symbols;
locks; strict;
comment	@# @;


1.1
date	2015.11.30.11.41.51;	author vagrant;	state Exp;
branches;
next	;


desc
@@


1.1
log
@Initial revision
@
text
@'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/things', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/things')	
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
@
