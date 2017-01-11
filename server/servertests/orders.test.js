'use strict'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Order = require('APP/db/models/order')
const app = require('APP/server/start')

describe('Order API', () => {

  describe('see orders', () => 
    it('-- GET / returns 200 (Successful)', () =>
        request(app)
        .get('/api/orders')
        .expect(200)
    ),
    it('-- GET /:orderId returns 200 (Successful)', () => 
        request(app)
        .get('/api/orders/1')
        .expect(200)
    )
  )

  describe('add orders', () => 
    it('-- POST / returns 201 (Created)', () =>
        request(app)
        .post('/api/orders')
        .send({
            date_shipped: '2016-06-01',
            date_delivered: '2016-07-01',
            user_id: '1',
            status: 'completed',
            total: 200
        })
        .expect(201)
    )
  )
  
  describe('filter orders by status', () => 
    it('-- GET /status/:statusType returns 200 (Successful)', () =>
         request(app)
         .get('/api/orders/status/complete')
         .expect(200)
    )
  )
})
