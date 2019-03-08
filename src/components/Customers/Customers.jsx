import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import CustomerEditContainer from 'components/CustomerEditContainer';
import CustomerDeleteContainer from 'components/CustomerDeleteContainer';

export default class Customers extends Component {

  render() {
    const { customers, onEdit, onDelete } = this.props;

    return (
      <Fragment>
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
          </thead>
          <tbody>
          {customers.map((customer, index) =>
            <tr key={customer._id}>
              <td>{index + 1} </td>
              <td>{customer.name} </td>
              <td>{customer.address}</td>
              <td>{customer.phone}</td>
              <td className="buttonCell"><CustomerEditContainer
                onSend={onEdit}
                customer={customer}
              /></td>
              <td className="buttonCell"><CustomerDeleteContainer
                onDel={onDelete}
                customer={customer}
              /></td>
            </tr>
          )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}