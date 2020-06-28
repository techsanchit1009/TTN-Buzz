import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  const {btnType, children, title, isDisabled } = props;

  const btnClass = [];
  if(btnType === 'Arrow'){
    btnClass.push(classes.SubmitArrowButton);
  } else if(btnType === 'LoadMore'){
    btnClass.push(classes.LoadMoreButton)
  }

  return (
    <div className={btnType==='LoadMore' ? classes.ButtonWrapper : ''}>
      <button className={btnClass.join(' ')} title={title} disabled={isDisabled}>{children}</button>
    </div>
  )
}

export default Button;