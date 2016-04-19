var repl = require("repl");

var boxer = require('@workshare/boxer')({});
var box = require('./lib/box')(boxer);

console.log('>>> Welcome to the Location microservice Repl.');
console.log('>>> The boxer object is available from here.');
r = repl.start("Location> ");
r.context.boxer = boxer;
r.context.$ = function(inspectable) {
  console.log('' + inspectable);
};