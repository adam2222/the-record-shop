'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Album = require('./album')

let AlbumReview = db.define('album_review', {
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
    afterUpdate: function(currentReview) {
      AlbumReview.findAll({
        where: {
          album_id: currentReview.album_id
        }
      })
      .then(allReviewsArr => {
        let averageRating = Math.round(allReviewsArr.reduce(function(total, review) {
          return total + review.stars
        }, 0) / allReviewsArr.length)
        return Album.update({ rating: averageRating }, {
          where: {
          id: currentReview.album_id
          }
        })
      })
    }
  }
})

module.exports = AlbumReview

// add a hook before save that updates the average review property in the albums model
// .then(([amountUpdated, arrayOfUpdatedAlbums]) => {
//   console.log('foundAlbum', arrayOfUpdatedAlbums[0])
// })

