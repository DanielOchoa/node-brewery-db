# Node BreweryDB wrapper

[![Build Status](https://travis-ci.org/DanielOchoa/node-brewery-db.svg?branch=master)](https://travis-ci.org/DanielOchoa/node-brewery-db)

This is a node package (WIP) wrapper for the [http://www.brewerydb.com/](BreweryDB) service
API.

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
parameters from the BreweryDB docs. For example, to get a beer by name:

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

You can also get nested resources for any given resource that allows it. (See
BreweryDB docs), for example, beers take a nested resource:

```javascript
client.beer('IPhAuu', 'breweries', function(err, res) {
  // here are the breweries for this particular beer.
  console.log(res);
});
```

## TODO

So far we can access beer/beers, nested resources for beer, styles,
brewery/breweries. Work needs to be done to access other resources.
