'use strict'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Order = require('APP/db/models/order')
const app = require('APP/server/start')
let agent = request.agent(app)

describe('Orders Route', () => {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */

  before('wait for the db', () => db.didSync)

  afterEach(function () {
    return Promise.all([
      Order.truncate({ cascade: true })
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
  })
})
