'use strict'

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Album = require('./album')
const Shipping = require('./shipping')
const CreditCard = require('./credit_card')
const Order = require('./order')
const AlbumReview = require('./album_review')
const ShoppingCartItem = require('./shopping_cart_items')

Shipping.belongsTo(User)
User.hasMany(Shipping)
User.hasMany(CreditCard)
CreditCard.belongsTo(User)

Album.belongsToMany(User, {through: ShoppingCartItem})
User.belongsToMany(Album, {through: ShoppingCartItem})

Order.belongsTo(User)
User.hasMany(Order)

Album.hasMany(AlbumReview)
AlbumReview.belongsTo(Album)

module.exports = {User, Album, Shipping, ShoppingCartItem, CreditCard, AlbumReview, Order}
