import React from 'react';
import classes from './Comment.module.css';

const Comment = (props) => {
  const {userData} = props;
  console.log(userData);
  return (
    <div className={classes.Comment}>
      <a href={userData.profilePic} target="blank" >
        <img src={userData.profilePic} className={classes.Image} alt={userData.name}/>
      </a>
      <div className={classes.CommentDetails}>{userData.name}</div>
    </div>
  );
}

export default Comment;