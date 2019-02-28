import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from 'components/Menu';
import menuItems from './menuItems';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Menu items={menuItems}/>
      </div>
    )
  }
}

ReactDom.render(
  <BrowserRouter><App/></BrowserRouter>,
  document.getElementById('root')
);