const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema({
  invoice_id: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('InvoiceItem', invoiceItemSchema);