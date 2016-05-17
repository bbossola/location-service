'use strict';


module.exports = function(fetch) {
	var locationFinder = fetch('locationFinder');

	return function(request, response) {
		var healthy;
		var lookups;

		try {
			lookups = locationFinder.lookup(['8.8.8.8']);
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
	};
}


