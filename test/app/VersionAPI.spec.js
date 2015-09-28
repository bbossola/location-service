/* global beforeEach, describe, it, expect, sinon */

'use strict';

var VersionAPI = require('../../app/VersionAPI');

describe('VersionAPI', function() {

    var versionAPI,
        request,
        response;

    beforeEach(function() {
        versionAPI = new VersionAPI();

        request = { params: {} };
        response = {
            json: sinon.spy(),
            status: sinon.spy()
        };
    });


    it('should respond 200 OK on versionAPI successful call', function() {

        // Act
        versionAPI.get(request, response);

        // Assert
        expect(response.status).to.have.been.calledWith(200);
    });


    it('should respond 500 error on versionAPI unsuccessful call', function() {
        // Arrange
        versionAPI.configJSON = {};

        // Act
        versionAPI.get(request, response);

        // Assert
        expect(response.status).to.have.been.calledWith(500);
    });

    it('should respond with the version in the json on versionAPI successful call', function() {
        // Arrange
        versionAPI.configJSON = { version: '1001' };

        // Act
        versionAPI.get(request, response);

        // Assert
        var expectedJson = {
            'version': '1001'
        };

        expect(response.json).to.have.been.calledWith(expectedJson);
    });

    it('should respond with an error in the json on versionAPI unsuccessful call', function() {
        // Arrange
        versionAPI.configJSON = {};

        // Act
        versionAPI.get(request, response);

        // Assert
        var expectedJson = {
            'error': 'We are unable to determine the version'
        };

        expect(response.json).to.have.been.calledWith(expectedJson);
    });


});