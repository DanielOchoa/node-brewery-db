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
  });
});

