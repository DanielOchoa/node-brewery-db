'use strict';

var test      = require('tape');
var BreweryDb = require('../index');
var helpers   = require('./helpers');
var _         = require('lodash');

/**
 *
 * Test setup
 *
 */
helpers.sepia.filterApiKey();

var client = new BreweryDb({apiKey: helpers.apiKey});

/**
 *
 * Tests
 *
 */

test('BreweryDb can be instanciated', function(t) {
  t.plan(3);

  t.throws(function() {
    new BreweryDb();
  }, /apiKey property needs to be set/, 'apiKey key/value in parameter object');

  var breweryDb = new BreweryDb({apiKey: helpers.apiKey});
  t.ok(breweryDb, 'can be instantiated.');
  t.ok(breweryDb._apiKey, 'key is set');
});

test('can get a beer by name', function(t) {
  t.plan(3);

  return client.beers({name: 'Tecate'}).then(function(res) {
    t.ok(_.isObject(res));
    var data = res.data[0];
    t.isEqual(data.name, 'Tecate');
    t.isEqual(data.id, 'IPhAuu');
  }).catch(t.fail);
});

test('can get a beer by ids', function(t) {
  t.plan(3);

  return client.beers({ids:'ujPz4L,IPhAuu'}).then(function(res) {
    t.isEqual(res.data.length, 2);
    t.isEqual(res.data[0].name, 'Corona Extra');
    t.isEqual(res.data[1].name, 'Tecate');
  }).catch(t.fail);
});

test('can get single beer from id', function(t) {
  t.plan(2);

  return client.beer('ujPz4L').then(function(res) {
    t.isEqual(res.data.id, 'ujPz4L');
    t.isEqual(res.data.name, 'Corona Extra');
  }).catch(t.fail);
});

test('can get a brewery from a beer', function(t) {
  t.plan(2);

  return client.beer('ujPz4L', 'breweries').then(function(res) {
    t.isEqual(res.data[0].name, 'Grupo Modelo S.A. de C.V.');
    t.isEqual(res.data[0].id, 'wadu38');
  }).catch(t.fail);
});
