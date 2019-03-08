import React, { Component, Fragment } from 'react';
import { Modal, Button } from "react-bootstrap";

export default class CustomerDeleteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      invoiceId: this.props.invoiceId,
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
    let { show, invoiceId } = this.state;

    return (
      <Fragment>
        <div>
          <button type="button" className="close" onClick={this.handleShow} data-id={`delete${invoiceId}`}>
            <span>x</span></button>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>Confirm deleting invoice # {invoiceId}</Modal.Title>
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

