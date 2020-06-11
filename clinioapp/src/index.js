import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// import Login from "views/Login.js";
import Home from "views/home.js";
import PainelDentista from "views/painelDentista.js";



ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
    {/* <Route path="/login" render={props => <Login {...props} />} /> */}
    <Route path="/home" render={props => <Home {...props} />} />
    <Route path="/paineldentista" render={props => <PainelDentista {...props} />} />
    <Redirect to="/paineldentista" />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);