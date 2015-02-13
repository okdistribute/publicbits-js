var qs = require('querystring')
var extend = require('extend')
var util = require('util')

var Model = require('./')

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

/** Updating **/
Metadats.prototype.update = function (id, metadat, opts, cb) {
 if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  var options = extend({
    uri: '/api/metadat/' + id,
    method: 'PUT',
    json: metadat
  }, opts)

  this.request(options, function (err, resp, json) {
    if (err) return cb(err)
    return cb(null, json)
  })
}

/** Creating a metadat **/
Metadats.prototype.create = function (metadat, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  var metadat = this.sanitize(metadat)
  if (!metadat.name || !metadat.description || !metadat.url) {
    return cb('Requires a name and description.')
  }

  var options = extend({
    uri: '/api/metadat',
    method: 'POST',
    json: metadat
  }, opts)

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

Metadats.prototype.all = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  var options = extend({
    uri: '/api/metadat',
    method: 'GET',
    json: true
  }, opts)
  this.request(options, function (err, resp, json) {
    return cb(err, json) //handled later
  })
}

Metadats.prototype.getById = function (metadatId, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  console.log('getting by id', metadatId)
  var options = extend({
    uri: '/api/metadat/' + metadatId,
    method: 'GET',
    json: true
  }, opts)

  this.request(options, function (err, resp, json) {
    if (err) {
      return cb(new Error('Could not get that dat, are you sure the ID is right?'))
    }
    return cb(null, json)
  })
}
Metadats.prototype.searchByField = function (query, field, cb) {
  var options = {
    uri: '/search/' + field,
    method: 'GET',
    json: true,
    qs: {
      query: query
    }

  }
  this.request(options, function (err, resp, json) {
    return cb(err, json)
  })
}

module.exports = Metadats
