const mongoose = require('mongoose')

const cartModelSchema = new mongoose.Schema({
  product:
  {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  totalAmount: {
    type: Number
  },


})

const cartFieldModel = mongoose.model('cartModel', cartModelSchema)
module.exports = cartFieldModel