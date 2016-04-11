'use strict';

module.exports = function(fetch) {

    var appPackageJSON = require('../package.json');


    var VersionAPI = function(packageJSON) {
        this.configJSON = packageJSON ? packageJSON : appPackageJSON;
    };

    VersionAPI.prototype = {

        configJSON: null,

        get: function(request, response) {
            var result = {};

            if(this.configJSON && this.configJSON.version) {
                response.status(200);
                result.version = this.configJSON.version;

            } else {
                response.status(500);
                result.error = 'We are unable to determine the version';
            }

            response.json(result);

        }


    };

    return VersionAPI;
}