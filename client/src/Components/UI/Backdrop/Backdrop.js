import React from 'react';
import classes from './Backdrop.module.css'

const Backdrop = props => (
  props.show ? 
  <div className={classes.Backdrop} onClick={props.clicked}>
    <div className={classes.Center}>{props.children}</div>
  </div> : null
);

export default Backdrop;