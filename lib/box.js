module.exports = function(boxer) {
  console.log('+++++++++++ Evaluating lib');
  var fetch = boxer.fetch;

  //boxer.autobind('api');
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
  boxer.bind('Service').to(require('./Service'));
  boxer.bind('app').to(function() { return fetch('Service').getApp(); });
  boxer.autobind('api');
};

