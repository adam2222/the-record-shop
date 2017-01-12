'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

module.exports = db.define('album', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    defaultValue: 'Not Available'
  },
  genre: Sequelize.STRING,
  release_year: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rating: Sequelize.INTEGER,      //see hook for album review
  quantity_available: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image_front: {
    type: Sequelize.STRING
  },
  image_back: {
    type: Sequelize.STRING
  },
})
