module.exports = function(boxer) {
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

  boxer.bind('service').to(require('./service'));
  boxer.bind('app').to(() => fetch('service').getApp());

  boxer.autobind();
  boxer.autobind('api');
  boxer.bind('geolite').to(() => require('node-geolite2'));
  boxer.bind('fs').to(() => require('fs'));
};

