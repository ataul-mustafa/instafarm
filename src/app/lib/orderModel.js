const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    deliveryAddress: {
        name: String,
        address: String,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    products: [
        {
            type: Object,
            ref: 'Product',
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;