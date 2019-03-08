const express = require('express');
const InvoiceModel = require('../models/invoices');

const router = express.Router();

router.get('/', async (req, res) => {
  const invoices = await InvoiceModel.find()
    .catch((error) => {
      console.log(error);
    });
  res.json(invoices);
});

router.get('/:id', async (req, res) => {
  const invoice = await InvoiceModel.findById(req.params.id)
    .catch((error) => {
      console.log(error);
    });
  res.json(invoice);
});

router.post('/', async (req, res) => {
  const customerId = req.body.customer_id;
  const discount = req.body.discount;
  const total = parseFloat(req.body.total);
  const invoice = new InvoiceModel({
    customer_id: customerId,
    discount: discount,
    total: total,
  });
  await invoice.save();
  const newInvoice = await InvoiceModel.findOne({
    customer_id: customerId,
    discount: discount,
    total: total,
  })
    .catch(() => {
      console.log('Error');
    });
  res.json(newInvoice);
});

router.patch('/:id', async (req, res) => {
  const invoiceId = req.params.id;
  const customerId = req.body.customer_id;
  const discount = req.body.discount;
  const total = parseFloat(req.body.total);

  await InvoiceModel.updateOne({ _id: invoiceId }, {
    $set: {
      customer_id: customerId,
      discount: discount,
      total: total,
    }
  })
    .catch(() => {
      console.log('Error');
    });
  res.json(req.body);
});

router.delete('/:id', async (req, res) => {
  const invoiceId = req.params.id;

  await InvoiceModel.deleteOne({ _id: invoiceId })
    .catch((error) => {
      console.log(error);
    });
  res.json(req.params);
});

module.exports = router;