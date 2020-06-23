import React from 'react';
import moment from 'moment';
import classes from './Comment.module.css';

const Comment = (props) => {
  const {comment, userData, loggedInUser, commentDeleteHandler} = props;

  const showDeleteOption = () => {
    if(loggedInUser.email === userData.email){
      return true;
    }
    return false;
  }

  return (
    <div className={classes.Comment}>
      <a href={userData.profilePic} target="blank" >
        <img src={userData.profilePic} className={classes.Image} alt={userData.name}/>
      </a>
      <div className={classes.CommentDetails}>
        <div className={classes.UserName} title={userData.email}>{userData.name}</div>
        <div className={classes.Content}>{comment.content}</div>
        <div className={`${classes.Details} ${classes.Content}`}>
          <div className={classes.TimeStamp}>{moment(comment.createdAt).fromNow()}</div>
          <div className={classes.Actions}>
            {showDeleteOption() && <p onClick={() => commentDeleteHandler(comment._id)}>Delete</p>}
            <p>Reply</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;