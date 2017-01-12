'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

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
})
// add a hook before save that updates the average review property in the albums model
