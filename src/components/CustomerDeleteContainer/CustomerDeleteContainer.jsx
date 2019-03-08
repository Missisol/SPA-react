import React, { Component, Fragment } from 'react';
import { Modal, Button } from "react-bootstrap";

export default class CustomerDeleteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      name: this.props.customer.name,
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
    let { show, customerId, name } = this.state;

    return (
      <Fragment>
        <div>
          <Button variant="outline-primary" onClick={this.handleShow} data-id={`edit${customerId}`}>Delete</Button>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>Confirm deleting customer # {name}</Modal.Title>
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

