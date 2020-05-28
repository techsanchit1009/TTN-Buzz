import React, { useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Dashboard.module.css';
import Buzz from '../Buzz/Buzz';
import Complaint from '../Complaint/Complaint';
import TopBar from '../../Components/TopBar/TopBar';
import Banner from '../../Components/Banner/Banner';
import Container from '../../Components/UI/Container/Container';
import SideNav from '../../Components/SideNav/SideNav';
import * as action from '../../Store/Actions/index.actions';

const Dashboard = (props) => {
  const {onFetchUser, userId, onFetchUserComplaints, onFetchBuzz} = props;
  useEffect(() => {
    onFetchUser();
    onFetchBuzz();
    if(userId){
      onFetchUserComplaints(userId)
    }
  }, [onFetchUserComplaints, userId, onFetchUser, onFetchBuzz]);

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
  // console.log(state.buzzData);
  return {
    authenticated: state.userData.authenticated,
    userId: state.userData.user._id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(action.initFetchUser()),
    onFetchUserComplaints: (userId) => dispatch(action.initFetchUserComplaints(userId)),
    onFetchBuzz: () => dispatch(action.initFetchBuzz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);