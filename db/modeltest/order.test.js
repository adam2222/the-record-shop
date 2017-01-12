'use strict'

const db = require('APP/db')
const Order = require('../models/order')
const {expect} = require('chai')

describe('The `Order` model', () => {


  before('wait for the db', () => db.didSync)


  var modelBody = {
    total: 100,
    items: [{album: '90s', name: 'Jim'}, {album: '80s', name: 'Joe'}]
  }

  var currentOrder
  beforeEach(function(){
    currentOrder = Order.build(modelBody)
  })


  afterEach(function () {
    return Promise.all([
      Order.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){

    it('includes total and items field', function () {

      return currentOrder.save()
      .then(function (savedOrder) {
        // console.log(savedOrder)
        expect(savedOrder.total).to.equal(100)
        expect(savedOrder.items[0].album).to.equal('90s')
      })

    })

    it('requires `total`', function () {

      currentOrder.total = null

      return currentOrder.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('total cannot be null')
      })

    })

    it('checks for default value', function () {

      return currentOrder.save()
      .then(function (result) {
        expect(result.date_shipped).to.equal('Pending')
        expect(result.date_delivered).to.equal('Pending')
        expect(typeof result.date_created).to.equal('string')
      })
    })
  })
})
