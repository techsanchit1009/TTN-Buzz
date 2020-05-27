import React, { useEffect, useState } from "react";
import Login from "./Container/Login/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Container/Dashboard/Dashboard";
import "./App.css";
import { connect } from "react-redux";
import axios from "axios";

function App(props) {
  // const [isAuth, setIsAuth ] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:5000', {withCredentials: true})
  //     .then(resp => setIsAuth(resp.data.authenticated));
  //   console.log(isAuth);

  // }, [isAuth]);

  let routes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
  // if(props.authenticated){
  //   routes = (
  //     <Switch>
  //       {/* <Redirect to="/" /> */}
  //     </Switch>
  //   );
  // }
  return (
    <BrowserRouter>
      <div className="App">
        {routes}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.userData.authenticated
  }
}

export default connect(mapStateToProps)(App);
