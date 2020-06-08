import React, { useEffect } from "react";
import Login from "./Container/Login/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Container/Dashboard/Dashboard";
import "./App.css";
import { connect } from "react-redux";
import * as action from './Store/Actions/index.actions';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App(props) {
  const {onFetchUser} = props;
  useEffect(() => {
    onFetchUser();
  }, [onFetchUser]);

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
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer autoClose={3000} transition={Slide}/>
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
