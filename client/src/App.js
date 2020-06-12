import React, { useEffect, Suspense } from "react";
// import Login from "./Container/Login/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Dashboard from "./Container/Dashboard/Dashboard";
import "./App.css";
import { connect } from "react-redux";
import * as action from './Store/Actions/index.actions';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Components/UI/Spinner/Spinner";


const Dashboard = React.lazy(() => {
  return import('./Container/Dashboard/Dashboard')
});

const Login = React.lazy(() => import('./Container/Login/Login'));

function App(props) {
  const {onFetchUser} = props;
  useEffect(() => {
    onFetchUser();
  }, [onFetchUser]);

  let routes = (
    <Switch>
      <Route path="/dashboard" render={() => <Dashboard />} />
      <Redirect to="/dashboard" />
    </Switch>
  );
  
  if(!props.authenticated){
    routes = (
      <Switch>
        <Route path="/" exact render={() => <Login />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer autoClose={3000} transition={Slide}/>
          <Suspense fallback={<Spinner />}>{routes}</Suspense>
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
