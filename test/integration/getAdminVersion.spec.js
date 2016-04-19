var boxer = require('@workshare/boxer')({});
var box = require('./../../lib/box')(boxer);
var app = boxer.fetch('app');

var request = require('supertest');

describe.only('[INT] Get Admin Version', function(){

  it('returns 200', function(done){
    var req = request(app).get('/admin/version');
    req.expect(200, done)
  });

  it('returns the version file', function(done){
    var req = request(app).get('/admin/version');
    req.expect('SomeVersion', done);
  });

});