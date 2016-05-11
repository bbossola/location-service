/* global beforeEach, describe, it, expect, sinon */

'use strict';

var path = require('path');

describe('HealthcheckAPI', function() {
    beforeEach(function(){
        this.boxer = require('@workshare/boxer')({root: path.resolve('lib')});
        this.boxer.bind('locationFinder').to(() => this.fakeLocationFinder);
        this.boxer.bind('healthcheckAPI').to(require('../../lib/api/admin/HealthcheckAPI'));
        this.fakeLocationFinder = {
            lookup: function(val) {
                if(val[0] == '8.8.8.8') {
                    return [{country: { iso_code: 'US' }}]
                }
            }
        };

        this.doSetup = function() {
          this.healthcheckAPI = this.boxer.fetch('healthcheckAPI');
        };

        this.request = {};

        this.response = {
            json: sinon.spy(),
            status: sinon.spy(),
        };
    });

    it('should respond 200 on locationFinder successful call', function() {
        this.doSetup();
        this.healthcheckAPI(this.request, this.response);

        expect(this.response.status).to.have.been.calledWith(200);
        expect(this.response.json).to.have.been.calledWith({
            'database': {
                'healthy': true,
            }
        });
    });

    it('should respond 500 on locationFinder unsuccessful call', function() {
        this.fakeLocationFinder.lookup = function() {
            return null;
        };
        this.doSetup();

        this.healthcheckAPI(this.request, this.response);

        expect(this.response.status).to.have.been.calledWith(500);
        expect(this.response.json).to.have.been.calledWith({
            'database': {
                'healthy': false,
            }
        });
    });
});