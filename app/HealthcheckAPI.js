'use strict';

var LocationFinder = require('./LocationFinder');

var HealthcheckAPI = function(locationFinder) {
    this.locationFinder = locationFinder ? locationFinder : new LocationFinder();
};

HealthcheckAPI.prototype = {

    locationFinder: null,

    get: function(request, response) {
    	var healthy;
    	var lookups;
    	try {
	    	lookups = this.locationFinder.lookup(['8.8.8.8']);
	    	healthy = (lookups[0].country.iso_code === 'US');
    	} catch (e) {
	    	healthy = false;
    	}

    	response.status(healthy ? 200 : 500);		
    	response.json({
            'database': {
                'healthy': healthy,
            }
        });		
    }
};

module.exports = HealthcheckAPI;
