import React from 'react'
import Container from '../../shared/Container/Container';
import classes from './Banner.module.css';

const Banner = (props) => {
  return (
    <div className={classes.BannerImage}>
    <Container>
      <div className={classes.BannerText}>
        {props.children}
      </div>
    </Container>
    </div>
  );
}

export default Banner;