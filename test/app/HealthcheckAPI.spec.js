/* global beforeEach, describe, it, expect, sinon */

'use strict';

var HealthcheckAPI = require('../../app/HealthcheckAPI');
var LocationFinder = require('../../app/LocationFinder');

describe('HealthcheckAPI', function() {

    var healthcheckAPI,
        locationFinder,
        request,
        response;

    beforeEach(function() {
        locationFinder = sinon.stub(new LocationFinder());
        healthcheckAPI = new HealthcheckAPI(locationFinder);

        request = {};

        response = {
            json: sinon.spy(),
            status: sinon.spy(),
        };
    });

    it('should respond 200 on locationFinder successful call', function() {

        // Arrange
        locationFinder.lookup = function() {
            return {
                'country': {
                    'iso_code': 'US'
                }
            };
        };

        // Act
        healthcheckAPI.get(request, response);

        // Assert
        expect(response.status).to.have.been.calledWith(200);
    });

    it('should respond 500 on locationFinder unsuccessful call', function() {

        // Arrange
        locationFinder.lookup = function() {
            return null;
        };

        // Act
        healthcheckAPI.get(request, response);

        // Assert
        expect(response.status).to.have.been.calledWith(500);
    });

    it('should respond with json on locationFinder successful call', function() {

        // Arrange
        locationFinder.lookup = function() {
            return {
                'country': {
                    'iso_code': 'US'
                }
            };
        };

        // Act
        healthcheckAPI.get(request, response);

        // Assert
        var expectedJson = {
            'database': {
                'healthy': true,
            }
        };

        expect(response.json).to.have.been.calledWith(expectedJson);
    });

    it('should respond with json on locationFinder unsuccessful call', function() {

        // Arrange
        locationFinder.lookup = function() {
            return null;
        };

        // Act
        healthcheckAPI.get(request, response);

        // Assert
        var expectedJson = {
            'database': {
                'healthy': false,
            }
        };

        expect(response.json).to.have.been.calledWith(expectedJson);
    });
});