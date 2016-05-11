/* global beforeEach, describe, it, expect, sinon */

'use strict';

const path = require('path');

describe('VersionAPI', function() {

    var versionAPI,
        request,
        response;

    beforeEach(function() {
        this.boxer = require('@workshare/boxer')({root: path.resolve('lib')});
        this.boxer.bind('versionAPI').to(require('../../lib/api/admin/versionAPI'));
        this.boxer.bind('versionFile').to(() => 'some_file.txt')
        this.boxer.bind('fs').to(() => this.fakeFs);

        this.fakeFs = {
            readFileSync: function(filePath) {
                if(filePath === 'some_file.txt') {
                    return 'some_content';
                }
            }
        };

        this.doSetup = function() {
          this.versionAPI = this.boxer.fetch('versionAPI');
        };

        this.request = {};

        this.response = {
            status: sinon.spy(function(){
                return this;
            }),
            type: sinon.spy(function(){
                return this;
            }),
            send: sinon.spy(function(){
                return this;
            })
        };
    });

    it('should respond 200 OK on versionAPI successful call', function() {
        this.doSetup();
        this.versionAPI(this.request, this.response);
        expect(this.response.status).to.have.been.calledWith(200);
        expect(this.response.type).to.have.been.calledWith('text/plain');
        expect(this.response.send).to.have.been.calledWith('some_content');
    });
});