'use strict';

module.exports = function(fetch) {
    //var http = fetch('http');
    var express = fetch('express');
    //var swaggerUiMiddleware = fetch('swagger-ui-middleware');

    function getApp() {
        var app = express()//,
        //     locationAPI = fetch('api.LocationAPI'),
        //     healthcheckAPI = fetch('api.HealthcheckAPI'),
        //     versionAPI = fetch('api.VersionAPI');

        // swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});

        // app.get('/api/countries/:ip', function(request, response) {
        //     locationAPI.get(request, response);
        // });

        // app.get('/admin/healthcheck', function(request, response) {
        //     healthcheckAPI.get(request, response);
        // });

        // app.get('/admin/version', function(request, response) {
        //     versionAPI.get(request, response);
        // });
        app.get('/admin/version', function(req, res) {
            res.status(200);
            res.end();
        });

        return app;
    };

    function start() {
        var server = http.createServer(getApp());
        server.listen(port, function() {
            console.log('Service started on port ' + port);
        });

        return server;
    };


    return { getApp: getApp, start: start };
};
