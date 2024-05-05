const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
  },
    product: {
        type: Object,
        ref: 'Product',
    },
    quantity: {
      type: Number,
      max: [8, "Quantity can't exceed more than 8"],
      default: 0,
    },
    totalPrice: {
      type: Number,
    }
})

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
module.exports = Cart;