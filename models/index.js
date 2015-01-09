var request = require('nets')
var debug = require('debug')('dathub-api-client')

function Model(defaults) {
  this.defaults = defaults
}

Model.prototype.request = function(options, callback) {
  if (this.defaults.uri) {
    // direct to custom domain location
    options.uri = this.defaults.uri + options.uri
  }
  debug('requesting', options)
  request(options, function (err, resp, json) {
    if (err) {
      debug('error', err)
      return callback(err)
    }
    if (json && json.status == 'error') {
      debug('error in request:', json)
      return callback(new Error(json.message || json.error))
    } else {
      return callback(err, resp, json)
    }
  })
}

module.exports = Model
