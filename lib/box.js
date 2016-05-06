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

  boxer.bind('express').to(() => require('express'));
  boxer.bind('http').to(() => require('http'));
  boxer.bind('swagger-ui-middleware').to(() => require('swagger-ui-middleware'));

  boxer.bind('Service').to(require('./Service'));
  boxer.bind('app').to(() => fetch('Service').getApp());

  //boxer.bind('LocationFinder').to(require('./LocationFinder'));
  boxer.autobind();
  boxer.autobind('api');
  boxer.bind('geolite').to(() => require('node-geolite2'));
};

