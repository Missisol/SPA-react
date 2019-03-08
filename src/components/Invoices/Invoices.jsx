import React, { Component, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import InvoiceDeleteContainer from 'components/InvoiceDeleteContainer';

export default class Invoices extends Component {
  render() {
    const { invoices, onDelete } = this.props;

    return (
      <Fragment>
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>customer</th>
            <th>discount</th>
            <th>total</th>
          </tr>
          </thead>
          <tbody>
          {invoices.map((invoice, index) =>
            <tr key={invoice._id}>
              <td>{index + 1}</td>
              <td>{invoice.customer_name} </td>
              <td>{invoice.discount}</td>
              <td>{invoice.total}</td>
              <td><Link to={`invoices/${invoice._id}`}>edit</Link></td>
              <td><InvoiceDeleteContainer
                onDel={onDelete}
                invoiceId={invoice.id}
              /></td>
            </tr>
          )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}