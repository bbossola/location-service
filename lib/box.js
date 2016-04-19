module.exports = function(boxer) {
    var fetch = boxer.fetch;

    //boxer.autobind('api');
    boxer.bind('express').to(function(){ return require('express'); });
    boxer.bind('Service').to(require('./Service'));
    boxer.bind('app').to(function() {
      return fetch('Service').getApp();
    });
};

