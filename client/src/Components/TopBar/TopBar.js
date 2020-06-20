import React from "react";
import classes from "./TopBar.module.css";
import TTNLogo from "../../assets/ttn-logo.jpg";
import { FiLogOut } from "react-icons/fi";
import { FaBars } from 'react-icons/fa';
import Container from "../UI/Container/Container";
import { Link } from "react-router-dom";

const TopBar = (props) => {
  const {userData, show, logoutHandler, authenticated} = props;
  
  let topbarData = (
    <div className={classes.Dropdown}>
        <div className={classes.UserName}>{userData.name}</div>
          <div className={classes.DropdownContent}>
            <div className={classes.Item}>
              <a href={userData.profilePic} target="blank" >
                <img src={userData.profilePic} className={classes.Image} alt={userData.name}/>
              </a>
            </div>
            <div className={classes.Item}>
              <Link to="/dashboard/about"> {userData.name} </Link>
              <span className={classes.UserType}>({userData.userType})</span>
            </div>
            <div className={classes.Item}>
              <button
                onClick={() => logoutHandler()}
                className={classes.Logout}>
                Logout <FiLogOut style={{ marginLeft: "0.8rem" }} />
              </button>
            </div>
          </div>
        </div>
  );

  if(!authenticated){
    topbarData = <Link to="/">Login</Link>
  }

  return (
    <div className={classes.TopBar}>
    <Container>
      <div className={classes.Logo}>
        <img src={TTNLogo} alt="TTN-Logo" height="75rem" />
      </div>
      <div className={classes.TopBarContent}>
      <div className={classes.Bars}><FaBars onClick={show} /></div>
        {topbarData}
      </div>
    </Container>
  </div>
  );
};

export default TopBar;
