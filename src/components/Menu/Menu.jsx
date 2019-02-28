import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Menu extends Component {
  render() {
    const { items } = this.props;

    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#/">Invoice App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {items.map((item, idx) =>
                <Link key={idx} to={item.href} className="nav-link">{item.title}</Link>)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    )
  }
}

