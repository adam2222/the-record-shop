'use strict'

const db = require('APP/db')
const User = db.model('users')
// const Order = db.model('orders')

const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')

const api = require('express').Router();

// ALL USERS

api.get('/', forbidden('only admins can list users'), (req, res, next) => 
	User.findAll()
	.then(users => res.json(users))
	.catch(next)
)

api.post('/', (req, res, next) =>
	User.create(req.body)
	.then(user => res.sendStatus(201))
	.catch(next)
)

// SINGLE USER

api.get('/:userId', mustBeLoggedIn, selfOnly, (req, res, next) => 
	User.findById(req.params.id)
	.then(user => res.json(user))
	.catch(next)
)

api.get('/:userId/orders', mustBeLoggedIn, selfOnly, (req, res, next) => 
	Order.findAll({
		where: {user_id: req.params.userId}
	})
	.then(orders => res.json(orders))
	.catch(next)
)

// api.get('/:userId/orders/:orderId', mustBeLoggedIn, selfOnly, (req, res, next) => 
// 	Order.findOne({
// 		where: {

// 		}
// 	})
// )

// ADMIN ACTIVITIES -- UPDATING AND DELETING USER PROFILES

api.put('/:userId', mustBeLoggedIn, adminOnly, (req, res, next) => 
	User.update(req.body, {
		where: {id: req.params.userId}
	})
	.catch(next)
)

api.delete('/:userId', mustBeLoggedIn, adminOnly, (req, res, next) => {
	User.delete({
		where: {id: req.params.userId}
	})
	.catch(next)
})
	
module.exports = api;