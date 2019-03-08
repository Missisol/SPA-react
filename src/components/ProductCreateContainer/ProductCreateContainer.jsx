import React, { Component, Fragment } from 'react';
import { Modal, Button, FormGroup, Form, FormControl } from "react-bootstrap";

export default class ProductCreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      name: '',
      price: '',
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
      price: '',
      show: false,
    });

    if (typeof onSend === 'function') {
      onSend(this.state);
    }
  };

  render() {
    let { show, name, price } = this.state;

    return (
      <Fragment>
        <div className="headWrapper d-sm-flex">
          <Button variant="outline-primary" onClick={this.handleShow}>Create</Button>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Creat product</Modal.Title>
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
              <FormGroup controlId="formHorizontalPrice">
                <Form.Label className="col-sm-2">Price</Form.Label>
                <Form.Label className="col-sm-12">
                  <FormControl onChange={this.handleChange} type="text" placeholder="Price"
                               name="price" value={price}/>
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

