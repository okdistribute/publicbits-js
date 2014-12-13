var common = require('dat-registry/test/common.js')()
var run = require('tape-run');
var browserify = require('browserify');
var path = require('path')

common.getRegistry(function (err, api, done) {
  browserify(path.join(__dirname, 'tests.js'))
    .bundle()
    .pipe(run())
    .pipe(process.stdout)
  done();
})