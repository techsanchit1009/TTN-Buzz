import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import classes from './NewBuzz.module.css';
import axios from 'axios';
import * as buzzAction from '../../../Store/Actions/index.actions';


const NewBuzz = (props) => {
  const initialState = {
    description: '',
    category: '',
    image: '',
  };

  const [buzzData, setBuzzData] = useState(initialState);

  const imageSelectHandler = (e) => {
    setBuzzData({...buzzData, image: e.target.files[0]});
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();  
    Object.keys(buzzData).forEach(item => {
      formData.append(item, buzzData[item]);
    });
    formData.append('email', props.email);

    // axios.post('http://localhost:5000/api/buzz', formData)
    //       .then(resp => console.log(resp.data));
    props.onAddBuzz(formData);
  }

  const removeImage = () => {
    setBuzzData({...buzzData, image: ''})
  }

  return (
    <div className={classes.NewBuzz}>
        <div className={classes.Header}>
          <FaPencilAlt style={{ margin: "0 0.3rem" }} />
          Create Buzz
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <textarea
            className={classes.Form}
            placeholder="Share your thoughts...."
            value={buzzData.description}
            onChange={ (e) => setBuzzData({...buzzData, description: e.target.value}) }
          ></textarea>
        </div>
        <div className={classes.FormFooter}>
          <div className={classes.FormOptions}>
            <div style={{position: 'relative'}}>
              <select className={classes.Category} 
                      onChange={(e) => setBuzzData({...buzzData, category: e.target.value})}
                      defaultValue={"Category"}>
                <option defaultValue="DEFAULT" hidden disabled>Category</option>
                <option value="Activity">Activity Buzz </option>
                <option value="Lost & Found">Lost & Found Buzz</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <label htmlFor="image" >
                <RiImageAddLine className={classes.ImageButton}
                title="Add Image" />
              </label>
              <input
                id="image"
                type="file"
                className={classes.ImageInput}
                accept="image/*"
                hidden
                onChange={(e) => imageSelectHandler(e)}
              />
              {buzzData.image.name && <p className={classes.ImageName}>
                {buzzData.image.name} 
                <span className={classes.RemoveImage} onClick={removeImage} title="Remove">&times;</span>
              </p>}
            </div>
          </div>
          <button className={classes.SubmitButton} title="Submit Buzz">
            <TiLocationArrow />
          </button>
        </div>
        </form>
      </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return{
    email: state.userData.user.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBuzz: (buzzBody) => dispatch(buzzAction.initAddBuzz(buzzBody))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBuzz);