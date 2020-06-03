import React, { useEffect } from "react";
import Login from "./Container/Login/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Container/Dashboard/Dashboard";
import "./App.css";
import { connect } from "react-redux";
import * as action from './Store/Actions/index.actions';
import SetUser from "./Components/SetUser/SetUser";

function App(props) {

  useEffect(() => {
    props.onFetchUser();
  }, [props.onFetchUser, props]);

  let routes = (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Redirect to="/dashboard" />
    </Switch>
  );
  
  if(!props.authenticated){
    routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/auth/set-user" component={SetUser} />
        <Redirect to="/" />
      </Switch>
    );
  }
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

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(action.initFetchUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
