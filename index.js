'use strict';

var Beers      = require('./lib/beers');
var Request    = require('./lib/utils/request');

var BREWERY_DB_URL = 'http://api.brewerydb.com/v2/';
module.exports = BreweryDb;

/**
 * node brewery db lib
 */

function BreweryDb(options) {
  options       = options || {};
  this._options = options;
  this._apiKey  = options.apiKey || process.env.breweryDbApiKey;

  if (!this._apiKey) {
    throw new Error('apiKey property needs to be set.');
  }

  this.request = new Request({
    url: BREWERY_DB_URL,
    apiKey: this._apiKey
  });
}

/**
 *
 * Should be:
 * var brew = new BreweryDb({apiKey:'sdfsdf'});
 * brew.beers.get({opts}); // opts is the params
 * or
 * brew.beers.get('beerId');
 *
 */
BreweryDb.prototype.beers = function() {
  this._beers = this._beers || new Beers(this.request);
  return this._beers;
};
