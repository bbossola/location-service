/* global afterEach, describe, it, expect, sinon */

'use strict';

var supertest = require('supertest');

var path = require('path');
var boxer = require('@workshare/boxer')({root: path.resolve('lib')});

boxer.bind('service').to(require('../../lib/Service'));
boxer.bind('http').to(() => require('http'));
boxer.bind('express').to(() => require('express'));

boxer.bind('swagger-ui-middleware').to(() => require('swagger-ui-middleware'));

var versionAPI = sinon.spy(function(req, res, next) { next() });
boxer.bind('api.admin.VersionAPI').to(() => versionAPI);

var locationAPI = sinon.spy(function(req, res, next) { next() });
boxer.bind('api.LocationAPI').to(() => locationAPI);

var healthcheckAPI = sinon.spy(function(req, res, next) { next() });
boxer.bind('api.admin.HealthcheckAPI').to(() => healthcheckAPI);

var service = boxer.fetch('service');
var app;

describe('Service', function() {
    it('should call locationAPI at /api/countries' , function(done) {
        app = service.getApp();

        supertest(app)
            .get('/api/countries/128.1.1.231')
            .expect(function() {
                expect(locationAPI).to.have.been.called;
            })
            .end(done);
    });

    it('should call healthcheckAPI at /admin/healthcheck' , function(done) {
        app = service.getApp();

        supertest(app)
            .get('/admin/healthcheck')
            .expect(function() {
                expect(healthcheckAPI).to.have.been.called;
            })
            .end(done);
    });

    it('should call versionAPI at /admin/version endpoint' , function(done) {
        app = service.getApp();

        supertest(app)
            .get('/admin/version')
            .expect(function() {
                expect(versionAPI).to.have.been.called;
            })
            .end(done);
    });
});


