'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

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
  quantity_available: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});
