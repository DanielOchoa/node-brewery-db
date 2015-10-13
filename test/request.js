'use strict';

var test    = require('tape');
var Request = require('../lib/utils/request');
var helpers = require('./helpers');
var _       = require('lodash');

/**
 *
 * Request
 *
 */

var request;

(function setup() {
  helpers.sepia.filterApiKey();
  request = new Request({
    url: helpers.url,
    apiKey: helpers.apiKey
  });
})();

test('lib/utils/request | get beer', function(t) {
  t.plan(2);
  return request.get('beers', {name: 'Tecate'}).then(function(res) {
    t.ok(_.isObject(res), 'response is an object');
    t.ok(_.isString(res.getBody('utf-8')), 'response body is a string');
  }).catch(t.fail);
});

test('lib/utils/request | get by ID', function(t) {
  t.plan(1);
  return request.get('beer/' + helpers.tecateId).then(function(res) {
    t.ok(_.isString(res.getBody('utf-8')), 'response body is a string');
  }).catch(t.fail);
});

test('lib/utils/request | get nested resource', function(t) {
  t.plan(2);
  return request.get('beer/' + helpers.tecateId + '/breweries').then(function(res) {
    t.ok(_.isObject(res), 'response is an object');
    t.ok(_.isString(res.getBody('utf-8')), 'body is a string');
  }).catch(t.fail);
});

test('lib/utils/request | get a different nested resource', function(t) {
  t.plan(2);
  return request.get('beer/' + helpers.tecateId + '/yeasts').then(function(res) {
    t.ok(_.isObject(res), 'response is an object');
    t.ok(_.isString(res.getBody('utf-8')), 'body is a string');
  }).catch(t.fail);
});
