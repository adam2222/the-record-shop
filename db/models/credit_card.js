const Sequelize = require('sequelize')
const db = require('APP/db')

module.exports = db.define('credit_card', {
  card_number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [16],
      verify: function(val) {
        if (['3','4','5','6'].indexOf(val[0]) === -1) {
          throw new Error('Invalid CC number')
        }
      }
      // isCreditCard: true 
    }
  },
  expiration_month: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1, 
      max: 12
      // isInt: true
    }
  },
  expiration_year: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ccv: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3,4]
    }
  },
  billing_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5]
    }
  }
})
