'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Album = require('./album')

module.exports = db.define('album_review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  hooks: {
    afterCreate: function(currentReview) {
      let averageRating
      this.findAll({
        where: {
          album_id: currentReview.album_id
        }
      })
      .then(allReviewsArr => {
        averageRating = allReviewsArr.reduce(function(total, review) {
          return total + review.stars
        }) / allReviewsArr.length
        return Album.findById(currentReview.album_id)
      })
      .then(foundAlbum => {
        foundAlbum.rating = averageRating
      })
    }
  }
})
// add a hook before save that updates the average review property in the albums model
