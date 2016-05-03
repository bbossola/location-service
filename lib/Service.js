'use strict';

module.exports = function(fetch) {
    var http = fetch('http'),
        express = fetch('express'),
        swaggerUiMiddleware = fetch('swagger-ui-middleware'),
        versionAPI = fetch('api.admin.VersionAPI'),
        locationAPI = fetch('api.LocationAPI'),
        healthcheckAPI = fetch('api.admin.HealthcheckAPI');


    function getApp() {
        var app = express();

        swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});
        app.get('/api/countries/:ip', locationAPI);
        app.get('/admin/healthcheck', healthcheckAPI);
        app.get('/admin/version', versionAPI);

        return app;
    };

    function start(port) {
        var server = http.createServer(getApp());
        server.listen(port, function() {
            console.log('Service started on port ' + port);
        });

        return server;
    };


    return { getApp: getApp, start: start };
};
