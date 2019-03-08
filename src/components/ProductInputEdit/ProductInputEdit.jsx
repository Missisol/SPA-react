import React, { Component } from 'react';

export default class ProductInputEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.product.quantity,
    };
  }

  handleCount = (e) => {
    this.props.onItemCount({
      _id: e.target.dataset.id,
      quantity: e.target.value,
      price: e.target.dataset.price,
    });
  };

  render() {
    const { product } = this.props;

    return (
      <form>
        <input type="number" name={`counter${product._id}`} data-id={product._id}
               data-price={product.price} min="1"
               defaultValue={product.quantity}
               onChange={this.handleCount}
        />
      </form>
    )
  }
}