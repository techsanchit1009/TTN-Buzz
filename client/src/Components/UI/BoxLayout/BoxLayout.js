import React from 'react';
import classes from './BoxLayout.module.css';

const BoxLayout = (props) => {
  return (
    <div className={classes.Box}>
      <div className={classes.Heading}>
        <span className={classes.Icon}>{props.icon}</span>
        {props.heading}
      </div>
      {props.children}
    </div>
  )
}

export default BoxLayout;