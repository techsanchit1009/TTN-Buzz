import React from "react";
import Login from "./Container/Login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Container/Dashboard/Dashboard";
import "./App.css";

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
  return (
    <BrowserRouter>
      <div className="App">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
