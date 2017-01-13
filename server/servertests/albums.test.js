'use strict'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Album = require('APP/db/models/album')
const app = require('APP/server/start')
let agent = request.agent(app)

describe('Albums Route', () => {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */

  before('wait for the db', () => db.didSync)

  afterEach(function () {
    return Promise.all([
      Album.truncate({ cascade: true })
    ])
  })

  describe('GET /albums', function () {

    it('responds with an array via JSON', function () {

      return agent
      .get('/api/albums')
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body).to.have.length(0)
      })

    })
    it('returns an album if there is one in the DB', function () {

      var album = Album.build({
        title: 'asdfafaf',
        cost: 50,
        quantity_available: 2
      })

      return album.save().then(function () {

        return agent
        .get('/api/albums')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].cost).to.equal(50)
        })
      })
    })
  })

  describe('PUT api/albums/:albumId/decrement/:quantity', function () {

    var newAlbum

    beforeEach(function () {

      return Album.create({
        title: 'asdfafaf',
        cost: 50,
        quantity_available: 2
      })
      .then(function (newlyCreatedAlbum) {
        newAlbum = newlyCreatedAlbum
      })

    })

    it('decrements quantity_available', function () {

      return agent
      .put('/api/albums/' + newAlbum.id + '/decrement/1')
      .expect(200)
      .expect(function (res) {
      	expect(res.body.quantity_available).to.equal(1)
      })
    })

  })


  describe('PUT api/albums/:albumId', function () {

    var newAlbum

    beforeEach(function () {

      return Album.create({
        title: 'asdfafaf',
        cost: 50,
        quantity_available: 1
      })
      .then(function (newlyCreatedAlbum) {
        newAlbum = newlyCreatedAlbum
      })

    })

  })

})
