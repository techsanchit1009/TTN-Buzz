import React from "react";
import { NavLink } from "react-router-dom";
import {IoIosArrowForward} from 'react-icons/io'
import classes from "./NavItem.module.css";

const NavItem = (props) => (
  <div className={classes.NavItem}>
    <NavLink
      to={props.link}
      activeClassName={classes.Active}
      exact={props.exact}>{props.children} <IoIosArrowForward /></NavLink>
    </div>
    );

export default NavItem;