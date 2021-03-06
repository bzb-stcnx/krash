/* (c) Copyright 2015, bzb-stcnx
 * all rights reserved
 * SEE LICENSE IN ./LICENSE
 */

module.exports = {
  unless: failfast,
  now: crash
}

var util = require('util')
var ERROR = require('./lib/errors.js')
var slice = Array.prototype.slice

/**
 * @description validate the given value with a predicate and return that value
 * if the predicate evaluates to true or log a fatal error message to the console
 * and exit the process with a return value of 1
 * @param {any} val
 * @param {function} predicate
 * @param {string[]} ...message optional
 * @return {any} val if predicate(val) is truthy
 * otherwise logs the warning message with its additional optional args
 * to the console and exits the process with a return value of 1
 */
function failfast (val, predicate /* , ...message */) {
  if (predicate(val)) return val
  crash.apply(this, slice.call(arguments, 2)) // slow on V8, but we're crashing anyway!
}

/**
 * @description log a fatal error message to the console
 * and exit the process with a return value of 1
 * @param {string[]} ...message optional, default = 'undocumented error'
 */
function crash (/* ...message */) {
  var message
  if (!arguments.length) message = [ ERROR.UNDOCUMENTED ]
  else message = [].concat(slice.apply(arguments)) // slow on V8, but...
  throw new Error(util.format.apply(util, message))
}
