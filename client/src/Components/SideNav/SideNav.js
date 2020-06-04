import React from "react";
import classes from "./SideNav.module.css";
import NavItem from "./NavItem/NavItem";

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
          <a href="/">About</a>
          <a href="/">Help</a>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
