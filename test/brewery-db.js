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

test('can get a beer by name as a callback', function(t) {
  t.plan(1);

  client.beers({name: 'Tecate'}, function(err, res) {
    if (err) {
      t.fail(err);
    }
    t.isEqual(res.data[0].name, 'Tecate');
  });
});

/**
 * triggering errors
 */
test('will trigger the err callback if it should', function(t) {
  t.plan(4);

  client.beers({wrongParamForBeer: 'yup. this is wrong'}, function(err, res) {
    t.ok(err, 'We got an error');
    t.isEqual(err.status, 'failure');
    t.isEqual(err.errorMessage, 'The data passed to this method was invalid');
    t.isEqual(res, null);
  });
});

test('will trigger err if it should', function(t) {
  t.plan(2);

  return client.beers({wrongParamForBeer: 'yup...'}).then(t.fail).catch(function(err) {
    t.ok(err);
    t.isEqual(err.errorMessage, 'The data passed to this method was invalid');
  });
});

test('will trigger error for invalid nested resource for beers as promise', function(t) {
  t.plan(2);

  return client.beer('IPhAuu', 'eventzz').then(t.fail).catch(function(err) {
    console.log(err);
    t.ok(err);
    t.isEqual(err.errorMessage, 'The endpoint you requested could not be found');
  });
});

test('will trigger error for invalid nested resource as callback', function(t) {
  t.plan(3);

  client.beer('IPhAuu', 'eventzz', function(err, res) {
    t.ok(err);
    t.isEqual(err.errorMessage, 'The endpoint you requested could not be found');
    t.isEqual(res, null);
  });
});

/*
 *
 */

test('can get a beer by ids', function(t) {
  t.plan(3);

  return client.beers({ids:'ujPz4L,IPhAuu'}).then(function(res) {
    t.isEqual(res.data.length, 2);
    t.isEqual(res.data[0].name, 'Corona Extra');
    t.isEqual(res.data[1].name, 'Tecate');
  }).catch(t.fail);
});

test('can get page two of beers with abv between 5.3 and 5', function(t) {
  t.plan(3);

  return client.beers({abv: '4.3,5', p: 2}).then(function(res) {
    t.isEqual(res.currentPage, 2);
    t.isEqual(res.numberOfPages, 92);
    t.isEqual(res.data[0].name, '5th Anniversary');
  });
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

test('can get ingredients for beer', function(t) {
  t.plan(1);

  return client.beer('ujPz4L', 'ingredients').then(function(res) {
    t.isEqual(res.message, 'Request Successful');
  });
});

/**
 *
 * Styles
 *
 */
test('can get list of styles as promise', function(t) {
  t.plan(1);

  return client.styles().then(function(res) {
    t.isEqual(res.data[0].name, 'Classic English-Style Pale Ale');
  }).catch(t.fail);
});

test('can get a list of styles with callback', function(t) {
  t.plan(2);

  client.styles(function(err, res) {
    t.isEqual(err, null);
    t.isEqual(res.data[0].name, 'Classic English-Style Pale Ale');
  });
});

test('can get individual style by id', function(t) {
  t.plan(1);

  return client.style('160').then(function(res) {
    t.isEqual(res.data.id, 160);
  }).catch(t.fail);
});

/**
 *
 * Brewery
 *
 */
test('can get breweries for name Saint Arnold as promise', function(t) {
  t.plan(1);

  return client.breweries({name: 'Saint Arnold Brewing Company'}).then(function(res) {
    t.isEqual(res.data[0].id, 'H3UW27');
  }).catch(t.fail);
});

test('can get breweries for name Saint Arnold with callback', function(t) {
  t.plan(1);

  client.breweries({name: 'Saint Arnold Brewing Company'}, function(err, res) {
    if (err) {
      t.fail(err);
    }
    t.isEqual(res.data[0].id, 'H3UW27');
  });
})

test('can fetch beers for brewery as promised', function(t) {
  t.plan(2);

  return client.brewery('H3UW27', 'beers').then(function(res) {
    t.isEqual(res.message, 'Request Successful');
    var beerName = _.result(_.find(res.data, 'id', 'jPbb33'), 'name');
    t.isEqual(beerName, 'Saint Arnold Fancy Lawnmower');
  }).catch(t.fail);
});

/**
 *
 * Adjuncts
 *
 */
test('can fetch adjuncts as promised', function(t) {
  t.plan(1);

  return client.adjuncts().then(function(res) {
    t.isEqual(res.data[0].name, 'Acid Blend');
  }).catch(t.fail);
});

test('can fetch adjuncts as callback', function(t) {
  t.plan(1);

  return client.adjuncts(function(err, res) {
    if (err) {
      t.fail(err);
    }
    t.isEqual(res.totalResults, 684);
  });
});

test('can fetch adjuncts with params', function(t) {
  t.plan(1);

  return client.adjuncts({p: 2}).then(function(res) {
    t.isEqual(res.currentPage, 2);
  }).catch(t.fail);
});

test('can fetch adjunct by id as promise', function(t) {
  t.plan(1);

  return client.adjunct(877).then(function(res) {
    t.isEqual(res.data.name, 'Agardhs Red Weed Gel');
  }).catch(t.fail);
});

test('can fetch adjunct by id as callback with param', function(t) {
  t.plan(1);

  client.adjunct(876, function(err, res) {
    if (err) {
      t.fail(err);
    }
    t.isEqual(res.data.name, 'Acid Blend');
  });
});
