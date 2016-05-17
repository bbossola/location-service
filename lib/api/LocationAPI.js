'use strict';

module.exports = function(fetch) {
  var logger = fetch('logger');

  return function(request, response) {
    function parse(csv) {
      return csv.split(',');
    }

    logger.info("Looking for ips " + request.params.ip);
    response.json(fetch('locationFinder').lookup(parse(request.params.ip)));
  };
};
