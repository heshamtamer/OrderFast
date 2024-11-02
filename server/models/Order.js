const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
