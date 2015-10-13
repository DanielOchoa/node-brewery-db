

var sepia = require('sepia');

module.exports = {
  sepia: {
    filterApiKey: function() {
      return sepia.filter({
        url: /api.brewerydb.com/,
        urlFilter: function(url) {
          return url.replace(/key=[A-Za-z0-9]+/, '');
        }
      });
    }
  }
};

