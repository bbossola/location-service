module.exports = function(boxer) {
    boxer.bind('LocationAPI', require('./LocationAPI'));
    boxer.bind('HealthCheckAPI', require('./admin/HealthCheckAPI'));
    boxer.bind('VersionAPI', require('./admin/VersionAPI'));

    boxer.bind('LocationAPI', require('./LocationAPI'));
    boxer.autobind('admin').as('.');
};
