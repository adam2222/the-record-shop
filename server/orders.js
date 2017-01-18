'use strict'

const db = require('APP/db')
const Album = require('APP/db/models/album')
const Order = require('APP/db/models/order')
const CreditCard = require('APP/db/models/credit_card')
const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const router = require('express').Router()
const User = require('APP/db/models/user')

// router.get('/', (req, res, next) => {    //---> route is used for testing purposes
// router.get('/', mustBeLoggedIn, (req, res, next) => {
//   Order.findAll()
//   .then(orders => {
// If user is an admin, return all orders
//   if (req.user.isAdmin){
//     res.json(orders)
//   } else {
//   Otherwise, return all of the user's own orders
//   return res.json(orders.filter(order => order.user_id === req.user.id))
//     }
//   })
//   .catch(next)
//   })

router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      user_id: +req.params.userId
    }
  })
  .then(allOrders => res.json(allOrders))
  .catch(next)
})

router.post('/:userId', (req, res, next) => {
  //check for guest
  User.findOne({
    where: {
      id: +req.params.userId
    },
    include: [Album]
  })
  .then(user => {
    let albums = user.albums
    for (let i = 0; i < albums.length; i++) {
      let totalAmount = albums[i].shopping_cart_items.quantity
      if (albums[i].quantity_available < totalAmount) {
        throw Error(albums[i].title + ' is unavailable')
      }
     }
     return albums
   })
  .then(albums => {
    return Promise.all(albums.map(album => {
      Album.update({
        quantity_available: Number(album.quantity_available - album.shopping_cart_items.quantity)
      }, {
        where: {
          id: album.id
        }
      })
    }))
  })
  .then(() => {
    return Order.create(req.body)
  })
  .then(createdOrder => {
    return createdOrder.setUser(+req.params.userId)
  })
  .then(finalizedOrder => {
    res.status(201).json(finalizedOrder)
  })
  .catch(err => res.status(410).send(err))
})

router.get('/:userId/orders/:orderId', (req, res, next) => {
    Order.findAll({
      where: {
        id: req.params.orderId,
        user_id: req.params.userId
    }
  })
    .then(order => {
      res.json(order[0])
    })
    .catch(next)
})

// router.put('/:orderId', (req, res, next) => {    //this is used for testing purposes
router.put('/:orderId', mustBeLoggedIn, adminOnly, (req, res, next) => {
    Order.update(req.body, {
        where: {
           id: +req.params.orderId
        },
        returning: true
    })
    .then(([amountUpdated, arrayOfUpdatedOrders]) => {
        if (!amountUpdated) {
            throw Error('unable to update')
        }
        res.status(200).json(arrayOfUpdatedOrders[0])
    })
    .catch(next)
})

module.exports = router


//upon checkout to make sure quantity of item ordered is is equal to or less than the quantity specified on the album model
//if not then throw error, else, then update quantity of item
