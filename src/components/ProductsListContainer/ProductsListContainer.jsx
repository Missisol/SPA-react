import './ProductsListContainer.css';

import React, { Component, Fragment } from 'react';

import Products from 'components/Products';
import ProductCreateContainer from "components/ProductCreateContainer";

export default class ProductsListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
    };
  }

  loadProducts() {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((products) => {
        this.setState({
          loading: false,
          products: this.state.products.concat(products),
        })
      })
      .catch(() => {
        this.setState({ loading: false });
      })
  };

  handleCreateProduct = (product) => {
    fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
      }),
    })
      .then((response) => response.json())
      .then((product) => {
        this.setState({
          products: this.state.products.concat(product)
        });
      })
      .catch(() => {
        console.log('Error');
      })
  };

  handleEditProduct = (data) => {
    const id = data.productId;

    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: data.productId,
        name: data.name,
        price: data.price,
      }),
    })
      .then((response) => response.json())
      .then((updateProduct) => {
        this.setState({
          products: this.state.products.map((product) => {
            return product._id !== updateProduct._id
              ? product : updateProduct
          }),
        })
      })
      .catch(() => {
        console.log('Error');
      })
  };

  handleDeleteProduct = (data) => {
    const id = data.productId;

    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((delProduct) => {
        this.setState(() => ({
          products: this.state.products.filter((product) => {
            return product._id !== delProduct.id
          }),
        }))
      })
      .catch(() => {
        console.log('Error');
      })
  };

  componentDidMount() {
    this.loadProducts();
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
    })
  }

  render() {
    const { products, loading } = this.state;

    return (
      <Fragment>
        <h1 className="header">Product list</h1>
        <ProductCreateContainer onSend={this.handleCreateProduct}/>
        <Products products={products}
                  onEdit={this.handleEditProduct}
                  onDelete={this.handleDeleteProduct}
        />
        {loading ? 'loading' : ''}
      </Fragment>
    )
  }
}