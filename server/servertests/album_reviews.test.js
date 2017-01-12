'use strict'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const AlbumReview = require('APP/db/models/album_review')
const app = require('APP/server/start')
let agent = request.agent(app)

describe('Albums Review Route', () => {

  before('wait for the db', () => db.didSync)

  afterEach(function () {
    return Promise.all([
      AlbumReview.truncate({ cascade: true })
    ])
  })

  describe('GET /articles', function () {

    it('responds with an array via JSON', function () {

      return agent
      .get('/api/orders')
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body).to.have.length(0)
      })

    })
    it('returns an order if there is one in the DB', function () {

      var orders = AlbumReview.build({
        total: 100
      })

      return orders.save().then(function () {

        return agent
        .get('/api/orders')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].total).to.equal(100)
        })
      })
    })
  })

  describe('PUT api/orders/:id', function () {

    var newOrder

    beforeEach(function () {

      return AlbumReview.create({
        total: 200
      })
      .then(function (newlyCreatedOrder) {
        newOrder = newlyCreatedOrder
      })

    })

    it('updates an order', function () {

      return agent
      .put('/api/orders/' + newOrder.id)
      .send({
        total: 100
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.id).to.not.be.an('undefined')
        expect(res.body.total).to.equal(100)
        expect(res.body.status).to.equal('created')
      })

    })

    it('saves updates to the DB', function () {

      return agent
      .put('/api/orders/' + newOrder.id)
      .send({
        total: 10
      })
      .then(function () {
        return AlbumReview.findById(newOrder.id)
      })
      .then(function (foundOrder) {
        expect(foundOrder).to.exist // eslint-disable-line no-unused-expressions
        expect(foundOrder.total).to.equal(10)
      })

    })

    it('gets 500 for invalid update', function () {

      return agent
      .put('/api/orders/' + newOrder.id)
      .send({ total: 'no strings allowed' })
      .expect(500)

    })

  })


})
