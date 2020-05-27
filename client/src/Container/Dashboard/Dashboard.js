import React, { useEffect } from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Dashboard.module.css';
import Buzz from '../Buzz/Buzz';
import Complaint from '../Complaint/Complaint';
import TopBar from '../../Components/TopBar/TopBar';
import Banner from '../../Components/Banner/Banner';
import Container from '../../Components/UI/Container/Container';
import SideNav from '../../Components/SideNav/SideNav';
import * as userAction from '../../Store/Actions/index.actions';

const Dashboard = (props) => {

  useEffect(() => {
    props.onFetchUser();
  }, [props]);

  const routes = (
    <Switch>
      <Route path="/dashboard/buzz" component={Buzz} />
      <Route path="/dashboard/complaint" component={Complaint} />
      <Route path="/dashboard/resolve" component={Buzz} />
      <Redirect to="/dashboard/buzz" />
    </Switch>
  );
  const bannerText = 'creating buzz around you never been so easy..';
  return (
    <div>
      <TopBar />
      <Banner>{bannerText}</Banner>
      <Container>
        <div className={classes.Dashboard}>
          <SideNav />
          <div className={classes.DashboardContent}>
            {routes}   
          </div>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state.userData);
  return {
    authenticated: state.userData.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(userAction.initFetchUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);