const express = require('express');
const CustomerModel = require('../models/customers');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await CustomerModel.find()
    .catch((error) => {
      console.log(error);
    });
  res.json(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await CustomerModel.findOne({ _id: req.params.id })
    .catch((error) => {
      console.log(error);
    });
  res.json(customer);
});

router.post('/', async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const customer = new CustomerModel({
    name: name,
    address: address,
    phone: phone,
  });
  await customer.save();
  const newCustomer = await CustomerModel.findOne({
    name: name,
    address: address,
    phone: phone,
  })
    .catch(() => {
      console.log('Error');
    });
  res.json(newCustomer);
});

router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;

  await CustomerModel.updateOne({ _id: customerId }, {
    $set: { name: name, address: address, phone: phone, }
  })
    .catch(() => {
      console.log('Error');
    });
  res.json(req.body);
});

router.delete('/:id', async (req, res) => {
  const customerId = req.params.id;

  await CustomerModel.deleteOne({ _id: customerId })
    .catch((error) => {
      console.log(error);
    });
  res.json(req.params);
});

module.exports = router;