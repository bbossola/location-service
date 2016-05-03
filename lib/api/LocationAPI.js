'use strict';

module.exports = function(fetch) {

    return function(request, response) {
        function parse(csv) {
            return csv.split(',');
        }
        response.json(fetch('LocationFinder').lookup(parse(request.params.ip)));
    };
};
