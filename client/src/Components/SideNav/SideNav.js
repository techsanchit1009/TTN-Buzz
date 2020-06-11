import React from "react";
import classes from "./SideNav.module.css";
import NavItem from "./NavItem/NavItem";
import { NavLink } from "react-router-dom";

const SideNav = (props) => {
  return (
    <aside>
      <div className={classes.SideNav}>
        <NavItem link="/dashboard/buzz">Buzz </NavItem>
        <NavItem link="/dashboard/complaint">Complaints</NavItem>
        {props.userType === 'Admin' && <NavItem link="/dashboard/resolve">Resolve</NavItem> }
      </div>
      <div className={classes.SideNavFooter}>
        <div style={{color: '#ccc'}}>&copy; To The New</div>
        <div className={classes.FooterButton}>
          <NavLink to="/dashboard/about" activeClassName={classes.ActiveSecondary}>About</NavLink>
          <NavLink to="/dashboard/help" activeClassName={classes.ActiveSecondary}>Help</NavLink>

        </div>
      </div>
    </aside>
  );
};

export default SideNav;
