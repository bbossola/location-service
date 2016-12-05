/* global describe, it, expect, sinon */

'use strict';

var LocationFinder = require('../../app/LocationFinder');
var geolite = require('node-geolite2');


describe('LocationFinder', function() {
  var locationFinder = new LocationFinder();
  var geoliteJapan = {country: { iso_code: 'JP', names: {en: 'Japan'}}};
  var geoliteUsa = {country: { iso_code: 'US', names: {en: 'USA'}}};

  describe('lookup', function() {

    it('queries the country information for each ip received', function() {

      var geoliteGetData = sinon.spy(geolite, 'getGeoDataSync');

      locationFinder.lookup(['24.24.24.24', '99.99.99.99']);

      expect(geoliteGetData).to.have.been.calledWith('24.24.24.24');
      expect(geoliteGetData).to.have.been.calledWith('99.99.99.99');

      geoliteGetData.restore();
    });

    it('serializes the countries data', function() {

      var serialize = sinon.spy(locationFinder, 'serialize');
      var geoliteGetData = sinon.stub(geolite, 'getGeoDataSync');

      geoliteGetData.withArgs('24.24.24.24').returns(geoliteJapan);
      geoliteGetData.withArgs('99.99.99.99').returns(geoliteUsa);

      locationFinder.lookup(['24.24.24.24', '99.99.99.99']);

      expect(serialize).to.have.been.calledWith(geoliteJapan);
      expect(serialize).to.have.been.calledWith(geoliteUsa);

      geoliteGetData.restore();
      serialize.restore();
    });

    it('serializes the countries data', function() {

      var serialize = sinon.spy(locationFinder, 'serialize');
      var geoliteGetData = sinon.stub(geolite, 'getGeoDataSync');

      geoliteGetData.withArgs('24.24.24.24').returns(geoliteJapan);
      geoliteGetData.withArgs('99.99.99.99').returns(geoliteUsa);

      locationFinder.lookup(['24.24.24.24', '99.99.99.99']);

      expect(serialize).to.have.been.calledWith(geoliteJapan);
      expect(serialize).to.have.been.calledWith(geoliteUsa);

      geoliteGetData.restore();
      serialize.restore();
    });

    it('returns fixed error when geolite trows an exception', function(){
      sinon.stub(geolite, 'getGeoDataSync', function() {
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
      expect(result.error).to.be.equal('The address 24.24.24.24 is not in the database.');
    });
  });
});
