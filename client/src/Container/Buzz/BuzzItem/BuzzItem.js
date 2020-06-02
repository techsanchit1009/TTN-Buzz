import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import classes from "./BuzzItem.module.css";

const BuzzItem = (props) => {
  const {
    buzzId,
    creator,
    imageUrl,
    desc,
    createdOn,
    likes,
    dislikes,
    likeDislikeHandler,
  } = props;

  return (
    <div className={classes.BuzzItem}>
      <div className={classes.Content}>
        <div className={classes.BuzzDate}>Date</div>
        <div className={classes.BuzzContent}>
          {imageUrl && (
            <a href={imageUrl} target="blank">
              <div
                title="Click to enlarge"
                className={classes.ImageBlock}
                style={{ backgroundImage: `url("${imageUrl}")` }}
              ></div>
            </a>
          )}
          <div className={classes.BuzzOwner}>{creator}</div>
          <div className={classes.Desciption}>{desc}</div>
        </div>
      </div>
      <div className={classes.ActionRow}>
        <div className={classes.ActionButton}>
          {likes}
          <FaThumbsUp
            onClick={() => likeDislikeHandler(buzzId, "like")}
            className={classes.ActionIcon}
            title="Like"
          />
        </div>
        <div className={classes.ActionButton}>
          {dislikes}
          <FaThumbsDown
            onClick={() => likeDislikeHandler(buzzId, "dislike")}
            className={classes.ActionIcon}
            title="Dislike"
          />
        </div>
      </div>
    </div>
  );
};

export default BuzzItem;