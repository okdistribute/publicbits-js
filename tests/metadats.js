var test = require('tape')
var datapi = require('../').defaults({ uri: 'http://localhost:5000'})

module.exports.simpleRefusal = function (test, common) {
  test('cant create a metadat without name and description and url', function (t) {
    var metadat_data = {
      name: '',
      description: 'weee',
      owner_id: 'karissa',
      url: 'http://metadat.dathub.org'
    }
    datapi.metadats.create(metadat_data, function (err, metadat) {
      t.throws(err, 'should error without name')
    })

    metadat_data = {
      name: 'asdfasdf',
      description: '',
      owner_id: 'karissa',
      url: 'http://metadat.dathub.org'
    }

    datapi.metadats.create(metadat_data, function (err, metadat) {
      t.throws(err, 'should error without description')
    })

    metadat_data = {
      name: '',
      description: '',
      owner_id: 'karissa',
      url: 'http://metadat.dathub.org'
    }

    datapi.metadats.create(metadat_data, function (err, metadat) {
      t.throws(err, 'should error with no name and desc')
    })

    metadat_data = {
      name: 'asdfasdf',
      description: 'asdfasdf',
      owner_id: 'karissa',
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
}

module.exports.integration = function (test, common) {
  test('can create a metadat', function (t) {
    common.getRegistry(t, function (err, api, done) {
      common.login(api, function(err, jar, res) {
        var metadat_data = {
          name: 'ima medatat',
          description: 'weee',
          url: 'http://metadat.dathub.org',
          owner_id: 'karissa',
          json: {"blah": "hello"}
        }
        var opts = {headers: {cookie: res.headers['set-cookie']}}
        datapi.metadats.create(metadat_data, opts, function (err, metadat) {
          console.log('create', metadat)
          t.ifError(err)
          t.ok(metadat)
          t.ok(metadat.id)
          datapi.metadats.getById(metadat.id, function (err, getMetadat) {
            t.ifError(err)
            t.equals(metadat.url, getMetadat.url, 'can create and retrieve the metadat from the js api')

            datapi.metadats.searchByField('ima medatat', 'name', function (err, metadats) {
              t.ifError(err)
              t.equals(metadats.rows.length, 1)
              done()
            })
          })
        })
      })
    })
  })
}



module.exports.all = function(test, common) {
  module.exports.simpleRefusal(test, common);
  module.exports.integration(test, common);
}
