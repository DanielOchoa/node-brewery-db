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
  t.plan(1);

  var client = new BreweryDb({apiKey: helpers.apiKey});

  return client.beers({name: 'Tecate'}).then(function(res) {
    t.ok(_.isString(res.getBody('utf-8')), 'body is an object');
  }).catch(t.fail);
});


