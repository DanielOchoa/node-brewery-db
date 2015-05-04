'use strict';

var request = require('superagent');

module.exports = Request;

function Request(options) {
  if (!options.url || !options.apiKey) {
    throw new Error('No url or api key were passed.');
  }
  this._baseUrl = options.url;
  this._apiKey  = options.apiKey;
  this.url      = this._baseUrl + '?key=' + this._apiKey;
}

Request.prototype.get = function(path) {

};
