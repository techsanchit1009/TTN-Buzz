import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  return (
    <Backdrop show="true" clicked={props.closeModalHandler} closeIcon="&times;">
      <div className={classes.Modal}>
        <div className={classes.ModalHeading}>{props.heading}</div>
        {props.children}
      </div>
    </Backdrop>
  );
}

export default Modal;
