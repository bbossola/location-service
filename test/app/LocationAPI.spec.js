/* global beforeEach, describe, it, expect, sinon */

'use strict';

var fetch = function(dependency) {
    if(dependency === 'LocationFinder') {
        return function() {};
    } else {
        throw new Error('dependency ' + dependency + ' not found')
    };
};


describe('LocationAPI', function() {

    var locationAPI,
        locationFinder,
        request,
        response;

    beforeEach(function() {
        var boxer = require('@workshare/boxer')({});
        locationFinder = sinon.stub();

        boxer.bind('LocationFinder').to(function(){ return locationFinder; });
        var LocationAPI = require('../../app/LocationAPI')(boxer.fetch);
        locationAPI = new LocationAPI();

        request = { params: {} };
        response = {
            json: sinon.spy()
        };
    });

    it.only('should response locationFinder\'s result in the response', function() {

        // Arrange
        request.params.ip = '';

        var expectedLocation = {};
        locationFinder.lookup = function() {
            return expectedLocation;
        };

        // Act
        locationAPI.get(request, response);

        // Assert
        expect(response.json).to.have.been.calledWith(expectedLocation);
    });

    it('should pass an ip to LocationFinder\'s lookup', function() {

        // Arrange
        request.params.ip = '24.24.24.24';

        // Act
        locationAPI.get(request, response);

        // Assert
        expect(locationFinder.lookup).to.have.been.calledWith(['24.24.24.24']);
    });

    it('should pass multiple ips to LocationFinder\'s lookup', function() {

        // Arrange
        request.params.ip = '24.24.24.24,55.55.55.55';

        // Act
        locationAPI.get(request, response);

        // Assert
        expect(locationFinder.lookup).to.have.been.calledWith(['24.24.24.24', '55.55.55.55']);
    });
});