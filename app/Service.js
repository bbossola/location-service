'use strict';

var http = require('http');
var express = require('express');
var LocationAPI = require('./LocationAPI');
var HealthcheckAPI = require('./HealthcheckAPI');
var VersionAPI = require('./VersionAPI');
var swaggerUiMiddleware = require('swagger-ui-middleware');

function Service(apis) {
    apis = apis || {};
    this.locationAPI = apis.locationAPI ? apis.locationAPI: new LocationAPI();
    this.healthcheckAPI = apis.healthcheckAPI ? apis.healthcheckAPI: new HealthcheckAPI();
    this.versionAPI  = apis.versionAPI ? apis.versionAPI : new VersionAPI();
}

Service.prototype = {

    start: function(port) {
        var app = express(),
            locationAPI = this.locationAPI,
            healthcheckAPI = this.healthcheckAPI,
            versionAPI = this.versionAPI;

        swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});

        app.get('/', function(request, response) {
            response.redirect('/api-doc');
        });

        app.get('/api/v1.0/countries/:ip', function(request, response) {
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

module.exports = Service;
