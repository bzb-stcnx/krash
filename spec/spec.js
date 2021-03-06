'use strict'
/* (c) Copyright 2015, bzb-stcnx
 * all rights reserved
 * SEE LICENSE IN ../LICENSE
 */

/* eslint-env jasmine */

describe('krash', function () {
  var krash
  var format
  var ERROR, MESSAGE, ARG, EXPECT_THROW

  beforeEach(function () {
    krash = require('../')
    format = require('util').format
    ERROR = require('../lib/errors.js')
    MESSAGE = 'krash %s'
    ARG = 'now!'
    EXPECT_THROW = format(MESSAGE, ARG)
  })

  it('is an object', function () {
    expect(typeof krash).toBe('object')
    expect(Array.isArray(krash)).toBe(false)
  })

  describe('#now:', function () {
    var doDocumentedKrashNow

    beforeEach(function () {
      doDocumentedKrashNow = function () { krash.now(MESSAGE, ARG) }
    })

    it('is a function', function () {
      expect(typeof krash.now).toBe('function')
    })

    it('throws a default error message when called with no arguments', function () {
      expect(krash.now).toThrowError(ERROR.UNDOCUMENTED)
    })

    it('throws an error message assembled with "util#format" from the given arguments', function () {
      expect(doDocumentedKrashNow).toThrowError(EXPECT_THROW)
    })
  })

  describe('#unless:', function () {
    var VAL
    var falsePredicate, truePredicate

    beforeEach(function () {
      VAL = { 'made': 'it!' }
      falsePredicate = function () { return false }
      truePredicate = function () { return true }
    })

    it('is a function', function () {
      expect(typeof krash.unless).toBe('function')
    })

    describe('given (val: any, predicate: function),', function () {
      var doUndocumentedKrashUnlessTrue
      var doUndocumentedKrashUnlessFalse

      beforeEach(function () {
        doUndocumentedKrashUnlessTrue = function () {
          return krash.unless(VAL, truePredicate)
        }
        doUndocumentedKrashUnlessFalse = function () {
          return krash.unless(VAL, falsePredicate)
        }
      })

      it('returns "val" if "predicate(val)" is true', function () {
        expect(doUndocumentedKrashUnlessTrue()).toBe(VAL)
      })

      it('throws a default message if "predicate(val)" is false', function () {
        expect(doUndocumentedKrashUnlessFalse).toThrowError(ERROR.UNDOCUMENTED)
      })
    })

    describe('given (val: any, predicate: function, ...message: string[]),', function () {
      var doDocumentedKrashUnlessFalse

      beforeEach(function () {
        doDocumentedKrashUnlessFalse = function () {
          return krash.unless(VAL, falsePredicate, MESSAGE, ARG)
        }
      })

      it('throws an error message assembled with "util#format" ' +
        'from the given arguments if "predicate(val)" is false',
        function () {
          expect(doDocumentedKrashUnlessFalse).toThrowError(EXPECT_THROW)
        })
    })
  })
})
