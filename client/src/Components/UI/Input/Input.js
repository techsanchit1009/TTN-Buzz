import React from "react";
import classes from './Input.module.css'

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  switch(props.elementType){
    case 'input' : 
        inputElement = <input 
            {...props.elementConfig}
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.inputChangeHandler}
            />;
        break;
    case 'select':
        inputElement = (
          <select 
            className={inputClasses.join(' ')}
            style={{backgroundColor: "white"}} 
            defaultValue=""
            onChange={props.inputChangeHandler}
            >
            <option value="" disabled hidden/>
            {props.options.map(option => (
              <option key={option.value} value={option.value} className={classes.Option}>{option.displayValue}</option>
            ))}
          </select>
        );
        break;
    case 'textarea' :
        inputElement = <textarea 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.inputChangeHandler}
            ></textarea>
        break;
    default :
        inputElement = <input 
            {...props.elementConfig}
            className={inputClasses.join(' ')} 
            value={props.value}/>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;