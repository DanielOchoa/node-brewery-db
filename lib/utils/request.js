'use strict';

var request    = require('then-request');
var RSVP       = require('rsvp');

function Request(options) {
  if (!options.url || !options.apiKey) {
    throw new Error('No url or api key were passed.');
  }
  this.baseUrl = options.url;
  this.apiKey  = options.apiKey;
}

Request.prototype.get = function(path, params) {
  if (params) {
    params = {qs: params};
  }
  return request('GET', this.url(path), params);
};

// untested //
Request.prototype.post = function(path, params) {
  if (params) {
    params = {json: params};
  }
  return request('POST', this.url(path), params);
};

Request.prototype.put = function(path, params) {
  if (params) {
    params = {json: params};
  }
  return request('PUT', this.url(path), params);
};

Request.prototype.delete = function(path, params) {
  if (params) {
    params = {json: params};
  }
  return request('DELETE', this.url(path), params);
};

Request.prototype.url = function(path, id) {
  return this.baseUrl + path + '?key=' + this.apiKey;
};

module.exports = Request;
