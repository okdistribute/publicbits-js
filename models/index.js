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
  console.log('requesting', options)
  request(options, function (err, resp, json) {
    if (json && json.status == 'error') {
      console.error('error in request:', json)
      return callback(new Error(json.message || json.error), resp, json)
    } else if (err) {
      console.error('error', err)
      return callback(err, resp, json)
    } else {
      return callback(err, resp, json)
    }
  })
}

module.exports = Model
