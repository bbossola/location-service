'use strict';

module.exports = function(fetch) {
    var locationFinder = fetch('LocationFinder');

    var LocationAPI = function() {
    };

    LocationAPI.prototype = {

        get: function(request, response) {
            function parse(csv) {
                return csv.split(',');
            }
            response.json(this.locationFinder.lookup(parse(request.params.ip)));
        }
    };

    return LocationAPI;
}