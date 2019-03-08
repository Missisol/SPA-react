import React, { Component, Fragment } from 'react';
import { Modal, Button, FormGroup, Form, FormControl } from "react-bootstrap";

export default class CustomerEditContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      name: this.props.customer.name,
      address: this.props.customer.address,
      phone: this.props.customer.phone,
      customerId: this.props.customer._id,
    };
  }

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const { onSend } = this.props;

    if (typeof onSend === 'function') {
      onSend(this.state);
    }

    this.setState({
      show: false,
    });
  };

  render() {
    let { show, customerId, name, address, phone } = this.state;

    return (
      <Fragment>
        <div>
          <Button variant="outline-primary" onClick={this.handleShow} data-id={`edit${customerId}`}>Edit</Button>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit customer # {name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="formHorizontalName">
                <Form.Label sm={2}>Name</Form.Label>
                <Form.Label sm={10}>
                  <FormControl onChange={this.handleChange} type="text" placeholder="Name" name="name"
                               value={name}/>
                </Form.Label>
              </FormGroup>
              <FormGroup controlId="formHorizontalAddress">
                <Form.Label sm={2}>Address</Form.Label>
                <Form.Label sm={10}>
                  <FormControl onChange={this.handleChange} type="text" placeholder="Address"
                               name="address" value={address}/>
                </Form.Label>
              </FormGroup>
              <FormGroup controlId="formHorizontalPhone">
                <Form.Label sm={2}>Phone</Form.Label>
                <Form.Label sm={10}>
                  <FormControl onChange={this.handleChange} type="text" placeholder="Phone"
                               name="phone" value={phone}/>
                </Form.Label>
              </FormGroup>
              <FormGroup>
                <Form.Label sm={10}>
                  <Button onClick={this.handleSubmit}>Save</Button>
                </Form.Label>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

