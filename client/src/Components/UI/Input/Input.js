import React from "react";
import { IoIosArrowDown } from 'react-icons/io';
import classes from './Input.module.css'

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let validationError = null;

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
    let errorMessage = '*Please enter a valid data!';
    
    validationError = <p className={classes.ErrorMessage}>{errorMessage}</p>;
  }

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
         <div className={classes.SelectWrapper}>
           <IoIosArrowDown className={classes.Arrow} />
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
         </div>
        );
        break;
    case 'textarea' :
        inputElement = <textarea 
            {...props.elementConfig}  
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
      {props.label && <label className={classes.Label}>{props.label}</label> }
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;