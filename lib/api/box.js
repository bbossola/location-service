module.exports = function(boxer) {
  boxer.autobind('admin');

  boxer.bind('logger').to(() => console);
};
