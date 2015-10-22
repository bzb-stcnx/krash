# krash
fluent assert for validation of invariants before assignment.

[![NPM](https://nodei.co/npm/krash.png?compact=true)](https://nodei.co/npm/krash/)

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![build status](https://secure.travis-ci.org/bzb-stcnx/yalookup.png)](http://travis-ci.org/bzb-stcnx/yalookup)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# motivation
bare-bones inline assertion of invariants when assigning a value to a variable ([example](#usage))

# usage
## example
```javascript
var krash = require('krash')

function fun (suspect) {
  // assign suspect to delicate if defined, otherwise throw 'suspect not defined'
  var delicate = krash.unless(suspect, isDefined, 'suspect not defined')
}

// example of predicate that returns a boolean
function isDefined (val) {
  return (typeof val !== 'undefined') && (val !== null)
}

fun(undefined) // throw 'suspect not defined'
```

## signature
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
stable

# license
(C) Copyright 2015, bzb-stcnx,
[MIT](./LICENSE)
