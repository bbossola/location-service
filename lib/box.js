module.exports = function(boxer) {
    boxer.autobind('api');
    boxer.bind('finder', require('LocationFinder'));
    boxer.bind('service', require('Service'));
};

