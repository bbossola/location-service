var boxer = require('@workshare/boxer')({});
var box = require('./../../lib/box')(boxer);
var app = boxer.fetch('app');

var request = require('supertest');

describe('[INT] Get Admin Version', function(){
  it.only('returns 200', function(){
    var req = request(app).get('/admin/version');
    req.expect(200)
  });

  it('returns the version file', function(){
    var req = request(app).get('/admin/version');
    req.expect(200)
  });
});