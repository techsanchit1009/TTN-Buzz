import React from "react";
import classes from "./TopBar.module.css";
import TTNLogo from "../../assets/ttn-logo.jpg";
import { FiLogOut } from "react-icons/fi";
import Container from "../UI/Container/Container";
import axios from 'axios';
import { withRouter } from "react-router-dom";

const TopBar = (props) => {

  const logoutHandler = async () => {
    await axios.get('http://localhost:5000/auth/logout')
    .then(resp => {
      props.history.push('/');
      alert(resp.data);
    });
  }

  return (
    <div className={classes.TopBar}>
      <Container>
        <div className={classes.Logo}>
          <img src={TTNLogo} alt="TTN-Logo" height="75rem" />
        </div>
        <div className={classes.TopBarContent}>
          <button onClick={() => logoutHandler()} className={classes.Logout}>
            Logout <FiLogOut style={{ marginLeft: "0.8rem" }} />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(TopBar);
