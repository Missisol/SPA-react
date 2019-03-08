import React, { Component, Fragment } from 'react';

import Customers from 'components/Customers';
import CustomerCreateContainer from "components/CustomerCreateContainer";

export default class CustomersListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      loading: true,
    };
  }

  loadCustomers = () => {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/customers')
      .then((response) => response.json())
      .then((customers) => {
        this.setState({
          loading: false,
          customers: this.state.customers.concat(customers),
        })
      })
      .catch(() => {
        this.setState({ loading: false });
      })
  };

  handleCreateCustomer = (customer) => {
    console.log(customer);
    fetch('http://localhost:3000/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
      }),
    })
      .then((response) => response.json())
      .then((customer) => {
        this.setState({
          customers: this.state.customers.concat(customer)
        });
      })
      .catch(() => {
        console.log('Error');
      })
  };

  handleEditCustomer = (data) => {
    const id = data.customerId;

    fetch(`http://localhost:3000/api/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: data.customerId,
        name: data.name,
        address: data.address,
        phone: data.phone,
      }),
    })
      .then((response) => response.json())
      .then((updateCustomer) => {
        this.setState({
          customers: this.state.customers.map((customer) => {
            return customer._id !== updateCustomer._id
              ? customer : updateCustomer
          }),
        })
      })
      .catch(() => {
        console.log('Error');
      })
  };

  handleDeleteCustomer = (data) => {
    const id = data.customerId;

    fetch(`http://localhost:3000/api/customers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((delCustomer) => {
        this.setState(() => ({
          customers: this.state.customers.filter((customer) => {
            return customer._id !== delCustomer.id
          }),
        }))
      })
      .catch(() => {
        console.log('Error');
      })
  };

  componentDidMount() {
    this.loadCustomers();
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
    })
  }

  render() {
    const { customers, loading } = this.state;

    return (
      <Fragment>
        <h1 className="header">Customer list</h1>
        <CustomerCreateContainer onSend={this.handleCreateCustomer}/>
        <Customers customers={customers}
                   onEdit={this.handleEditCustomer}
                   onDelete={this.handleDeleteCustomer}
        />
        {loading ? 'loading' : ''}
      </Fragment>
    )
  }
}