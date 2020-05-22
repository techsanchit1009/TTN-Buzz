import React from "react";
import classes from "./SideNav.module.css";
import NavItem from "./NavItem/NavItem";

const SideNav = () => {
  return (
    <div className={classes.SideNav}>
      <NavItem link="/dashboard/buzz">Buzz </NavItem>   
      <NavItem link="/dashboard/complaint">Complaints</NavItem>
      <NavItem link="/dashboard/resolve">Resolve</NavItem>
    </div>
  );
};

export default SideNav;
