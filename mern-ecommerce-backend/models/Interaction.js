const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  action: { type: String, enum: ['view', 'cart', 'purchase'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interaction', InteractionSchema);