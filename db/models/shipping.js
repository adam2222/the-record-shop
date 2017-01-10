const Sequelize = require('sequelize')
const db = require('APP/db')

module.exports = db.define('shipping', {
  shipping_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipping_city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipping_state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipping_zip_code: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5]
    }
  }
})
