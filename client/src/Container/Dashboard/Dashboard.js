import React, { useEffect, useState, Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Dashboard.module.css";
// import Buzz from "../Buzz/Buzz";
// import Complaint from "../Complaint/Complaint";
// import Resolve from "../Resolve/Resolve";
import TopBar from "../../Components/TopBar/TopBar";
import Banner from "../../Components/Banner/Banner";
import Container from "../../Components/UI/Container/Container";
import SideNav from "../../Components/SideNav/SideNav";
import SideDrawer from "../../Components/UI/SideDrawer/SideDrawer";
import About from '../../Components/About/About';
import Help from '../../Components/Help/Help';
import * as actions from "../../Store/Actions/index.actions";
import Spinner from "../../Components/UI/Spinner/Spinner";

const Buzz = React.lazy(() => import('../Buzz/Buzz'));
const Complaint = React.lazy(() => import('../Complaint/Complaint'));
const Resolve = React.lazy(() => import('../Resolve/Resolve'));

const Dashboard = (props) => {
  const { user, location, onUserLogout, onFetchUser, authenticated } = props;

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  useEffect(() => {
    onFetchUser();
  }, [onFetchUser]);

  const showSideDrawerHandler = () => {
    setShowSideDrawer(true);
  };

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const routes = (
    <Switch>
      <Route path="/dashboard/buzz" render={() => <Buzz />} />
      <Route path="/dashboard/complaint" render={() => <Complaint />} />
      {user.userType === "Admin" && (
        <Route path="/dashboard/resolve" render={() => <Resolve />} />
      )}
      <Route path="/dashboard/about" component={About} />
      <Route path="/dashboard/help" component={Help} />
      <Redirect to="/dashboard/buzz" />
    </Switch>
  );

  let bannerText = "creating buzz around you never been so easy..";
  if (
    location.pathname === "/dashboard/complaint" ||
    location.pathname === "/dashboard/resolve"
  ) {
    bannerText = "posting your thoughts never been so easy..";
  }

  return (
    <div>
      <TopBar
        logoutHandler={onUserLogout}
        authenticated={authenticated}
        userData={user}
        show={showSideDrawerHandler}
      />
      <SideDrawer open={showSideDrawer} userType={user.userType} closed={closeSideDrawerHandler} />
      <Banner>{bannerText}</Banner>
      <Container>
        <div className={classes.Dashboard}>
          <SideNav userType={user.userType} />
          <div className={classes.DashboardContent}>
            <Suspense fallback={<Spinner />}>{routes}</Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.userData.authenticated,
    user: state.userData.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogout: () => dispatch(actions.initUserLogout()),
    onFetchUser: () => dispatch(actions.initFetchUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
