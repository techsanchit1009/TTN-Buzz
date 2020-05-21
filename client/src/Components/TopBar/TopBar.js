import React from 'react';
import classes from './TopBar.module.css';
import TTNLogo from '../../assets/ttn-logo.jpg'
import { FiLogOut } from 'react-icons/fi'
import Container from '../../shared/Container/Container';

const TopBar = () => {
  return (
    <div className={classes.TopBar}>
      <Container>
        <div className={classes.Logo}>
          <img src={TTNLogo} alt="TTN-Logo" height="75rem"/>
        </div>
        <div className={classes.TopBarContent}>
          <a href="/" className={classes.Logout}>Logout <FiLogOut style={{marginLeft: '0.8rem'}}/></a>
        </div>
      </Container>
    </div>
  );
}

export default TopBar;