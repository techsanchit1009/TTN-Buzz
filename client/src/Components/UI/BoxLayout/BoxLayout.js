import React from "react";
import { FaFilter } from 'react-icons/fa'
import classes from "./BoxLayout.module.css";

const BoxLayout = (props) => {
  const { icon, heading, children, deptFilterHandler } = props;

  let filterBy = (
    <div className={classes.SelectWrapper}>
      <FaFilter className={classes.FilterIcon} />
      <select
        className={classes.FilterBy}
        onChange={(e) => deptFilterHandler(e.target.value)}
        defaultValue={"Filter By"}
      >
        <option disabled hidden>Filter By </option>
        <option value="IT">IT</option>
        <option value="Admin">Admin</option>
        <option value="Infra">Infra</option>
        <option value="HR">HR</option>
      </select>
    </div>
  );

  return (
    <div className={classes.Box}>
      <div className={classes.Heading}>
        <div>
          <span className={classes.Icon}>{icon}</span>
          {heading}
        </div>
        {deptFilterHandler && filterBy}
      </div>
      {children}
    </div>
  );
};

export default BoxLayout;
