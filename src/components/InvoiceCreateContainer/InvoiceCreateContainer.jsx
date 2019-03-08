import './InvoiceCreateContainer.css';

import React, { Component, Fragment } from 'react';
import { Button, FormGroup, Form, FormControl } from "react-bootstrap";

import ProductsTableCreate from "components/ProductsTableCreate";

export default class InvoiceCreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discount: '',
      customer_id: '',
      product_id: '',
      allProducts: [],
      allCustomers: [],
      loading: false,
      productsTable: [],
      total: 0,
      arrProductItems: [],
    };
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAdd = () => {
    let prod = this.state.allProducts.filter((product) => {
      return product._id === this.state.product_id
    });
    const prodId = prod[0]._id;

    if ((this.state.productsTable.filter((product) => {
      return product._id === prodId;
    })).length === 0) {
      this.setState({
        productsTable: this.state.productsTable.concat(prod),
      })
    }
  };

  handleItemCount = (item) => {
    this.setState({
      arrProductItems: this.state.arrProductItems.concat(item).map((currentValue, index, array) => {
        if (!currentValue._id || (currentValue._id === item._id && array.length > 1 && index !== array.length - 1)) {
          return {};
        } else {
          return currentValue;
        }
      }).filter((obj) => {
        return '_id' in obj === true;
      }),
      total: Math.round((this.state.arrProductItems.concat(item).map((currentValue, index, array) => {
        if (!currentValue._id || (currentValue._id === item._id && array.length > 1 && index !== array.length - 1)) {
          return {};
        } else {
          return currentValue;
        }
      }).filter((obj) => {
        return '_id' in obj === true;
      }).map((str) => {
        return parseInt(str.quantity) * parseFloat(str.price);
      }).reduce((prev, current) => {
        return prev + current
      }, 0)) * 100) / 100,
    })
  };

  handleItemDelete = (id) => {
    this.setState({
      productsTable: this.state.productsTable.filter((product) => {
        return product._id !== id;
      }),
      arrProductItems: this.state.arrProductItems.filter((product) => {
        return product._id !== id;
      }),
      total: Math.round((this.state.arrProductItems.filter((product) => {
        return product._id !== id;
      }).map((str) => {
        return parseInt(str.quantity) * parseFloat(str.price);
      }).reduce((prev, current) => {
        return prev + current
      }, 0)) * 100) / 100,
    });
  };

  getCustomerList = () => {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/customers')
      .then((response) => response.json())
      .then((customers) => {
        this.setState({
          loading: false,
          allCustomers: this.state.allCustomers.concat(customers),
        })
      })
      .catch(() => {
        this.setState({ loading: false });
      })
  };

  getProductList = () => {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((products) => {
        this.setState({
          loading: false,
          allProducts: this.state.allProducts.concat(products),
        })
      })
      .catch(() => {
        this.setState({ loading: false });
      })
  };

  handleCreateInvoice = (discount, customer_id, total, productsTable, arrProductItems) => {
    if (discount && customer_id && productsTable && parseFloat(total) !== 0) {
      fetch(`http://localhost:3000/api/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: customer_id,
          discount: discount,
          total: total,
        })
      })
        .then((response) => response.json())
        .then((invoice) => {
          productsTable.forEach((product) => {
            let quantity = null;
            arrProductItems.forEach((item) => {
              if (item._id === product._id) {
                quantity = parseFloat(item.quantity);
              }
            });
            fetch(`http://localhost:3000/api/invoices/${invoice._id}/items`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                invoice_id: invoice._id,
                product_id: product._id,
                quantity: quantity,
              })
            })
              .then((response) => response.json())
              .catch(() => {
                console.log('Error of saving invoice item')
              })
          })
        })
        .then(() => {
          window.location.href = '/';
        })
        .catch(() => {
          console.log('Error of saving invoice')
        })
    }
  };

  componentDidMount() {
    this.getCustomerList();
    this.getProductList();
  }

  render() {
    const { discount, allCustomers, allProducts, productsTable, total, customer_id, arrProductItems } = this.state;

    return (
      <Fragment>
        <h1 className="header mb-2">Create invoice</h1>
        <Form>
          <FormGroup controlId="formDiscount" className="column">
            <Form.Label className="col-sm-12 font-weight-bold">Discount (%)</Form.Label>
            <Form.Label className="col-sm-3">
              <FormControl onChange={this.handleChange} type="text" placeholder="Discount"
                           name="discount"
                           value={discount}/>
            </Form.Label>
          </FormGroup>
          <FormGroup controlId="formCustomer" className="column">
            <Form.Label className="col-sm-12 font-weight-bold">Customer</Form.Label>
            <Form.Label className="col-sm-5">
              <FormControl as="select" onChange={this.handleChange} name="customer_id">
                <option>Select...</option>
                {allCustomers.map((oneCustomer) =>
                  <option key={oneCustomer._id} value={oneCustomer._id}>{oneCustomer.name}</option>
                )}
              </FormControl>
            </Form.Label>
          </FormGroup>
          <FormGroup controlId="formProduct">
            <Form.Label className="col-sm-8 font-weight-bold">Add product</Form.Label>
            <Button variant="outline-secondary" className="buttonAdd" onClick={this.handleAdd}>Add</Button>
            <Form.Label className="col-sm-4">
              <FormControl as="select" onChange={this.handleChange} name="product_id">
                <option>Select...</option>
                {allProducts.map((oneProduct) =>
                  <option key={oneProduct._id} value={oneProduct._id}>{oneProduct.name}</option>
                )}
              </FormControl>
            </Form.Label>
          </FormGroup>
        </Form>
        <ProductsTableCreate productsTable={productsTable}
                             onItemCount={this.handleItemCount}
                             onItemDelete={this.handleItemDelete}
        />
        <h2>Total: {total}</h2>
        <Button variant="outline-primary" className="buttonSaveInvoice"
                onClick={this.handleCreateInvoice.bind(this, discount, customer_id, total, productsTable, arrProductItems)}>
          Save invoice
        </Button>
      </Fragment>
    );
  }
}

