/* global beforeEach, describe, it, expect, sinon */

'use strict';

var path = require('path');


describe('LocationFinder', function() {
  beforeEach(function(){
    this.boxer = require('@workshare/boxer')({root: path.resolve('lib')});
    this.boxer.bind('locationFinder').to(require('../../lib/locationFinder'));

    this.getGeoDataSync = sinon.spy();

    this.doSetup = function() {
      this.geolite = {
        init: () => {},
        getGeoDataSync: this.getGeoDataSync
      };
      this.boxer.bind('geolite').to(() => this.geolite);
      this.locationFinder = this.boxer.fetch('locationFinder');
    };
  });

  describe('lookup', function(ip) {
    it('queries the country information for each ip received', function() {
      this.doSetup();
      this.locationFinder.lookup(['24.24.24.24', '99.99.99.99']);

      expect(this.getGeoDataSync).to.have.been.calledWith('24.24.24.24');
      expect(this.getGeoDataSync).to.have.been.calledWith('99.99.99.99');
    });

// Lets reconsider it next time
    it.only('serializes the countries data', function() {
      var geoliteJapan = {country: { iso_code: 'JP', names: {en: 'Japan'}}}
      var geoliteUsa = {country: { iso_code: 'US', names: {en: 'USA'}}};

      this.getGeoDataSync = sinon.stub();
      this.getGeoDataSync.withArgs('24.24.24.24').returns(geoliteJapan);
      this.getGeoDataSync.withArgs('99.99.99.99').returns(geoliteUsa);

      this.doSetup();

      var serialize = sinon.spy(this.locationFinder, 'serialize');

      this.locationFinder.lookup(['24.24.24.24', '99.99.99.99']);

      expect(this.serialize).to.have.been.calledWith(geoliteJapan);
      expect(serialize).to.have.been.calledWith(geoliteUsa);

      this.geoliteGetData.restore();
      serialize.restore();
    });

    it('returns fixed error when geolite trows an exception', function(){
      var geoliteGetData = sinon.stub(geolite, 'getGeoDataSync', function() {
        throw('Error');
      });

      var result = locationFinder.lookup(['wrongip']);

      expect(result[0].host).to.be.equal('wrongip');
      expect(result[0].error).to.be.equal('Unknown host: wrongip');
    });
  });

  describe('serialize', function() {

    it('assigns the country name', function(){
      var result = locationFinder.serialize(geoliteJapan, '24.24.24.24');
      expect(result.country.name).to.be.equal('Japan');
    });

    it('assigns the country iso_code', function(){
      var result = locationFinder.serialize(geoliteJapan, '24.24.24.24');
      expect(result.country.iso_code).to.be.equal('JP');
    });

    it('assigns the language', function(){
      var result = locationFinder.serialize(geoliteJapan, '24.24.24.24');
      expect(result.country.language).to.be.equal('en');
    });

    it('returns a not found error when the response received is null', function(){
      var result = locationFinder.serialize(null, '24.24.24.24');
      expect(result.host).to.be.equal('24.24.24.24');
      console.log(result);
      expect(result.error).to.be.equal('The address 24.24.24.24 is not in the database.')
    });
  });
});