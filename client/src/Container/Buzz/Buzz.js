import React, { useEffect } from "react";
import { BsChatQuoteFill } from 'react-icons/bs'
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";
import BuzzItem from './BuzzItem/BuzzItem';

const Buzz = () => {
  useEffect(() => {
    window.document.title = 'Buzz';
  }, []);

  return (
    <div className={classes.Buzz}>
      <NewBuzz />
      <div className={classes.RecentBuzz}>
        <div className={classes.Header}><BsChatQuoteFill className={classes.Icon}/> Recent Buzz</div>
        <BuzzItem />
      </div>
      
    </div>
  );
};

export default Buzz;
