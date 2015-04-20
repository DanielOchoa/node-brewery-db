'use strict';

var CoreObject = require('core-object');
var Beers      = require('./lib/beers');
var Request    = require('./lib/utils/request');

/**
 * node brewery db lib
 */

module.exports = CoreObject.extend({

  init: function(opts) {

    opts = opts || {};
    if (!opts.apiKey) {
      throw new Error('apiKey property needs to be set.');
    }

    this._apiUrl = 'http://api.brewerydb.com/v2/';
    this._apiKey = opts.apiKey;
    this.args    = opts;

    this.request = new Request({
      url: this_apiUrl,
      apiKey: this._apiKey
    });

  },

  beers: function(path, opts) {
    if (typeof path !== 'string') {
      opts = path;
      path = null;
    }
    return new Beers(this.request, {path: path, opts: opts});
  }
});
