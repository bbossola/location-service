var path = require('path');
var boxer = require('@workshare/boxer')({root: path.resolve('lib')});
var box = require('./../../lib/box')(boxer);
var app = boxer.fetch('app');

var request = require('supertest');

describe.only('[INT] Get Admin Version', function(){

  it('returns 200', function(done){
    var ip = '192.0.0.1';
    var req = request(app).get('/api/countries/' + ip);
    req.expect(200, done)
  });
});
