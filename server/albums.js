'use strict'

const db = require('APP/db')
const Album = db.model('albums')
const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const api = require('express').Router();

api.get('/', (req, res, next) => {
    Album.scope('populate').findAll()
    .then(albums => res.json(albums))
    .catch(next);
})

api.get('/:albumId', (req, res, next) => {
    Album.scope('populate').findOne({
        where: {id: req.params.albumId}
    })
    .then(album => res.json(album))
    .catch(next);
})

api.get('/:genreName', (req, res, next) => {
    Album.findAll({
            where: {genre: req.params.genreName}
        })
        .then(albums => res.json(albums))
        .catch(next);
})
    
module.exports = api;