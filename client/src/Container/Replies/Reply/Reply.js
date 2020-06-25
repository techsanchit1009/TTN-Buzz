import React from "react";
import classes from "./Reply.module.css";
import moment from "moment";

const Reply = (props) => {
  const { reply } = props;
  return (
    <div className={classes.Reply}>
      <div className={classes.UserName} title={reply.commentedBy.email}>
        {reply.commentedBy.name}
      </div>
      {reply.image && (
          <a href={reply.image} target="blank">
            <div
              title="Click to enlarge"
              className={classes.ReplyImage}
              style={{ backgroundImage: `url("${reply.image}")` }}
            ></div>
          </a>
        )}
      <div className={classes.ReplyContent}>
        {reply.content}
        <div className={classes.TimeStamp}>{moment(reply.createdAt).fromNow()}</div>
      </div>
    </div>
  );
};

export default Reply;
