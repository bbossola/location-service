var box = require('./app/box')(require('@workshare/boxer'));
var config = require('config');

box.fetch('Service').start(config.get('port'));
