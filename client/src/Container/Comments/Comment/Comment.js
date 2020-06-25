import React, { useState } from "react";
import moment from "moment";
import classes from "./Comment.module.css";
import Replies from "../../Replies/Replies";

const Comment = (props) => {
  const { comment, userData, loggedInUser, commentDeleteHandler } = props;
  const [showReplies, setShowReplies] = useState(false);

  const showDeleteOption = () => {
    if (loggedInUser.email === userData.email) {
      return true;
    }
    return false;
  };

  const showRepliesHandler = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className={classes.Comment}>
      <a href={userData.profilePic} target="blank">
        <img
          src={userData.profilePic}
          className={classes.Image}
          alt={userData.name}
        />
      </a>
      <div className={classes.CommentDetails}>
        <div className={classes.UserName} title={userData.email}>
          {userData.name}
        </div>
        <div className={classes.Content}>{comment.content}</div>
        {comment.image && (
          <a href={comment.image} target="blank">
            <div
              title="Click to enlarge"
              className={classes.CommentImage}
              style={{ backgroundImage: `url("${comment.image}")` }}
            ></div>
          </a>
        )}
        <div className={`${classes.Details} ${classes.Content}`}>
          <div className={classes.TimeStamp}>
            {moment(comment.createdAt).fromNow()}
          </div>
          <div className={classes.Actions}>
            {showDeleteOption() && (
              <p onClick={() => commentDeleteHandler(comment._id)}>Delete</p>
            )}
            <p onClick={() => showRepliesHandler()}>Reply</p>
          </div>
        </div>
        {showReplies && (
          <div className={classes.Replies}>
            <Replies comment={comment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
