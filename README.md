# krash
fluent assert for validation of invariants before assignment.

[![NPM](https://nodei.co/npm/krash.png?compact=true)](https://nodei.co/npm/krash/)
[![build status](https://secure.travis-ci.org/bzb-stcnx/krash.png)](http://travis-ci.org/bzb-stcnx/krash)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# motivation
bare-bones inline assertion of invariants when assigning a value to a variable (detailed [example](#usage) below)
```javascript
var delicate = krash.unless(suspect, isDefined, 'suspect not defined')
```
particularly helpful together with your favorite library of predicates such as 
[lodash/Lang](https://www.npmjs.com/package/lodash),
[predicate](https://www.npmjs.com/package/predicate),
[predicates](https://www.npmjs.com/package/predicates), ...

note that it's easy to use a shorter alias for `krash.unless`, for example:
```javascript
var assert = require('krash').unless
...
var delicate = assert(suspect, isDefined, 'suspect not defined')
...
```

`krash` also comes with a helper for throwing,
that helps with formating the error message: `krash.now(...message)`

# usage
## example
```javascript
var krash = require('krash')

function fun (suspect) {
  // assert the invariants:
  // assign suspect to delicate if defined, otherwise throw 'suspect not defined'
  var delicate = krash.unless(suspect, isDefined, 'suspect not defined')
}

// example of predicate that returns a boolean
function isDefined (val) {
  return (typeof val !== 'undefined') && (val !== null)
}

fun(undefined) // throw 'suspect not defined'
```

## signatures
**krash.unless(val: `any`, predicate: `function`, ...message: `string[]`)**
* **val** `any` the value to check against the predicate and return if valid
* **predicate** `function` given `val`, returns a `boolean`
* **...message** `string[]` the remaining arguments are assembled by `util#format`
to generate the error message
* **return** `any` `val` if `predicate(val)` is `true`
* **throw** `...message` if `predicate(val)` is `false`

**krash.now(...message: `string[]`)**
* **...message** `string[]` the arguments are assembled by `util#format`
to generate the error message
* **throw** `...message`


# status
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

# license
(C) Copyright 2015, bzb-stcnx,
[MIT](./LICENSE)
