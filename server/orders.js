'use strict'

const db = require('APP/db')
const Order = require('APP/db/models/order')
const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const router = require('express').Router()

// router.get('/', mustBeLoggedIn, (req, res, next) => {   --> real route
router.get('/', (req, res, next) => {    //---> route is used for testing purposes
    Order.findAll()
    .then(orders => {
        // If user is an admin, return all orders
        // if (req.user.isAdmin) return res.json(orders)

        // Otherwise, return all of the user's own orders
        // return res.json(orders.filter(order => order.user_id === req.user.id))
        res.json(orders)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Order.create(req.body)
    .then(createdOrder => {
        res.status(201).json(createdOrder)
    })
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
    Order.findById(+req.params.orderId)
    .then(order => res.json(order))
    .catch(next)
})

// router.put('/:orderId', mustBeLoggedIn, adminOnly, (req, res, next)
router.put('/:orderId', (req, res, next) => {    //this is used for testing purposes
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
