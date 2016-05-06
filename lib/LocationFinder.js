'use strict';

module.exports = function(fetch) {
  var geolite = fetch('geolite');
  geolite.init();

  var lookup = function(ip) {

    return ip.map(function(ip){
      try {
        console.log(ip)
        console.log(geolite.getGeoDataSync(ip))
        return serialize(geolite.getGeoDataSync(ip), ip);
      }
      catch(e) {
        return {host: ip, error: 'Unknown host: ' + ip};
      }
    });

  };

  var serialize = function(geolite_response, ip) {
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
  };

  return { lookup: lookup, serialize: serialize };
};