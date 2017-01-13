'use strict'

const db = require('APP/db')
const User = db.model('users')

const ShoppingCartItem = require('../db/models/shopping_cart_items')

const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const api = require('express').Router();

// ALL USERS

api.get('/', mustBeLoggedIn, adminOnly, (req, res, next) =>
	User.scope('populate').findAll()
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
	User.scope('populate').findById(req.params.id)
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

// SHOPPING CART

api.get('/:userId/cart', mustBeLoggedIn, (req, res, next) => {
	ShoppingCartItem.findAll({
		where: {user_id: req.params.userId}
	})
	.then(items => res.json(items))
	.catch(next)
})

api.put('/:userId/cart', (req, res, next) => {

	ShoppingCartItem.create({
		quantity: req.body.quantity,
		album_id: req.body.album_id,
		user_id: Number(req.params.userId)
	})
	.then(item => {
		return res.json(item);
	})
	.catch(console.error.bind(console))
})

api.delete('/:userId/cart/:albumId', mustBeLoggedIn, (req, res, next) => {
	ShoppingCartItem.destroy({
		where: {album_id: req.params.albumId}
	})
	.catch(next)
})

module.exports = api;
