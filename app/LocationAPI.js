'use strict';

var LocationFinder = require('./LocationFinder');

var LocationAPI = function(locationFinder) {

    if (locationFinder) {
        this.locationFinder = locationFinder;
    }
    else {
        this.locationFinder = new LocationFinder();
    }
};

LocationAPI.prototype = {

    //locationFinder: new LocationFinder(); // Andras why is this necessary?

    get: function(request, response) {
        function parse(csv) {
            return csv.split(',');
        }
        response.json(this.locationFinder.lookup(parse(request.params.ip)));
    }
};

module.exports = LocationAPI;
