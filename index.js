'use strict';

var CoreObject = require('core-object');
var Beers      = require('./lib/beers');
var Request    = require('./lib/utils/request');

var BREWERY_DB_URL = 'http://api.brewerydb.com/v2/';
/**
 * node brewery db lib
 */

module.exports = CoreObject.extend({

  init: function(options) {

    options = options || {};
    if (!options.apiKey) {
      throw new Error('apiKey property needs to be set.');
    }

    this.apiUrl  = BREWERY_DB_URL;
    this.apiKey  = options.apiKey;
    this.options = options;

    this.request = new Request({
      url: this._apiUrl,
      apiKey: this._apiKey
    });

  },

  beers: function(path, opts) {

    if (typeof path !== 'string') {
      opts = path;
      path = null;
    }

    this._beers = this._beers || new Beers(this.request);
    return this._beers.get({path: path, options: opts});
  }

});
