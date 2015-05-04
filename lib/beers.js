'use strict';

module.exports = Beers;

function Beers(request) {
  this.client = request;
}

Beers.prototype.get = function(path, options) {
  // if path is no string, but object, then we want base path.
  if (typeof path === 'object') {
    options = path;
    path = null;
  }

};
