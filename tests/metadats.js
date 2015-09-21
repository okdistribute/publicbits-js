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
    datapi.metadats.create(metadat_data, function (err, resp, metadat) {
      t.throws(err, 'should error without name')
    })

    metadat_data = {
      name: 'asdfasdf',
      description: '',
      owner_id: 'karissa',
      url: 'http://metadat.dathub.org'
    }

    datapi.metadats.create(metadat_data, function (err, resp, metadat) {
      t.throws(err, 'should error without description')
    })

    metadat_data = {
      name: '',
      description: '',
      owner_id: 'karissa',
      url: 'http://metadat.dathub.org'
    }

    datapi.metadats.create(metadat_data, function (err, resp, metadat) {
      t.throws(err, 'should error with no name and desc')
    })

    metadat_data = {
      name: 'asdfasdf',
      description: 'asdfasdf',
      owner_id: 'karissa',
      url: ''
    }

    datapi.metadats.create(metadat_data, function (err, resp, metadat) {
      t.throws(err, 'should error with no url')
    })

    metadat_data = {
      name: '',
      description: '',
      url: ''
    }

    datapi.metadats.create(metadat_data, function (err, resp, metadat) {
      t.throws(err, 'should error with no name, desc, url')
      t.end()
    })
  })
}

module.exports.integrationCreate = function (test, common) {
  test('can create a metadat', function (t) {
    common.getRegistry(t, function (err, api, done) {
      common.login(api, function(err, jar, res) {
        var metadat_data = {
          name: 'ima medatat',
          description: 'weee',
          url: 'http://metadat.dathub.org',
          owner_id: 'karissa',
          datasets: [{
            name: 'one'
          }],
          readme: 'hello readme',
          json: {"blah": "hello"}
        }
        var opts = {headers: {cookie: res.headers['set-cookie']}}
        datapi.metadats.create(metadat_data, opts, function (err, resp, metadat) {
          t.ifError(err)
          t.ok(metadat)
          t.ok(metadat.id)
          datapi.metadats.getById(metadat.id, function (err, resp, getMetadat) {
            t.ifError(err)
            t.equals(metadat.url, getMetadat.url, 'can create and retrieve the metadat from the js api')

            var opts = {
              query: 'ima medatat'
            }

            datapi.metadats.searchByField('name', opts, function (err, resp, metadats) {
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

module.exports.integrationUpdate = function (test, common) {
  test('can update a metadat', function (t) {
    common.getRegistry(t, function (err, api, done) {
      common.login(api, function(err, jar, res) {
        var metadat_data = {
          name: 'ima medatat2',
          description: 'weee',
          url: 'http://metadat.dathub.org',
          owner_id: 'karissa',
          datasets: [{
            name: 'one'
          }],
          readme: 'hello readme',
          json: {"blah": "hello"}
        }
        var opts = {headers: {cookie: res.headers['set-cookie']}}
        datapi.metadats.create(metadat_data, opts, function (err, resp, metadat) {
          t.ifError(err)

          datapi.metadats.getById(metadat.id, function (err, res, getMetadat) {
            t.ifError(err)
            t.equals(metadat.url, getMetadat.url, 'can create and retrieve the metadat from the js api')
            t.equals(metadat.readme, getMetadat.readme)

            metadat_data.readme = 'a new readme'
            datapi.metadats.update(metadat.id, metadat_data, opts, function (err, resp, metadat) {
              t.ifError(err)
              t.equals(metadat.readme, metadat_data.readme, 'readme changed')

              datapi.metadats.getById(metadat.id, function (err, resp, getMetadat) {
                t.ifError(err)
                t.equals(metadat.url, getMetadat.url, 'can create and retrieve the metadat from the js api')
                done()
              })
            })
          })
        })
      })
    })
  })
}



module.exports.all = function(test, common) {
  module.exports.simpleRefusal(test, common);
  module.exports.integrationCreate(test, common);
  module.exports.integrationUpdate(test, common);
}
