'use strict'

const db = require('APP/db')
const User = require('../models/user')
const {expect} = require('chai')

describe('User', () => {
  before('wait for the db', () => db.didSync)

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({
        firstName: 'James',
        lastName: 'Bond',
        email: 'bond@007.com',
        password: 'ok'
      })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({
        firstName: 'Jim',
        lastName: 'Miller',
        email: 'miller@007.com',
        password: 'ok'
      })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })
})


describe('The `User` model', () => {


  before('wait for the db', () => db.didSync)

  var modelBody = {
    firstName: 'James',
    lastName: 'Bond',
    email: '007@bond.com'
  }

  var user
  beforeEach(function(){
    user = User.build(modelBody)
  })


  afterEach(function () {
    return Promise.all([
      User.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){


    it('includes `firstName`, `email` and `lastName` fields', function () {

      return user.save()
      .then(function (savedUser) {
        expect(savedUser.firstName).to.equal('James')
        expect(savedUser.lastName).to.equal('Bond')
        expect(savedUser.email).to.equal(modelBody.email)
      })

    })

    it('eager loads credit card and shipping information', function () {

      return user.save()
      .then(function (savedUser) {
        return savedUser.reload(User.options.scopes.populate())
        .then(function(thisUser) {
          // console.log(thisUser)
          expect(typeof thisUser.shippings).to.equal('object')
          expect(typeof thisUser.credit_cards).to.equal('object')
        })
      })

    })

    it('requires `firstName`', function () {

      user.firstName = null

      return user.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('firstName cannot be null')
      })

    })

    it('requires `email` (in a more strict way than for `firstName`)', function () {

      user.email = ''

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('Validation error')
      })

    })
  })
})
