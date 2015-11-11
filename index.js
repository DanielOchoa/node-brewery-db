'use strict';

var Request = require('./lib/utils/request');
var RSVP = require('rsvp');

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

module.exports = BreweryDb;

/**
 *
 * Beers
 *
 */
BreweryDb.prototype.beers = function(params, callback) {
  return requestPromiseChain(this.request.get('beers', params), callback);
};

BreweryDb.prototype.beer = function(id, extras, callback) {
  var extra = extras ? '/' + extras : '';
  return requestPromiseChain(this.request.get('beer/' + id + extra), callback);
}

/**
 *
 * Styles
 *
 */

BreweryDb.prototype.styles = function(params, callback) {
  return buildResourceFor.call(this, 'styles', params, callback);
}

BreweryDb.prototype.style = function(id, params, callback) {
  return requestPromiseChain(this.request.get('style/' + id, params), callback);
}

/**
 *
 * Brewery
 *
 */
BreweryDb.prototype.breweries = function(params, callback) {
  return buildResourceFor.call(this, 'breweries', params, callback);
}

BreweryDb.prototype.brewery = function(id, extras, callback) {
  var extra = extras ? '/' + extras : '';
  return requestPromiseChain(this.request.get('brewery/' + id + extra), callback);
}

/**
 *
 * Adjuncts
 *
 */
BreweryDb.prototype.adjuncts = function(params, callback) {
  return buildResourceFor.call(this, 'adjuncts', params, callback);
}

BreweryDb.prototype.adjunct = function(id, callback) {
  return requestPromiseChain(this.request.get('adjunct/' + id), callback);
}

/**
 *
 * Private
 *
 */
function buildResourceFor(verb, params, callback) {
   if (typeof(params) === 'function') {
    callback = params;
    params = null;
  }
  return requestPromiseChain(this.request.get(verb, params), callback);
}

function requestPromiseChain(reqPromise, callback) {
  return reqPromise.then(parseBody)
    .then(handleCallbackOrPromise(callback))
    .catch(handleCallbackError(callback));
}

function parseBody(res) {
  return JSON.parse(res.getBody('utf-8'));
}

function handleCallbackOrPromise(callback) {
  return function handleCallbackOrPromise(res) {
    if (callback) {
      return callback(null, res);
    }
    return res;
  }
}

// TODO: add option to get header, status code, etc from raw response.
function handleCallbackError(callback) {
  return function handleCallbackError(res) {
    var parsedError;
    try {
      parsedError = JSON.parse(res.body.toString('utf-8'));
    } catch(e) {
      parsedError = e;
    }
    if (callback) {
      return callback(parsedError, null);
    }
    return RSVP.reject(parsedError);
  }
}
