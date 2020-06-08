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

const NewBuzz = (props) => {
  const initialFormData = {
    description: {
      elementType: "textarea",
      elementConfig: {},
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
      value: "",
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

  // const imageSelectHandler = (e) => {
  //   setBuzzData({ ...buzzData, image: e.target.files[0] });
  // };

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
    formData.append("email", props.email);
    // console.log(buzzData);
    props.onAddBuzz(formData);
  };

  let errorMessage = <p className={classes.ErrorMessage}>*Please enter a valid data</p>

  const removeImage = () => {
    setBuzzData({ ...buzzData, image: "" });
  };

  let headerIcon = <FaPencilAlt style={{ marginRight: "0.3rem" }} />;
  return (
    <BoxLayout heading="Create Buzz" icon={headerIcon}>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <textarea
            className={classes.Form}
            placeholder="Share your thoughts...."
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
                  defaultValue={"Category"}
                >
                  <option defaultValue="DEFAULT" hidden disabled>
                    Category
                  </option>
                  <option value="Activity">Activity Buzz </option>
                  <option value="Lost & Found">Lost & Found Buzz</option>
                </select>
              {!buzzData.category.valid && buzzData.category.touched ? errorMessage : ''}

             </div>
            <div style={{ display: "flex", alignItems: "center" }}>
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
              {buzzData.image.name && (
                <p className={classes.ImageName}>
                  {buzzData.image.name}
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
          <button className={classes.SubmitButton} title="Submit Buzz" disabled={!formIsValid}>
            <TiLocationArrow />
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewBuzz);
