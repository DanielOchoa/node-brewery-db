'use strict';

var request    = require('then-request');
var RSVP       = require('rsvp');

module.exports = Request;

function Request(options) {
  if (!options.url || !options.apiKey) {
    throw new Error('No url or api key were passed.');
  }
  this.baseUrl = options.url;
  this.apiKey  = options.apiKey;
}

Request.prototype.get = function(resource, id, params) {
  if (typeof(id) !== 'string') {
    params = id;
    id = null
  }
  var url = this.url(resource, id);
  if (params) {
    params = {qs: params};
  }
  return request('GET', url, params);
};

Request.prototype.post = function(resource, id) {

}

Request.prototype.url = function(resource, id) {
  resource = resource ? resource : '';
  id       = id ? '/' + id : '';
  return this.baseUrl + resource + id + '?key=' + this.apiKey;
}
