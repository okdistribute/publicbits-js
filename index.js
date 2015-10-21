var Metadats = require('./models/metadats.js')
var Users = require('./models/users.js')

function registry (defaults) {
  return {
    metadats: new Metadats(defaults),
    users: new Users(defaults),
    defaults: function (options) {
      return registry(options)
    }
  }
}

module.exports = registry({
  uri: 'http://publicbits.org'
})
