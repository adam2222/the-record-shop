'use strict'

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Puppy = require('./puppy')
const Shipping = require('./shipping')
const CreditCard = require('./credit_card')

Puppy.belongsTo(User)
User.hasMany(Puppy)
Shipping.belongsTo(User)
User.hasMany(CreditCard)
CreditCard.belongsTo(User)


module.exports = {User, Puppy, Shipping, CreditCard}
