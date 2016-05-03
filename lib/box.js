module.exports = function(boxer) {
  console.log('+++++++++++ Evaluating lib');
  var fetch = boxer.fetch;

  boxer.bind('versionFile').to(function(){
    var fs = require('fs');
    var path = require('path');
    var filePath;

    if(fs.existsSync('./config/version.yml')) {
      filePath = './config/version.yml';
    } else {
      filePath = './config/version-sample.yml';
    }

    return path.resolve(filePath);
  });

  boxer.bind('express').to(function(){ return require('express'); });
  boxer.bind('http').to(function(){ return require('http'); });
  boxer.bind('swagger-ui-middleware').to(function(){ return require('swagger-ui-middleware'); });

  boxer.bind('Service').to(require('./Service'));
  boxer.bind('app').to(function() { return fetch('Service').getApp(); });

  //boxer.bind('LocationFinder').to(require('./LocationFinder'));
  boxer.autobind();
  boxer.autobind('api');
};

