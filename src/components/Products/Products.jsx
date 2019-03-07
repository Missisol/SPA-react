import './Products.css';

import React, { Component, Fragment } from 'react';
import Table from 'react-bootstrap/Table';

import ProductEditContainer from 'components/ProductEditContainer';
import ProductDeleteContainer from 'components/ProductDeleteContainer';

export default class Products extends Component {
  render() {
    const { products, onEdit, onDelete } = this.props;

    return (
      <Fragment>
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {products.map((product, index) =>
            <tr key={product._id}>
              <td>{index +1} </td>
              <td>{product.name} </td>
              <td>{product.price}</td>
              <td className="buttonCell"><ProductEditContainer
                onSend={onEdit}
                product={product}
              /></td>
              <td className="buttonCell"><ProductDeleteContainer
                onDel={onDelete}
                product={product}
              /></td>
            </tr>
          )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}