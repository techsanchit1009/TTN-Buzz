import React from "react";
import classes from "./SideDrawer.module.css";
import Backdrop from '../Backdrop/Backdrop';
import TTNLogo from '../../../assets/ttn-logo.jpg'
import { NavLink } from 'react-router-dom';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <nav className={classes.SideDrawerNav}>
          <NavLink to="/dashboard/buzz">
            <img src={TTNLogo} alt="TTN_Logo" height="75rem"/>
          </NavLink>
          <NavLink to="/dashboard/buzz" activeClassName={classes.Active}>Buzz</NavLink>
          <NavLink to="/dashboard/complaint" activeClassName={classes.Active}>Complaint</NavLink>
          {props.userType === 'Admin' && <NavLink to="/dashboard/resolve" activeClassName={classes.Active}>Resolve</NavLink> }
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
