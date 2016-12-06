/* global afterEach, describe, it, expect, sinon */
/* jshint expr: true */

'use strict';

var supertest = require('supertest');

var Service = require('../../app/Service');
var LocationAPI = require('../../app/LocationAPI');
var VersionAPI = require('../../app/VersionAPI');
var HealthcheckAPI = require('../../app/HealthcheckAPI');

describe('Service', function() {

    var app;

    afterEach(function() {
        if (app) {
            app.close();
        }
    });

    it('should call locationAPI at /api/countries' , function(done) {

        var locationAPI = new LocationAPI();
        var locationAPIGet = sinon.spy(locationAPI, 'get');

        app = new Service({locationAPI: locationAPI}).start(1234);

        supertest(app)
            .get('/api/v1.0/countries/128.1.1.231')
            .expect(function() {
                expect(locationAPIGet).to.have.been.called;
            })
            .end(done);
    });

    it('should call healthcheckAPI at /admin/healthcheck' , function(done) {

        var healthcheckAPI = new HealthcheckAPI();
        var healthcheckAPIGet = sinon.spy(healthcheckAPI, 'get');

        app = new Service({healthcheckAPI: healthcheckAPI}).start(1234);

        supertest(app)
            .get('/admin/healthcheck')
            .expect(function() {
                expect(healthcheckAPIGet).to.have.been.called;
            })
            .end(done);
    });

    it('should call versionAPI at /admin/version endpoint' , function(done) {

        var versionAPI = new VersionAPI();
        var versionAPIGet = sinon.spy(versionAPI, 'get');

        app = new Service({versionAPI: versionAPI}).start(1234);

        supertest(app)
            .get('/admin/version')
            .expect(function() {
                expect(versionAPIGet).to.have.been.called;
            })
            .end(done);
    });
});
