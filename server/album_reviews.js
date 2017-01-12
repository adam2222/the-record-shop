'use strict'

const db = require('APP/db')
const AlbumReview = require('APP/db/models/album_review')
const {mustBeLoggedIn, forbidden, selfOnly, adminOnly} = require('./auth.filters')
const router = require('express').Router()

router.get('/:albumId/reviews', (req, res, next) => {
  AlbumReview.findAll({
    where: {
      album_id: +req.params.albumId
    }
  })
  .then(allReviews => res.json(allReviews))
  .catch(next)
})

router.post('/:albumId/reviews', (req, res, next) => {
  AlbumReview.create(req.body)
  .then(createdReview => {
    return createdReview.setAlbum(+req.params.albumId)
  })
  .then(newReview => res.json(newReview))
  .catch(next)
})

//can add delete and update for reviews later

module.exports = router
