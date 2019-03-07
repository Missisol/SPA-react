const express = require('express');
const ProductModel = require('../models/products');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await ProductModel.find()
    .catch((error) => {
      console.log(error);
    });
  res.json(products);
});

router.post('/', async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const product = new ProductModel({
    name: name,
    price: price,
  });
  await product.save();
  const newProduct = await ProductModel.findOne({name: name, price: price})
    .catch(() => {
      console.log('Error');
    });

  res.json(newProduct);
});

router.patch('/:id', async (req, res) => {
  const productId = req.params.id;
  const name = req.body.name;
  const price = parseFloat(req.body.price);

  await ProductModel.updateOne({_id: productId}, {$set: {name: name, price: price}})
    .catch(() => {
      console.log('Error');
    });

  res.json(req.body);
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;

  await ProductModel.deleteOne({_id: productId})
    .catch((error) => {
      console.log(error);
    });

  res.json(req.params);
});


module.exports = router;