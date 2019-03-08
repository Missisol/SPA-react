import React, { Component, Fragment } from 'react';
import { Modal, Button, FormGroup, Form, FormControl } from "react-bootstrap";

export default class CustomerCreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      name: '',
      address: '',
      phone: '',
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

    this.setState({
      name: '',
      address: '',
      phone: '',
      show: false,
    });

    if (typeof onSend === 'function') {
      onSend(this.state);
    }
  };

  render() {
    let { show, name, address, phone } = this.state;

    return (
      <Fragment>
        <div className="headWrapper d-sm-flex">
          <Button variant="outline-primary" className="buttonCreate" onClick={this.handleShow}>Create</Button>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Creat customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="formHorizontalName">
                <Form.Label className="col-sm-2">Name</Form.Label>
                <Form.Label className="col-sm-12">
                  <FormControl onChange={this.handleChange} type="text" placeholder="Name" name="name"
                               value={name}/>
                </Form.Label>
              </FormGroup>
              <FormGroup controlId="formHorizontalAddress">
                <Form.Label className="col-sm-2">Address</Form.Label>
                <Form.Label className="col-sm-12">
                  <FormControl onChange={this.handleChange} type="text" placeholder="Address"
                               name="address" value={address}/>
                </Form.Label>
              </FormGroup>
              <FormGroup controlId="formHorizontalPhone">
                <Form.Label className="col-sm-2">Phone</Form.Label>
                <Form.Label className="col-sm-12">
                  <FormControl onChange={this.handleChange} type="text" placeholder="Phone"
                               name="phone" value={phone}/>
                </Form.Label>
              </FormGroup>
              <FormGroup>
                <Form.Label className="col-sm-2">
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

