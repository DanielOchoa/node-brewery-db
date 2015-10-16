'use strict';

var Request = require('./lib/utils/request');

var BREWERY_DB_URL = 'http://api.brewerydb.com/v2/';

/**
 * node brewery db lib
 */

function BreweryDb(options) {
  options       = options || {};
  this._options = options;
  this._apiKey  = options.apiKey || process.env.breweryDbApiKey;
  this._url     = options.url || BREWERY_DB_URL;
  if (!this._apiKey) {
    throw new Error('apiKey property needs to be set.');
  }

  this.request = new Request({
    url: this._url,
    apiKey: this._apiKey
  });
}

/**
 *
 * Should be:
 * var brew = new BreweryDb({apiKey:'sdfsdf'});
 * brew.beers({name: 'Tecate'}); // opts is the params
 * or
 * brew.beers({id: 'beerId'});
 *
 */
BreweryDb.prototype.beers = function(params) {
  return this.request.get('beers', params).then(function(res) {
    return JSON.parse(res.getBody('utf-8'));
  });
};

module.exports = BreweryDb;
