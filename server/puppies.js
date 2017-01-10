'use strict'

const db = require('APP/db')
const Puppy = db.model('puppy')
const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const api = require('express').Router();

api.get('/', (req, res, next) => {
    Puppy.scope('populate').findAll()
    .then(puppies => res.json(puppies))
    .catch(next);
})

api.get('/:puppyId', (req, res, next) => {
    Puppy.scope('populate').findOne({
        where: {id: req.params.puppyId}
    })
    .then(puppy => res.json(puppy))
    .catch(next);
})

api.get('/:breedName', (req, res, next) => {
    Puppy.findAll({
            where: {breed: req.params.breedName}
        })
        .then(puppies => res.json(puppies))
        .catch(next);
})
    
module.exports = api;