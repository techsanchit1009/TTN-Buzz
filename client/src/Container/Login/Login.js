import React, { useEffect, useState } from "react";
import queryString from 'query-string'
import TTNLogo from '../../assets/ttn-logo.jpg';
import { FaGooglePlusG } from "react-icons/fa";
import classes from "./Login.module.css";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg(queryString.parse(props.location.search).error);  // In case of access denied
  }, [props.location.search]);

  return (
    <div className={classes.Login}>
      <div className={classes.BGImage}></div>
      <div className={classes.LoginBox}>
        <img src={TTNLogo} alt="logo" className={classes.Logo}/>
        <div className={classes.BuzzText}>Create Your Own Buzz</div>
        <a href="http://localhost:5000/auth/google" className={classes.LoginButton}>
          <FaGooglePlusG className={classes.GoogleLogo} />
          Login with Google
        </a>
        {errorMsg && <div className={classes.ErrorBox}>{errorMsg}</div>}
      </div>
    </div>
  );
}

export default withRouter(Login);
