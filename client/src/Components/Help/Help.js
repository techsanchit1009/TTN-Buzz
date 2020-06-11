import React from "react";
import classes from "./Help.module.css";
import support from "../../assets/support.png";
import contact from "../../assets/contact.png";
import suggestion from "../../assets/suggestion.png";
import BoxLayout from "../UI/BoxLayout/BoxLayout";

const Help = () => {
  return (
    <BoxLayout>
      <div className={classes.Help}>
        <div className={classes.Banner}>
          <div className={classes.Tint}>
            <h1>WE ARE HERE TO HELP YOU</h1>
          </div>
        </div>
        <div className={classes.Content}>
          <div className={classes.Card}>
            <img src={contact} alt="contact" /> 
            <p>Sanchit Sachdeva</p>
            <p>contact@tothenew.com</p>
          </div>
          <div className={classes.Card}>
            <img src={support} alt="support" />
            <p>Sanchit Sachdeva</p>
            <p>support@tothenew.com</p>
          </div>
          <div className={classes.Card}>
            <img src={suggestion} alt="suggestions" />
            <p>Sanchit Sachdeva</p>
            <p>suggest@tothenew.com</p>
          </div>
        </div>
      </div>
    </BoxLayout>
  );
};

export default Help;