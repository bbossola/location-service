'use strict';

module.exports = function(fetch) {
    var http = fetch('http');
    var express = fetch('express');
    var swaggerUiMiddleware = fetch('swagger-ui-middleware');

    function Service() {}

    Service.prototype = {

        start: function(port) {
            var app = express(),
                locationAPI = fetch('api.LocationAPI'),
                healthcheckAPI = fetch('api.HealthcheckAPI'),
                versionAPI = fetch('api.VersionAPI');

            swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});

            app.get('/api/countries/:ip', function(request, response) {
                locationAPI.get(request, response);
            });

            app.get('/admin/healthcheck', function(request, response) {
                healthcheckAPI.get(request, response);
            });

            app.get('/admin/version', function(request, response) {
                versionAPI.get(request, response);
            });

            var server = http.createServer(app);
            server.listen(port, function() {
                console.log('Service started on port ' + port);
            });

            return server;
        }
    };
};
