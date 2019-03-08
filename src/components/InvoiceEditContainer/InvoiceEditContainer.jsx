import React, { Component, Fragment } from 'react';
import { Button, FormGroup, Form, FormControl } from 'react-bootstrap';

import ProductsTableEdit from "components/ProductsTableEdit";

export default class InvoiceEditContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: {},
      allCustomers: [],
      customer: {},
      allProducts: [],
      products: [],
      loading: false,
      discount: '',
      customer_id: '',
      product_id: '',
      productsTable: [],
      total: 0,
      arrProductItems: [],
    };
  }

  getData = (id) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/invoices/${id}`)
      .then((response) => response.json())
      .then((invoice) => {
        this.setState({
          loading: false,
          invoice,
          total: invoice.total,
          discount: invoice.discount,
        });
        this.getCustomer(invoice.customer_id);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
    fetch(`http://localhost:3000/api/invoices/${id}/items`)
      .then((res) => res.json())
      .then((items) => {
        items.forEach((item) => {
          this.setState({ loading: true });
          fetch(`http://localhost:3000/api/products/${item.product_id}`)
            .then((response) => response.json())
            .then((product) => {
              product.quantity = item.quantity;
              this.setState({
                loading: false,
                productsTable: this.state.productsTable.concat(product),
              })
            })
            .catch(() => {
              this.setState({ loading: false });
            })
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAdd = () => {
    const prod = this.state.allProducts.filter((product) => {
      return product._id === this.state.product_id;
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
      productsTable: this.state.productsTable.map((productItem) => {
        if (productItem._id === item._id) {
          productItem.quantity = item.quantity;
          return productItem;
        } else {
          return productItem;
        }
      }),
      total: Math.round((this.state.productsTable.map((productItem) => {
        if (productItem._id === item._id) {
          productItem.quantity = parseInt(item.quantity);
          return productItem;
        } else {
          return productItem;
        }
      })
        .map((str) => {
          return parseInt(str.quantity) * parseFloat(str.price);
        }).reduce((prev, current) => {
          return prev + current
        }, 0)) * 100) / 100,

    });
  };

  handleItemDelete = (id) => {
    this.setState({
      productsTable: this.state.productsTable.filter((product) => {
        return product._id !== id;
      }),
      arrProductItems: this.state.arrProductItems.filter((product) => {
        return product._id !== id;
      }),
      total: Math.round((this.state.productsTable.filter((product) => {
        return product._id !== id;
      }).map((str) => {
        return parseInt(str.quantity) * parseFloat(str.price);
      }).reduce((prev, current) => {
        return prev + current
      }, 0)) * 100) / 100,
    });
  };


  getCustomer = (id) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/customers/${id}`)
      .then((response) => response.json())
      .then((customer) => {
        this.setState({
          loading: false,
          customer,
        })
      })
      .catch(() => {
        this.setState({ loading: false });
      })
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

  handleEditInvoice = () => {
    const { invoice, discount, total } = this.state;
    let arrProducts = this.state.productsTable;
    let arrSaveItems = [];
    const invoiceId = invoice._id;

    if (discount && this.state.productsTable.length !== 0 && parseFloat(total) !== 0) {
      fetch(`http://localhost:3000/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: invoice.customer_id,
          discount: discount,
          total: total,
        })
      })
        .then((response) => response.json())
        .then((invoice) => {
          fetch(`http://localhost:3000/api/invoices/${invoiceId}/items`)
            .then((response) => response.json())
            .then((result) => {
              let arrDeleteItems = result;
              arrProducts.forEach((product, index) => {
                result.forEach((item, idx) => {
                  if (product._id === item.product_id && product.quantity !== item.quantity) {
                    fetch(`http://localhost:3000/api/invoices/${invoiceId}/items/${item._id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        quantity: product.quantity,
                      })
                    })
                      .then((response) => response.json())
                      .catch(() => {
                        console.log('Error of updating invoice item');
                      });
                    delete arrProducts[index];
                    delete arrDeleteItems[idx];
                  } else if (product._id === item.product_id && product.quantity === item.quantity) {
                    delete arrProducts[index];
                    delete arrDeleteItems[idx];
                  }
                })
              });
              arrSaveItems = arrProducts.filter(obj => '_id' in obj === true);
              arrSaveItems.forEach((product) => {
                fetch(`http://localhost:3000/api/invoices/${invoiceId}/items`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    product_id: product._id,
                    quantity: product.quantity,
                  })
                })
                  .then((response) => response.json())
                  .catch(() => {
                    console.log('Error of saving invoice item');
                  })
              });
              arrDeleteItems = arrDeleteItems.filter(obj => '_id' in obj === true);
              arrDeleteItems.forEach((item) => {
                fetch(`http://localhost:3000/api/invoices/${invoiceId}/items/${item._id}`, {
                  method: 'DELETE',
                })
                  .then((response) => response.json())
                  .catch(() => {
                    console.log('Error of deleting item');
                  })
              })
            });
        })
        .then(() => {
          window.location.href = '/';
        })
        .catch(() => {
          console.log('Error of saving invoice')
        });
    }
  };

  componentDidMount() {
    const { match } = this.props;
    this.getData(match.params.id);
    this.getProductList();
    this.getCustomerList();
  }

  render() {
    const { discount, allCustomers, allProducts, productsTable, total } = this.state;

    return (
      <Fragment>
        <h1 className="header mb-2">Edit invoice</h1>
        <Form>
          <FormGroup controlId="formDiscount" className="column">
            <Form.Label className="col-sm-12 font-weight-bold">Discount (%)</Form.Label>
            <Form.Label className="col-sm-3">
              <FormControl onChange={this.handleChange} type="text" placeholder="Discount"
                           name="discount" value={discount}
              />
            </Form.Label>
          </FormGroup>
          <FormGroup controlId="formCustomer" className="column">
            <Form.Label className="col-sm-12 font-weight-bold">Customer</Form.Label>
            <Form.Label className="col-sm-5">
              <FormControl as="select" onChange={this.handleChange} name="customer_id"
                           value={this.state.invoice.customer_id}>
                {allCustomers.map((oneCustomer) =>
                  <option key={oneCustomer._id} value={oneCustomer._id}>
                    {oneCustomer.name}
                  </option>
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
        <ProductsTableEdit productsTable={productsTable}
                           onItemCount={this.handleItemCount}
                           onItemDelete={this.handleItemDelete}
        />
        <h2>Total: {total}</h2>
        <Button variant="outline-primary" className="buttonSaveInvoice"
                onClick={this.handleEditInvoice}>
          Save changes
        </Button>
      </Fragment>
    );
  }
}

