
var CoreObject = require('core-object');

module.exports = CoreObject.extend({

  init: function(request) {
    this.client = request;
  },

  get: function(path, options) {

  }

});
