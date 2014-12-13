var test = require('tape')
var datapi = require('../').defaults({ uri: 'http://localhost:5000'})

test('cant create a metadat without name and description and url', function (t) {
  var metadat_data = {
    name: '',
    description: 'weee',
    url: 'http://metadat.dathub.org'
  }
  datapi.metadats.create(metadat_data, function (err, metadat) {
    t.throws(err, 'should error without name')
  })

  metadat_data = {
    name: 'asdfasdf',
    description: '',
    url: 'http://metadat.dathub.org'
  }

  datapi.metadats.create(metadat_data, function (err, metadat) {
    t.throws(err, 'should error without description')
  })

  metadat_data = {
    name: '',
    description: '',
    url: 'http://metadat.dathub.org'
  }

  datapi.metadats.create(metadat_data, function (err, metadat) {
    t.throws(err, 'should error with no name and desc')
  })

  metadat_data = {
    name: 'asdfasdf',
    description: 'asdfasdf',
    url: ''
  }

  datapi.metadats.create(metadat_data, function (err, metadat) {
    t.throws(err, 'should error with no url')
  })

  metadat_data = {
    name: '',
    description: '',
    url: ''
  }

  datapi.metadats.create(metadat_data, function (err, metadat) {
    t.throws(err, 'should error with no name, desc, url')
    t.end()
  })
})


test('can create a metadat', function (t) {
  var metadat_data = {
    name: 'ima medatat',
    description: 'weee',
    url: 'http://metadat.dathub.org'
  }

  datapi.metadats.create(metadat_data, function (err, metadat) {
    t.ifError(err)
    t.ok(metadat.id)
    metadats.getById(metadat.id, function (err, getMetadat) {
      t.ifError(err)
      t.equals(metadat.url, getMetadat.url, 'can create and retrieve the metadat from the js api')
    })
  })
})