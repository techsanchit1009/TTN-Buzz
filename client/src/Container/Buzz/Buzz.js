import React from "react";
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";

const Buzz = () => {
  return (
    <div className={classes.Buzz}>
      <NewBuzz />
      <div className={classes.RecentBuzz}>RecentBuzz</div>
    </div>
  );
};

export default Buzz;
