'use strict'

const db = require('APP/db')
const Album = require('APP/db/models/album')
const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const api = require('express').Router();

api.get('/', (req, res, next) => {
    Album.findAll({
    	where: {
    		quantity_available: {
    			$gt: 0
    		}
    	}
    })
    .then(albums => res.json(albums))
    .catch(next)
})

api.get('/:albumId', (req, res, next) => {
    Album.findOne({
        where: {id: +req.params.albumId}
    })
    .then(album => res.json(album))
    .catch(next)
})

api.put('/:albumId/decrement/:quantity', (req, res, next) => {
	Album.findById(+req.params.albumId)
	.then((foundAlbum) => {
		return foundAlbum.reload(
			foundAlbum.decrement('quantity_available', {
				by: +req.params.quantity
			})
		)
	})
	.then((updatedAlbum) => {
		res.status(200).json(updatedAlbum)
	})
	.catch(next)
})

module.exports = api
