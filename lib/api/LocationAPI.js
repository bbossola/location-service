'use strict';

module.exports = function(fetch) {
    var LocationAPI = function() {};

    LocationAPI.prototype = {

        get: function(request, response) {
            function parse(csv) {
                return csv.split(',');
            }
            response.json(fetch('finder').lookup(parse(request.params.ip)));
        }
    };
};
