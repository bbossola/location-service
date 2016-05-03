var path = require('path');
var boxer = require('@workshare/boxer')({root: path.resolve('lib')});
var box = require('./../../lib/box')(boxer);
var app = boxer.fetch('app');

var request = require('supertest');

describe('[INT] Get Admin Version', function(){

  it('returns 200', function(done){
    var req = request(app).get('/admin/version');
    req.expect(200, done)
  });

  it('returns the version file', function(done){
    var req = request(app).get('/admin/version');
    req.expect('SomeVersion', done);
  });

});
