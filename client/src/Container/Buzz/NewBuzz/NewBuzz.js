import React, { useState } from "react";
import { connect } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import { BsFillCaretDownFill } from "react-icons/bs";
import classes from "./NewBuzz.module.css";
import BoxLayout from "../../../Components/UI/BoxLayout/BoxLayout";
import * as buzzAction from "../../../Store/Actions/index.actions";
import { checkValidity } from '../../../Shared/validation';
import { withRouter } from "react-router-dom";
import Button from "../../../Components/UI/Button/Button";

const NewBuzz = (props) => {
  const initialFormData = {
    description: {
      elementType: "textarea",
      elementConfig: {
        placeholder: "Please select a category first",
        disabled: true,
        title: 'Please select a category first'
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    category: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Activity", displayValue: "Activity Buzz" },
          { value: "Lost & Found", displayValue: "Lost & Found Buzz" },
        ],
      },
      value: "Category",
      displayValue: 'Category',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    image: {
      elementType: "file",
      value: "",
      valid: true,
      validation: {}
    },
  };

  const [buzzData, setBuzzData] = useState(initialFormData);
  const [formIsValid, setFormIsValid] = useState(false);


  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedBuzzData = {
      ...buzzData,
    };
    const updatedFormElement = {
      ...updatedBuzzData[inputIdentifier],
    };
    
    if (inputIdentifier === "image") {
      updatedFormElement.value = event.target.files[0];
    } else {
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
        
      updatedFormElement.touched = true;
    }
    
    if(inputIdentifier === 'category'){
      buzzData.description.elementConfig.disabled=false;
      buzzData.description.elementConfig.placeholder="Share your thoughts....";
      buzzData.description.elementConfig.title="";
    }
  
    let formIsValid = true;
    for (let inputIdentifier in updatedBuzzData) {
      formIsValid = updatedBuzzData[inputIdentifier].valid && formIsValid;
    }
     
    updatedBuzzData[inputIdentifier] = updatedFormElement;
    setBuzzData(updatedBuzzData);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(buzzData).forEach((item) => {
      formData.append(item, buzzData[item].value);
    });
    props.onAddBuzz(formData);
    setBuzzData(initialFormData);
    setFormIsValid(false);
  };

  let errorMessage = <p className={classes.ErrorMessage}>*Please enter a valid data</p>

  const removeImage = () => {
    setBuzzData({
      ...buzzData,
      image: { ...buzzData.image, value: "" },
    });
  };

  let headerIcon = <FaPencilAlt style={{ marginRight: "0.3rem" }} />;

  return (
    <BoxLayout heading="Create Buzz" icon={headerIcon}>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <textarea
            className={classes.Form}
            {...buzzData.description.elementConfig}
            value={buzzData.description.value}
            onChange={(e) => inputChangeHandler(e, 'description')}
          ></textarea>
          {!buzzData.description.valid && buzzData.description.touched ? errorMessage : ''}
        </div>
        <div className={classes.FormFooter}>
          <div className={classes.FormOptions}>
             <div className={classes.SelectWrapper}>
              <BsFillCaretDownFill className={classes.DownArrow} />
                <select
                  className={classes.Category}
                  onChange={(e) => inputChangeHandler(e, 'category')}
                  defaultValue={buzzData.category.value}
                >
                  <option disabled hidden>{buzzData.category.displayValue}</option>
                  {buzzData.category.elementConfig.options.map(option => (
                    <option value={option.value} key={option.value}>{option.displayValue}</option>
                  ))}
                </select>
              {!buzzData.category.valid && buzzData.category.touched ? errorMessage : ''}

             </div>
            <div className={classes.ImageBtnWrapper}>
              <label htmlFor="image">
                <RiImageAddLine
                  className={classes.ImageButton}
                  title="Add Image"
                />
              </label>
              <input
                id="image"
                type="file"
                className={classes.ImageInput}
                accept="image/*"
                hidden
                onChange={(e) => inputChangeHandler(e, 'image')}
              />
              {buzzData.image.value && (
                <p className={classes.ImageName}>
                  {buzzData.image.value.name}
                  <span
                    className={classes.RemoveImage}
                    onClick={removeImage}
                    title="Remove"
                  >
                    &times;
                  </span>
                </p>
              )}
            </div>
          </div>
          <Button btnType="Arrow" title="Submit Buzz" isDisabled={!formIsValid} >
            <TiLocationArrow />
          </Button>
        </div>
    </form>
    </BoxLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.userData.user.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBuzz: (buzzBody) => dispatch(buzzAction.initAddBuzz(buzzBody)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewBuzz));
