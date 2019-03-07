import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from 'components/Menu';
import menuItems from './menuItems';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Menu items={menuItems}/>
        <Switch>
          {routes.map((rout, idx) => <Route key={idx} {...rout} />)}
        </Switch>
      </div>
    )
  }
}

ReactDom.render(
  <BrowserRouter><App/></BrowserRouter>,
  document.getElementById('root')
);