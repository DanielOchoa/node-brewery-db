'use strict';

var request    = require('request');
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
  return new RSVP.Promise(function(resolve, reject) {
    request.get({
      url: url,
      qs: params
    }, handleRequestFactory(resolve, reject));
  });
};

Request.prototype.post = function(resource, id) {

}

Request.prototype.url = function(resource, id) {
  resource = resource ? resource : '';
  id       = id ? '/' + id : '';
  return this.baseUrl + resource + id + '?key=' + this.apiKey;
}

function handleRequestFactory(resolve, reject) {
  return function handleRequest(error, response, body) {
     if (!error && response.statusCode == 200) {
      resolve(response);
    } else {
      reject({error: error, response: response, body: body});
    }
  }
}
