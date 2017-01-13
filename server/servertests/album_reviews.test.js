'use strict'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const AlbumReview = require('APP/db/models/album_review')
const Album = require('APP/db/models/album')
const app = require('APP/server/start')
let agent = request.agent(app)

describe('Albums Review Route', () => {

  before('wait for the db', () => db.didSync)


  beforeEach(function() {
    Album.create({
      title: 'Master Chef',
      artist: 'Gordon Ramsey',
      cost: 100,
      quantity_available: 5
    })
  })

  afterEach(function () {
    return Promise.all([
      AlbumReview.truncate({ cascade: true }),
      Album.truncate({ cascade: true })
    ])
  })

  describe('GET /articles', function () {

    it('responds with an array via JSON', function () {

      return agent
      .get('/api/reviews/1/reviews')
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body).to.have.length(0)
      })

    })
  })

  describe('POST reviews', function () {

    it('creates a new review', function () {

      return agent
      .post('/api/reviews/5/reviews')
      .send({
        description: 'This is awesome',
        stars: 5
      })
      .expect(function (res) {
        expect(res.body.id).to.not.be.an('undefined')
        expect(res.body.description).to.equal('This is awesome')
        expect(res.body.stars).to.equal(5)
      })

    })
  })
})
