var common = require('dat-registry/test/common.js')()
var test = require('tape')

var tests = [
  require('./metadats.js'),
]

tests.map(function(t) {
  t.all(test, common)
})
