const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  available: { type: String, default: 'Yes' },
  testing: { type: String, default: 'Unit tests + UI flow' }
});

module.exports = mongoose.model('Product', productSchema);
