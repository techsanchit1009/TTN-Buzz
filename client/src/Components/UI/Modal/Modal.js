import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  const { closeModalHandler, size, heading, children} = props;

  let modalClasses = [classes.Modal];
  if(size && size==='large'){
    modalClasses.push(classes.BigModal)
  }

  return (
    <Backdrop show="true" clicked={closeModalHandler} closeIcon="&times;">
      <div className={modalClasses.join(' ')}>
        <div className={classes.ModalHeading}>{heading}</div>
        {children}
      </div>
    </Backdrop>
  );
}

export default Modal;
