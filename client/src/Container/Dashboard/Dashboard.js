import React, { useEffect } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Dashboard.module.css';
import Buzz from '../Buzz/Buzz';
import Complaint from '../Complaint/Complaint';
import Resolve from '../Resolve/Resolve';
import TopBar from '../../Components/TopBar/TopBar';
import Banner from '../../Components/Banner/Banner';
import Container from '../../Components/UI/Container/Container';
import SideNav from '../../Components/SideNav/SideNav';
import * as actions from '../../Store/Actions/index.actions';

const Dashboard = (props) => {
  const {user, location, onUserLogout, onFetchUser, authenticated} = props;

  useEffect(() => {
    onFetchUser();
  }, [onFetchUser]);

  const routes = (
    <Switch>
      <Route path="/dashboard/buzz" component={Buzz} />
      <Route path="/dashboard/complaint" component={Complaint} />
      {user.userType==='Admin' && <Route path="/dashboard/resolve" component={Resolve} />}
      <Redirect to="/dashboard/buzz" />
    </Switch>
  );
  
  let bannerText = 'creating buzz around you never been so easy..';
  if(location.pathname === '/dashboard/complaint' || location.pathname === '/dashboard/resolve'){
    bannerText = 'posting your thoughts never been so easy..';
  }


  return (
    <div>
      <TopBar logoutHandler={onUserLogout} authenticated={authenticated}/>
      <Banner>{bannerText}</Banner>
      <Container>
        <div className={classes.Dashboard}>
          <SideNav userType={user.userType}/>
          <div className={classes.DashboardContent}>
            {routes}   
          </div>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.userData.authenticated,
    user: state.userData.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogout: () => dispatch(actions.initUserLogout()),
    onFetchUser: () => dispatch(actions.initFetchUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));