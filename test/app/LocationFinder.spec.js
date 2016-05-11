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

    this.geoliteJapan = {country: { iso_code: 'JP', names: {en: 'Japan'}}}
    this.geoliteUsa = {country: { iso_code: 'US', names: {en: 'USA'}}};
  });



  describe('lookup', function(ip) {
    it('queries the country information for each ip received', function() {
      this.doSetup();
      this.locationFinder.lookup(['24.24.24.24', '99.99.99.99']);

      expect(this.getGeoDataSync).to.have.been.calledWith('24.24.24.24');
      expect(this.getGeoDataSync).to.have.been.calledWith('99.99.99.99');
    });

    it('serializes the countries data', function() {
      this.getGeoDataSync = sinon.stub();
      this.getGeoDataSync.withArgs('24.24.24.24').returns(this.geoliteJapan);
      this.getGeoDataSync.withArgs('99.99.99.99').returns(this.geoliteUsa);

      this.doSetup();

      expect(
        this.locationFinder.lookup(['24.24.24.24', '99.99.99.99'])
      ).to.be.eql([
        {
          "country": {
            "iso_code": "JP",
            "language": "en",
            "name": "Japan",
          },
          "host": "24.24.24.24"
        },
        {
          "country": {
            "iso_code": "US",
            "language": "en",
            "name": "USA",
          },
          "host": "99.99.99.99"
        }
      ]);
    });

    it('returns fixed error when geolite trows an exception', function(){
      this.getGeoDataSync = function() {
        throw('Error');
      };

      this.doSetup();

      var result = this.locationFinder.lookup(['wrongip']);

      expect(result[0].host).to.be.equal('wrongip');
      expect(result[0].error).to.be.equal('Unknown host: wrongip');
    });
  });

  describe('serialize', function() {
    beforeEach(function(){ this.doSetup() });

    it('assigns the country name', function(){
      var result = this.locationFinder.serialize(this.geoliteJapan, '24.24.24.24');
      expect(result.country.name).to.be.equal('Japan');
    });

    it('assigns the country iso_code', function(){
      var result = this.locationFinder.serialize(this.geoliteJapan, '24.24.24.24');
      expect(result.country.iso_code).to.be.equal('JP');
    });

    it('assigns the language', function(){
      var result = this.locationFinder.serialize(this.geoliteJapan, '24.24.24.24');
      expect(result.country.language).to.be.equal('en');
    });

    it('returns a not found error when the response received is null', function(){
      var result = this.locationFinder.serialize(null, '24.24.24.24');
      expect(result.host).to.be.equal('24.24.24.24');
      expect(result.error).to.be.equal('The address 24.24.24.24 is not in the database.')
    });
  });
});