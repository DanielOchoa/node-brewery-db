'use strict';

var test      = require('tape');
var BreweryDb = require('../index');

var key = {apiKey: 'fakeKey'};

test('BreweryDb', function(t) {
  t.plan(3);

  t.throws(function() {
    new BreweryDb();
  }, /apiKey property needs to be set/,
  'apiKey key/value in parameter object');

  t.ok(new BreweryDb(key), 'can be instantiated.');

  t.test('beer', function(tn) {
    tn.plan(1);

    var client = new BreweryDb(key);

    return client.beers({name: 'Corona'}).then(function(res) {
      tn.ok(res);
    }).catch(function(err) {
      tn.fail('Should not catch');
    });
  });

});
