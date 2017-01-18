'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const ShoppingCartItem = require('APP/db/models/shopping_cart_items')

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
}, {
  hooks: {
    afterValidate: function(newlyCreatedOrder) {
      ShoppingCartItem.destroy({
        where: {
          user_id: newlyCreatedOrder.user_id
        }
      })
    }
  }
})
