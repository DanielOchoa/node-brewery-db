'use strict';

var test      = require('tape');
var BreweryDb = require('../index');
var sepia     = require('sepia');
var Request   = require('../lib/utils/request');
var _         = require('lodash');

var key = {apiKey: 'someApiKey'};
var url = 'http://api.brewerydb.com/v2/';

test('BreweryDb', function(t) {
  t.plan(3);

  t.throws(function() {
    new BreweryDb();
  },
  /apiKey property needs to be set/,
  'apiKey key/value in parameter object');

  var breweryDb = new BreweryDb(key);
  t.ok(breweryDb, 'can be instantiated.');
  t.ok(breweryDb._apiKey, 'key is set');

  /*
  t.test('beer', function(t) {
    t.plan(1);

    var client = new BreweryDb(key);

    return client.beers({name: 'Corona'}).then(function(res) {
      t.ok(res);
    }).catch(function(err) {
      t.fail('Should not catch');
    });
  });
  */
});


test('lib - utils - request', function(t) {
  var request = new Request({
    url: url,
    apiKey: key.apiKey
  });

  t.test('get index', function(ta) {
    ta.plan(2);
    return request.get('beers', {name: 'Tecate'}).then(function(res) {
      ta.ok(_.isObject(res), 'response is an object');
      ta.ok(_.isString(res.getBody('utf-8')));
    }).catch(ta.fail);
  });


  t.test('get by id', function(ta) {
    ta.plan(1);
    return request.get('beer', 'IPhAuu').then(function(res) {
      ta.ok(_.isString(res.getBody('utf-8')), 'body is a string');
    }).catch(ta.fail);
  });

});

