import React from "react";
import classes from "./Login.module.css";
import TTNLogo from "../assets/ttn-logo.jpg";

const Login = () => {
  return (
    <div className={classes.Login}>
      <div className={classes.BGImage}></div>
      <div className={classes.LoginBox}>
        <img src={TTNLogo} alt="logo" className={classes.Logo}/>
        <div className={classes.LoginText}>Create Your Own Buzz</div>
        <a href="/" className={classes.LoginButton}>Login with Google</a>
      </div>
    </div>
  );
};

export default Login;
