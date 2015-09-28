'use strict';
var geolite = require('node-geolite2');
geolite.init();

function LocationFinder() {

}

LocationFinder.prototype = {
    lookup: function(ip) {

      return ip.map( function(ip){
        try {
          return this.serialize(geolite.getGeoDataSync(ip), ip);
        }
        catch(e) {
          return {host: ip, error: 'Unknown host: ' + ip};
        }
      }, this);

    },
    serialize: function(geolite_response, ip) {
      var result = {};
      if(geolite_response) {
        result.country = {};
        result.country.language = 'en';
        result.country.iso_code = geolite_response.country.iso_code;
        result.country.name = geolite_response.country.names.en;
        result.host = ip;
      } else {
        result.host = ip;
        result.error = 'The address ' + ip + ' is not in the database.';
      }
      
      return result;
    }
};

module.exports = LocationFinder;