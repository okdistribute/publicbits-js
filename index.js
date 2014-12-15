var Metadats = require('./metadats.js')
var Users = require('./users.js')

function registry(defaults) {
  return {
    metadats: new Metadats(defaults),
    users: new Users(defaults),
    defaults: function(options) {
      return registry(options)
    }
  }
}

module.exports = registry({
  uri: 'http://dathub.org/api'
})
