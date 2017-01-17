'use strict'

const db = require('APP/db')
const User = db.model('users')
const Album = db.model('album')
const ShoppingCartItem = require('../db/models/shopping_cart_items')

const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const api = require('express').Router();

// ALL USERS

api.get('/', (req, res, next) =>
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

// add mustBeLoggedIn, selfOnly AFTER AUTH IS WORKING
api.get('/:userId', (req, res, next) =>
	User.scope('populate').findById(req.params.id)
	.then(user => res.json(user))
	.catch(next)
)

// add mustBeLoggedIn, selfOnly AFTER AUTH IS WORKING
api.get('/:userId/orders', (req, res, next) =>
	Order.findAll({
		where: {user_id: req.params.userId}
	})
	.then(orders => res.json(orders))
	.catch(next)
)

// ADMIN ACTIVITIES -- UPDATING AND DELETING USER PROFILES

// add mustBeLoggedIn, adminOnly AFTER AUTH IS WORKING
api.put('/:userId', (req, res, next) =>
	User.update(req.body, {
		where: {id: req.params.userId}
	})
	.catch(next)
)

// add mustBeLoggedIn, adminOnly AFTER AUTH IS WORKING
api.delete('/:userId', (req, res, next) => {
	User.delete({
		where: {id: req.params.userId}
	})
	.catch(next)
})

// SHOPPING CART

// add mustBeLoggedIn, selfOnly AFTER AUTH IS WORKING
api.get('/:userId/cart', (req, res, next) => {
	User.findAll({
		where: {id: req.params.userId},
		include: [Album]
	})
	.then(results => {
		let formattedResults = results.map(result => result.dataValues.albums.map(album => album.dataValues))
		res.json(formattedResults)
	})
	.catch(next)
})

// add mustBeLoggedIn, selfOnly AFTER AUTH IS WORKING
// FOR ADDING A NEW ITEM TO CART
api.post('/:userId/cart/:album_id', (req, res, next) => {
	ShoppingCartItem.findOrCreate({
		where: {
			album_id: req.params.album_id,
			user_id: Number(req.params.userId)
		},
		defaults: {
			quantity: req.body.quantity
		}
	})
	.then(res.sendStatus(200))
	.catch(next)
})

// FOR UPDATING QUANTITY OF ITEMS IN A ROUTE 
api.put('/:userId/cart/:albumId', (req, res, next) => {
	if (req.body.quantity === '') req.body.quantity = 0

	ShoppingCartItem.update({
		quantity: +req.body.quantity
	}, {
		where: {
			album_id: req.params.albumId,
			user_id: req.params.userId
		}, returning: true
	})
	.then(userAlbum => {
		let updatedAlbum = userAlbum[1][0].dataValues
		res.json(updatedAlbum)
	})
	.catch(next)
})

api.delete('/:userId/cart', (req, res, next) => {
	ShoppingCartItem.destroy({
		where: {user_id: req.params.userId},
		truncate: true
	})
	.then(() => res.sendStatus(200))
	.catch(next)
})

// add mustBeLoggedIn, selfOnly AFTER AUTH IS WORKING
api.delete('/:userId/cart/:albumId', (req, res, next) => {
	ShoppingCartItem.destroy({
		where: {
			album_id: +req.params.albumId,
			user_id: +req.params.userId
		}
	})
	.then(() => res.sendStatus(200))
	.catch(next)
})

module.exports = api;
