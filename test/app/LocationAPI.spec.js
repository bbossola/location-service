/* global beforeEach, describe, it, expect, sinon */

'use strict';

var locationApiFactory = require('../../app/LocationAPI');
var assert = require('assert');

describe('LocationAPI', function() {
    beforeEach(function() {
        this.ip = '192.0.0.1';
        this.locationFinderResponse = 'SomeLocation';

        this.setup = function() {
            this.req = {
                params: {
                    ip: this.ip
                }
            };

            this.res = {
                json: function(value) {
                    this.jsonValue = value;
                }.bind(this)
            }
        };

        this.getSubject = function() {
            this.fetch = function(dependency) {
                if(dependency === 'LocationFinder') {
                    return {
                        lookup: function(value) {
                            if(JSON.stringify(value) == JSON.stringify(this.ip.split(','))) {
                                return this.locationFinderResponse;
                            };
                        }.bind(this)
                    };
                } else {
                    throw new Error('dependency ' + dependency + ' not found')
                };
            }.bind(this);

            var klass = locationApiFactory(this.fetch);
            return new klass();
        };

        this.doAction = function() {
            this.setup();
            this.getSubject().get(this.req, this.res);
        };
    });

    describe.only('#get', function(){
        describe('when the ip contains only one value', function(){
            beforeEach(function(){
                this.ip = '192.0.0.1';
            });

            it('should respond with the expected location looked up in the locationFinder', function(){
                this.doAction();
                assert.equal(this.jsonValue, this.locationFinderResponse);
            });
        });

        describe('when the ip contains multiple values', function(){
            beforeEach(function(){
                this.ip = '192.0.0.1,255.255.255.0';
            });

            it('should respond with the expected location looked up in the locationFinder', function(){
                this.doAction();
                assert.equal(this.jsonValue, this.locationFinderResponse);
            });
        });
    });
});