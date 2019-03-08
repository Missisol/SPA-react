const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const routeProducts = require('./routes/products');
const routeCustomers = require('./routes/customers');
const routeInvoices = require('./routes/invoices');
const routeInvoiceItems = require('./routes/invoiceitems');

mongoose.connect('mongodb://localhost:27017/spa_react', { useNewUrlParser: true });

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', routeProducts);
app.use('/api/customers', routeCustomers);
// app.use('/api/invoices', routeInvoices);
// app.use('/api/invoiceitems', routeInvoiceItems);

app.use(function (req, res, next) {
  let error = new Error('Page not found');
  error.status = 404;
  next(error);
});

app.use(function (error, req, res) {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error,
  })
});

server.listen(3000, () => {
  console.log('Express server listening on port 3000');
});