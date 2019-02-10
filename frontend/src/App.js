import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./middleware/middleware-route";
import Loadable from 'react-loadable'
import './App.css';

import LoginAdmin from "../src/features/auth-admin/Login/index"
import RegistAdmin from "../src/features/auth-admin/Register/index"
import ContainerAdmin from './containers/dashboard-layout/index';
import Home from './containers/landing-layout/index';


function Loading() {
  return <div>Loading...</div>;
}

const OrderPembeli = Loadable({
  loader: () => import('./features/dash-order/index'),
  loading: Loading,
});

const Menu = Loadable({
  loader: () => import('./features/dash-menu/index'),
  loading: Loading,
});


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginAdmin} />
          <Route exact path="/register" component={RegistAdmin} />
          <PrivateRoute exact path="/Menu" name='Menu' component={Menu && ContainerAdmin} ></PrivateRoute>
          <PrivateRoute exact path="/Orderpembeli" name='Orderan' component={OrderPembeli && ContainerAdmin} ></PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
