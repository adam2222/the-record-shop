'use strict'

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Album = require('./album')
const Shipping = require('./shipping')
const CreditCard = require('./credit_card')

Album.belongsTo(User)
User.hasMany(Album)
Shipping.belongsTo(User)
User.hasMany(Shipping)
User.hasMany(CreditCard)
CreditCard.belongsTo(User)


module.exports = {User, Album, Shipping, CreditCard}
