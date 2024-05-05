const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  description: [
    {
      type: String,
      required: true
    }
  ],
  availability: {
    type: String,
    enum: ['in-stock', 'out-of-stock']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;