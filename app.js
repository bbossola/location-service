var path = require('path');
var boxer = require('@workshare/boxer')({
    root: path.resolve('lib')
});
var box = require('./lib/box')(boxer);
var config = require('config');

boxer.fetch('service').start(config.get('port'));
