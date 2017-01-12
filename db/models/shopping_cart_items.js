const Sequelize = require('sequelize')
const db = require('APP/db')

const User = require('APP/db/models/user')
const Album = require('APP/db/models/album')

module.exports = db.define('shopping_cart_items', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  scopes: {
    populate: () => ({
      include: [{
        model: Album
      }, {
        model: User
      }]
    })
  }
})
