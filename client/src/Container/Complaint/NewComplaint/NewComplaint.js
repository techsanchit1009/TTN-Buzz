import React, { useState } from "react";
import classes from "./NewComplaint.module.css";
import Input from "../../../Components/UI/Input/Input";
import { RiImageAddLine } from "react-icons/ri";
import * as complaintAction from "../../../Store/Actions/index.actions";
import BoxLayout from "../../../Components/UI/BoxLayout/BoxLayout";
import { connect } from "react-redux";
import { checkValidity } from "../../../Shared/validation";

const NewComplaint = (props) => {
  const initialFormData = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },

    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

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

    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },

    dept: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "IT", displayValue: "IT" },
          { value: "Admin", displayValue: "Admin" },
          { value: "HR", displayValue: "HR" },
          { value: "Infra", displayValue: "Infra" },
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
  const [complaintData, setComplaintData] = useState(initialFormData);
  const [formIsValid, setFormIsValid] = useState(false);


  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedComplaintData = {
      ...complaintData,
    };
    const updatedFormElement = {
      ...updatedComplaintData[inputIdentifier],
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
    for (let inputIdentifier in updatedComplaintData) {
      formIsValid = updatedComplaintData[inputIdentifier].valid && formIsValid;
    }
  
   
    updatedComplaintData[inputIdentifier] = updatedFormElement;
    setComplaintData(updatedComplaintData);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(complaintData).forEach((item) => {
      formData.append(item, complaintData[item].value);
    });
    formData.append("createdBy", props.email);
    props.onAddNewComplaint(formData);
    setComplaintData(initialFormData);
  };

  const removeImage = () => {
    setComplaintData({
      ...complaintData,
      image: { ...complaintData.image, value: "" },
    });
  };

  return (
    <BoxLayout heading="Complaint Box">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={classes.ComplaintBox}>
          <div className={classes.FormRow}>
            <Input
              elementType={complaintData.dept.elementType}
              options={complaintData.dept.elementConfig.options}
              inputChangeHandler={(e) => inputChangeHandler(e, "dept")}
              invalid={!complaintData.dept.valid}
              touched={complaintData.dept.touched}
              shouldValidate={complaintData.dept.validation}
              label="Select Department"
            />
            <Input
              elementType={complaintData.title.elementType}
              elementConfig={complaintData.title.elementConfig}
              value={complaintData.title.value}
              inputChangeHandler={(e) => inputChangeHandler(e, "title")}
              invalid={!complaintData.title.valid}
              touched={complaintData.title.touched}
              shouldValidate={complaintData.title.validation}
              label="Issue Title"
            />
          </div>
          <div className={classes.FormRow}>
            <Input
              elementType={complaintData.name.elementType}
              elementConfig={complaintData.name.elementConfig}
              value={complaintData.name.value}
              inputChangeHandler={(e) => inputChangeHandler(e, "name")}
              invalid={!complaintData.name.valid}
              touched={complaintData.name.touched}
              shouldValidate={complaintData.name.validation}
              label="Your Name"
            />
            <Input
              elementType={complaintData.email.elementType}
              elementConfig={complaintData.email.elementConfig}
              value={complaintData.email.value}
              inputChangeHandler={(e) => inputChangeHandler(e, "email")}
              invalid={!complaintData.email.valid}
              touched={complaintData.email.touched}
              shouldValidate={complaintData.email.validation}
              label="Email ID"
            />
          </div>
          <div className={classes.TextAreaRow}>
            <Input
              elementType="textarea"
              value={complaintData.description.value}
              inputChangeHandler={(e) => inputChangeHandler(e, "description")}
              invalid={!complaintData.description.valid}
              touched={complaintData.description.touched}
              shouldValidate={complaintData.description.validation}
              label="Your Concern"
            />
          </div>
          <div className={classes.ImageUploadRow}>
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
              onChange={(e) => inputChangeHandler(e, "image")}
            />
            <div className={classes.ImageName}>
              {!complaintData.image.value.name ? (
                "Attachment"
              ) : (
                <p>
                  <span
                    className={classes.RemoveImage}
                    onClick={removeImage}
                    title="Remove"
                  >
                    &times;
                  </span>
                  {complaintData.image.value.name}
                </p>
              )}
            </div>
          </div>
          <div className={classes.SubmitRow}>
            <button className={classes.SubmitButton} disabled={!formIsValid}>Submit</button>
          </div>
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
    onAddNewComplaint: (complaintBody) =>
      dispatch(complaintAction.initAddComplaint(complaintBody)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewComplaint);
