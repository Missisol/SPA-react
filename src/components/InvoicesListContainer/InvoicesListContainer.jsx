import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import Invoices from 'components/Invoices';

export default class InvoicesListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      loading: true,
    };
  }

  loadInvoices = () => {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/invoices')
      .then((response) => response.json())
      .then((invoices) => {
        invoices.forEach((invoice) => {
          const customerId = invoice.customer_id;
          fetch(`http://localhost:3000/api/customers/${customerId}`)
            .then((response) => response.json())
            .then((customer) => {
              invoice.customer_name = customer.name;
              this.setState({
                invoices: this.state.invoices.concat(invoice),
              })
            })
            .catch(() => {
              console.log('Error customer')
            })
        });

        this.setState((prevState) => ({
          ...prevState,
          loading: false,
          invoices: prevState.invoices,
        }));
      })
      .catch(() => {
        this.setState({ loading: false });
      })
  };

  handleDeleteInvoice = (data) => {
    const invoiceId = data.invoiceId;

    fetch(`http://localhost:3000/api/invoices/${invoiceId}/items`)
      .then((response) => response.json())
      .then((items) => {
        items.forEach((item) => {
          fetch(`http://localhost:3000/api/invoices/${invoiceId}/items/${item.id}`, {
            method: 'DELETE',
          })
            .then((response) => response.json())
            .catch(() => {
              console.log('Error of deleting item');
            })
        })
      })
      .catch(() => {
        console.log('Error of deleting item');
      });

    fetch(`http://localhost:3000/api/invoices/${invoiceId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((delInvoice) => {
        this.setState(() => ({
          invoices: this.state.invoices.filter((invoice) => {
            return invoice.id !== delInvoice.id
          }),
        }))
      })
      .catch(() => {
        console.log('Error');
      })
  };

  componentDidMount() {
    this.loadInvoices();
  }

  // componentWillUnmount() {
  //   this.setState({
  //     loading: false,
  //   })
  // }

  render() {
    const { invoices, loading } = this.state;

    return (
      <Fragment>
        <h1 className="header">Invoice list</h1>
        <div className="headWrapper d-sm-flex">
          <Button variant="outline-primary"><Link to={`invoice/create`}>Create</Link></Button>
        </div>
        <Invoices invoices={invoices}
                  onDelete={this.handleDeleteInvoice}
        />
        {loading ? 'loading' : ''}
      </Fragment>
    )
  }
}