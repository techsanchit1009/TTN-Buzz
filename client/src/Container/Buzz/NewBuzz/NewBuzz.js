import React from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import classes from './NewBuzz.module.css';

const NewBuzz = () => {

  return (
    <div className={classes.NewBuzz}>
        <div className={classes.FormHeading}>
          <FaPencilAlt style={{ margin: "0 0.3rem" }} />
          Create Buzz
        </div>
        <div>
          <textarea
            className={classes.Form}
            placeholder="Share your thoughts...."
          ></textarea>
        </div>
        <div className={classes.FormFooter}>
          <div className={classes.FormOptions}>
            <div>
              <select className={classes.Category} defaultValue={"Category"}>
                <option defaultValue="DEFAULT" disabled>
                  Category
                </option>
                <option value="Activity">Activity Buzz</option>
                <option value="Lost & Found">Lost & Found Buzz</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <label htmlFor="image" >
                <RiImageAddLine className={classes.ImageButton} />
              </label>
              <input
                id="image"
                type="file"
                className={classes.ImageInput}
                accept="image/*"
                onChange={(e) => console.log(e.target.files)}
              />
            </div>
          </div>
          <button type="submit" className={classes.SubmitButton}>
            <TiLocationArrow />
          </button>
        </div>
      </div>
  )
}

export default NewBuzz;