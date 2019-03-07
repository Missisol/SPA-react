import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ProductDeleteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      name: this.props.product.name,
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

  handleSubmit = () => {
    const { onDel } = this.props;

    if (typeof onDel === 'function') {
      onDel(this.state);
    }

    this.setState({
      show: false,
    });
  };

  render() {
    const { show, productId, name } = this.state;

    return (
      <Fragment>
        <Button variant="outline-primary" onClick={this.handleShow} data-id={`edit${productId}`}>Delete</Button>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>Confirm deleting product # {name}</Modal.Title>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Delete</Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

