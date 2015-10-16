var util = require('util')
var Model = require('./')

function Users (defaults) {
  Model.call(this, defaults)
}
util.inherits(Users, Model)

Users.prototype.currentUser = function (cb) {
  var options = {
    uri: '/auth/currentuser',
    method: 'GET',
    json: true
  }

  this.request(options, function (err, resp, json) {
    cb(err, resp, json.user)
  })
}

Users.prototype.get = function (handle, cb) {
  var options = {
    uri: '/api/users/' + handle,
    method: 'GET',
    json: true
  }
  this.request(options, function (err, resp, json) {
    return cb(err, resp, json)
  })
}

Users.prototype.update = function (user, cb) {
  var options = {
    uri: '/api/users/' + user.handle,
    method: 'PUT',
    json: user
  }
  this.request(options, function (err, resp, json) {
    return cb(err, resp)
  })
}

module.exports = Users
