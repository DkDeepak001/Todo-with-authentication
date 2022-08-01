import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './component/login/login';
import Register from './component/register/register';
import Home from './component/home/home';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
       </Switch>
    </Router>
  )
}

export default App