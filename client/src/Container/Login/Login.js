import React from "react";
import TTNLogo from '../../assets/ttn-logo.jpg';
import { FaGooglePlusG } from "react-icons/fa";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.Login}>
      <div className={classes.BGImage}></div>
      <div className={classes.LoginBox}>
        <img src={TTNLogo} alt="logo" />
        <div className={classes.BuzzText}>Create Your Own Buzz</div>
        <a href="/" className={classes.LoginButton}>
          <FaGooglePlusG className={classes.GoogleLogo} />
          Login with Google
        </a>
      </div>
    </div>
  );
}

export default Login;
