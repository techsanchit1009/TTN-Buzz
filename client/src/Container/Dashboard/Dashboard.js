import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import classes from './Dashboard.module.css';
import Buzz from '../Buzz/Buzz';
import Complaint from '../Complaint/Complaint';
import TopBar from '../../Components/TopBar/TopBar';
import Banner from '../../Components/Banner/Banner';
import Container from '../../Components/UI/Container/Container';
import SideNav from '../../Components/SideNav/SideNav';

const Dashboard = () => {
  const routes = (
    <Switch>
      <Route path="/dashboard/buzz" exact component={Buzz} />
      <Route path="/dashboard/complaint" exact component={Complaint} />
      <Route path="/dashboard/resolve" exact component={Buzz} />
      <Redirect to="/dashboard/buzz" />
    </Switch>
  );
  const bannerText = 'creating buzz around you never been so easy..';
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
export default Dashboard;