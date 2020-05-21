import React from "react";
import Login from "./Login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Buzz from "./Container/Buzz/Buzz";

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/buzz" component={Buzz} />
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
