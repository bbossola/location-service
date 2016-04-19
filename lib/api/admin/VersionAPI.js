'use strict';

module.exports = function(fetch) {
    var versionFile = fetch('versionFile');
    var fs = require('fs');

    return function(req, res, next) {
        var content = fs.readFileSync(versionFile, 'utf8');
        res.type('text/plain').send(content);
    };
}
