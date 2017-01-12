'use strict'

const db = require('APP/db')
const User = require('APP/db/models/user')
const Album = require('APP/db/models/album')
const ShoppingCartItem = require('../models/shopping_cart_items')
const {expect} = require('chai')
const Promise = require('bluebird')

describe('The Shopping Cart model', () => {

  before('wait for the db', () => db.didSync)

  let adam, bad;

  beforeEach(function(){
      const user = User.create({
        id: 1,
        firstName: 'Adam',
        lastName: 'Intrator',
        email: 'adam@adam.adam',
        password_digest: 'pass',
        password: 'pass',
        DOB: '1980/4/3'
    })
      const album = Album.create({
        id: 1,
        title: 'Bad',
        artist: 'Michael Jackson',
        genre: 'Pop',
        release_year: 1986,
        description: 'Awesome!',
        cost: 10,
        quantity_available: 1



    })

    return Promise.all([user, album])
    .spread((user, album) => {
        adam = user;
        bad = album;
    })
  })
  describe('', () => {
    it('creating an association between User and Album creates a new shopping cart item instance', function () {
      adam.addAlbum(bad, { quantity: 2 })
      .then(() => {
        return ShoppingCartItem.findOne({
            where: {
              user_id: 1
            }
          })
      })
      .then(item => {
        expect(item.album_id).to.equal(1)
        expect(item.quantity).to.equal(2)
      })
    })
  })


  afterEach(function () {
    return Promise.all([
      ShoppingCartItem.truncate({ cascade: true })
    ])
  })

})

// expect(item.album_id).to.equal(2)

// return ShoppingCartItem.create({
//   quantity: 1,
//   user_id: user.id,
//   album_id: album.id
// })
