'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

module.exports = db.define('album_review', {
  review_text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  review_stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
});
