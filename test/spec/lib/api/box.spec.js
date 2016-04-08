const boxer = require('boxer');
const box = require('../../../lib/api/box');

describe('Boxer', function() {

    it('retek', function() {

        box(boxer);

        expect(boxer.fetch('LocationAPI')).to.be.not.undefined;
    });
});

