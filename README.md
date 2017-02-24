# Node BreweryDB wrapper

[![Build Status](https://travis-ci.org/DanielOchoa/node-brewery-db.svg?branch=master)](https://travis-ci.org/DanielOchoa/node-brewery-db)

This is a node package (WIP) wrapper for the [http://www.brewerydb.com/](BreweryDB) service
API. It supports both callbacks and promises. See below for usage.

## Setup

Install the library.

```
npm instal https://github.com/DanielOchoa/node-brewery-db
```

Import the library.

```javascript
var BreweryDb = require('node-brewerydb');
```

Create a new instance by passing an object with the `apiKey`.

```javascript
var client = new BreweryDb({apiKey: yourApiKey});
```

## How to use

You can access the restful resources from BreweryDB as follows:

### For Beers

For the beers endpoint, just call the `beers` method and pass in any extra
parameters from the [BreweryDB docs](http://www.brewerydb.com/developers/docs-endpoint/beer_index).
For example, to get a beer by name:

```javascript
client.beers({name: 'Tecate'}, function(err, res) {
  if (err) {
    // handle errors
  }
  console.log(res);
});
```

Or with promises:

```javascript
return client.beers({name: 'Tecate'}).then(function(res) {
  console.log(res);
}, function(err) {
  // in case an error happens.
});
```

To get a single beer, you need to pass the beer id as follows:

```javascript
client.beer('IPhAuu', function(err, res) {
  console.log(res);
});
```

You can also get nested resources for any given resource that allows it, see
the [BreweryDB docs](http://www.brewerydb.com/developers/docs-endpoint/beer_brewery).
For example, beers take a nested resource:

```javascript
client.beer('IPhAuu', 'breweries', function(err, res) {
  // here are the breweries for this particular beer.
  console.log(res);
});
```

You can also access any other nested resource for a beer, such as adjunt, event
and fermentable.

## TODO

So far we can access beer/beers, nested resources for beer, styles and
brewery/breweries. Work needs to be done to access other resources.

 - On settings, let implementor choose Promise lib (RSVP, Bluebird, etc.)
 - Extract private methods in index.js to it's own helper file.
 - Finish endpoints.
 - More testing.

## Developing

 - Clone package.
 - `cd` into the directory.
 - Make sure you have at least v 10.x of node.
 - `npm install`
 - `npm install -g gulp`
 - `npm run test` to run the tests.
 - `gulp` for running tests and to watch for changes in files to re-run tests.

The library uses Sepia and tape to record requests and play them back so as to
not depend on actual http requests when running tests. This can sometimes be a
little difficult to debug.

**NOTE:** You need to use a real api key to record a request for the first time.
