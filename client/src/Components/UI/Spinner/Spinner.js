import React from 'react';
import classes from './Spinner.module.css'
import Backdrop from '../Backdrop/Backdrop';

const Spinner = () => (
  <React.Fragment>
    <Backdrop show="true" >
        <div className={classes.Loader}>Loading...</div>
    </Backdrop>
  </React.Fragment>
);

export default Spinner;