'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

module.exports = db.define('puppy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING,
    defaultValue: 'Unknown'
  },
  status: Sequelize.ENUM('available', 'purchased'),
  gender: Sequelize.ENUM('male', 'female'),
  age: Sequelize.ENUM('young', 'adult'),
  size: Sequelize.ENUM('small', 'medium', 'large'),
  description: Sequelize.TEXT,
  cost: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
});
