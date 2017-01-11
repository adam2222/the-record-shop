'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

module.exports = db.define('order', {
  date_created: {
    type: Sequelize.STRING,
    defaultValue: function() {
      let now = new Date()
      return now.toDateString()
    }
  },
  date_shipped: {
    type: Sequelize.STRING,
    defaultValue: 'Pending'
  },
  date_delivered: {
    type: Sequelize.STRING,
    defaultValue: 'Pending'
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  items: Sequelize.ARRAY(Sequelize.JSON),
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    defaultValue: 'created'
  }
})


//before validate hook to make sure quantity of item ordered is is equal to or less than the quantity specified on the album model
//if not then throw error, else, then update quantity of item
