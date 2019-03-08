import React, { Component, Fragment } from 'react';
import { Modal, Button, FormGroup, Form, FormControl } from 'react-bootstrap';

export default class ProductEditContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      name: this.props.product.name,
      price: this.props.product.price,
      productId: this.props.product._id,
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
    const { show, productId, name, price } = this.state;

    return (
      <Fragment>
        <Button variant="outline-primary" onClick={this.handleShow} data-id={`edit${productId}`}>Edit</Button>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit product # {name}</Modal.Title>
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

