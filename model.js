var request = require('request')

function Model(defaults) {
  this.defaults = defaults
}

Model.prototype.request = function(options, callback) {
  console.log('requesting', options)
  if (this.defaults.uri) {
    // direct to custom domain location
    options.uri = this.defaults.uri + options.uri
  }
  request(options, function (err, resp, json) {
    if (err) {
      console.error(err)
      return callback(err)
    }
    if (json && json.status == 'error') {
      console.error(json.message)
      return callback(new Error(json.message))
    }
    else {
      console.log('response', err, resp, json)
      return callback(err, resp, json)
    }
  })
}

module.exports = Model