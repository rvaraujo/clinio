import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import store from './store/index';
import Atendimento from './views/Atendimento';

import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
    <Route path="/Atendimento" render={props => <Atendimento {...props} />} />
    <Redirect to="/Atendimento" />
    </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);