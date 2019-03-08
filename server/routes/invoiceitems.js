const express = require('express');
const InvoiceItemModel = require('../models/invoiceItems');

const router = express.Router();

router.get('/:invoice_id/items', async (req, res) => {
  const invoiceId = req.params.invoice_id;
  const invoiceItems = await InvoiceItemModel.find({ invoice_id: invoiceId })
    .catch((error) => {
      console.log(error);
    });
  res.json(invoiceItems);
});

router.post('/:invoice_id/items', async (req, res) => {
  const invoiceId = req.params.invoice_id;
  const productId = req.body.product_id;
  const quantity = parseFloat(req.body.quantity);
  const invoiceItem = new InvoiceItemModel({
    invoice_id: invoiceId,
    product_id: productId,
    quantity: quantity,
  });
  await invoiceItem.save();
  const invoiceItems = await InvoiceItemModel.find({ invoice_id: invoiceId })
    .catch(() => {
      console.log('Error');
    });
  res.json(invoiceItems);
});

router.patch('/:invoice_id/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const quantity = parseFloat(req.body.quantity);

  await InvoiceItemModel.updateOne({ _id: itemId }, {
    $set: {
      quantity: quantity,
    }
  })
    .catch(() => {
      console.log('Error');
    });
  res.json(req.body);
});

router.delete('/:invoice_id/items/:id', async (req, res) => {
  const itemId = req.params.id;

  await InvoiceItemModel.deleteOne({ _id: itemId })
    .catch((error) => {
      console.log(error);
    });
  res.json(req.params);
});

module.exports = router;