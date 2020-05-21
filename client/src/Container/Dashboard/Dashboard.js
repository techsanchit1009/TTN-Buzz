import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Buzz from '../Buzz/Buzz';
import TopBar from '../../Components/TopBar/TopBar';
import Banner from '../../Components/Banner/Banner';
import classes from './Dashboard.module.css';
import Container from '../../Components/UI/Container/Container';

const Dashboard = () => {
  const routes = (
    <Switch>
      <Route path="/dashboard/buzz" exact component={Buzz} />
      <Route path="/dashboard/complaint" exact component={Buzz} />
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
          <div style={{flex: 1}}>SideDrawer</div> {/* flex: 1*/}   
          <div className={classes.DashboardContent}>
            {routes}    {/*flex: 3*/}
          </div>
        </div>
      </Container>
    </BrowserRouter>
  )
}
export default Dashboard;