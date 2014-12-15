var request;

function Model(defaults) {
  if (defaults.xhr) request = require('xhr')
  else request = require('request')
  this.defaults = defaults
}

Model.prototype.request = function(options, callback) {
  if (this.defaults.uri) {
    // direct to custom domain location
    options.uri = this.defaults.uri + options.uri
  }
  console.log('requesting', options)
  request(options, function (err, resp, json) {
    if (err) {
      console.error(err)
      return callback(err)
    }
    if (json && json.status == 'error') {
      console.error('error in request: ', json.message)
      return callback(new Error(json.message))
    }
    else {
      return callback(err, resp, json)
    }
  })
}

module.exports = Model