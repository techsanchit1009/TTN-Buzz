import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  return (
    <Backdrop show="true" clicked={props.closeHandler}>
      <div className={classes.Modal}>
        {props.children}
      </div>
    </Backdrop>
  );
}

export default Modal;
