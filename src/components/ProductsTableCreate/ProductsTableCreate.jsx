import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';

import ProductInputCreate from "components/ProductInputCreate";

export default class ProductsTableCreate extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.onDelete = this.onDelete.bind(this);
  // }

  onDelete = (id) => {
    this.props.onItemDelete(id);
  };

  render() {
    const { productsTable } = this.props;

    return (
      <Fragment>
        <Table responsive>
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
          </thead>
          <tbody>
          {productsTable.map((product) =>
            <tr key={product._id}>
              <td>{product.name} </td>
              <td>{product.price}</td>
              <td>
                <ProductInputCreate product={product}
                                    onItemCount={this.props.onItemCount}
                />
              </td>
              <td>
                <button type="button" className="close" onClick={this.onDelete.bind(this, product._id)}>x</button>
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}