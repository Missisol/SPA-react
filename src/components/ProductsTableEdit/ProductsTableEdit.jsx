import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';

import ProductInputEdit from "components/ProductInputEdit";

export default class ProductsTableEdit extends Component {

  onDelete = (e) => {
    this.props.onItemDelete({
      id: e.target.dataset.id,
    });
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
                <ProductInputEdit product={product}
                                  onItemCount={this.props.onItemCount}
                />
              </td>
              <td>
                <button type="button" className="close" data-id={product._id}
                        onClick={this.onDelete}>
                  x
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}