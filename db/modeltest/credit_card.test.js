'use strict'

const db = require('APP/db')
const CreditCard = require('../models/credit_card')
const {expect} = require('chai')


describe('The `Credit Card` model', () => {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */

  before('wait for the db', () => db.didSync)

  /**
   * Next, we create an (un-saved!) article instance before every spec
   */
  var modelBody = {
    card_number: '4012888888881881',
    expiration_month: 12,
    expiration_year: '17',
    ccv: '456',
    billing_address: '20 main st',
    billing_city: 'New York',
    billing_state: 'NY',
    billing_zip: '55555'
  }

  var card
  beforeEach(function(){
    card = CreditCard.build(modelBody)
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      CreditCard.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `title` and `content`.
     *
     * http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations
     */
    it('includes `card_number`, `expiration_month`, `expiration_year`, and `ccv`', function () {

      return card.save()
      .then(function (place) {
        expect(place.card_number).to.equal('4012888888881881')
        expect(place.expiration_month).to.equal(12)
        expect(place.expiration_year).to.equal('17')
        expect(place.ccv).to.equal('456')
      })

    })

    it('requires `billing_address`', function () {

      card.billing_address = null

      return card.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('billing_address cannot be null')
      })

    })

    it('requires valid `credit_card` number', function () {

      card.card_number = '122'

      return card.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('Validation error')
      })

    })
  })
})
