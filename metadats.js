var qs = require('querystring')
var util = require('util')

var Model = require('./model')

function Metadats(defaults) {
  Model.call(this, defaults);
}
util.inherits(Metadats, Model)

Metadats.prototype.sanitize = function(metadat) {
  if (metadat.name) {
    metadat.name = metadat.name.trim()
  }
  if (metadat.description) {
    metadat.description = metadat.description.trim()
  }
  return metadat
}

/** Creating a metadat **/
Metadats.prototype.create = function (metadat, cb) {
  var metadat = this.sanitize(metadat)
  if (!metadat.name || !metadat.description || !metadat.url) {
    return cb('Requires a name and description.')
  }

  var options = {
    uri: '/api/metadat',
    method: 'POST',
    json: metadat
  }
  this.request(options, function (err, resp, json) {
    if (err) return cb(err)
    metadat.id = json.id
    return cb(null, metadat)
  })
}

/** Functions to act upon metadats **/
Metadats.prototype.query = function (params, cb) {
  // Parameters
  // params: dict
  //  keys represent the fields to filter upon
  if (!params) {
    return cb(new Error('Give at least one param or use the `all` function.'))
  }
  var options = {
    uri: '/api/metadat?' + qs.stringify(params),
    method: 'GET',
    json: true
  }
  this.request(options, function (err, resp, json) {
    return cb(err, json)
  })
}

Metadats.prototype.all = function (cb) {
  var options = {
    uri: '/api/metadat',
    method: 'GET',
    json: true
  }
  this.request(options, function (err, resp, json) {
    return cb(err, json) //handled later
  })
}

Metadats.prototype.getById = function (metadatId, cb) {
  console.log('getting by id', metadatId)
  var options = {
    uri: '/api/metadat/' + metadatId,
    method: 'GET',
    json: true
  }

  this.request(options, function (err, resp, json) {
    if (err) {
      return cb(new Error('Could not get that dat, are you sure the ID is right?'))
    }
    return cb(null, json)
  })
}

module.exports = Metadats
