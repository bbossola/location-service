'use strict';

module.exports = function(fetch) {
    var versionFile = fetch('versionFile');
    var fs = fetch('fs');
    var content = fs.readFileSync(versionFile, 'utf8');

    return function(req, res, next) {
      res.status(200).type('text/plain').send(content);
    };
}
