const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  customer_id: { type: String, required: true },
  discount: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);