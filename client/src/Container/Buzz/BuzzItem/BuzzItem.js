import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import moment from 'moment';
import classes from "./BuzzItem.module.css";

const BuzzItem = (props) => {
  const {
    buzzId,
    creatorEmail,
    creatorName,
    imageUrl,
    desc,
    createdOn,
    likes,
    dislikes,
    likeDislikeHandler,
    selectedLike,
    selectedDislike,
  } = props;

  return (
    <div className={classes.BuzzItem}>
      <div className={classes.Content}>
        <div className={classes.BuzzDate}>
          <div className={classes.Date}>{moment(createdOn).format('DD')}</div>
          <div className={classes.Month}>{moment(createdOn).format('MM')}</div>
        </div>

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
          <div className={classes.BuzzOwner}>
            <span>
              <span className={classes.CreatorName}>{creatorName && creatorName.split(' ')[0]}</span>
              @{creatorEmail}
            </span>
            <span className={classes.CreatedTime}>{moment(createdOn).fromNow()}</span>
          </div>
          <div className={classes.Description}>
            {desc.length < 500 ? desc : desc.substring(0, 500).concat('. . .')}
          </div>
        </div>
      </div>
      <div className={classes.ActionRow}>
        <div className={classes.ActionButton}>
          {likes}
          <FaThumbsUp
            onClick={() => likeDislikeHandler(buzzId, "like")}
            className={
              selectedLike
                ? [classes.ActionIcon, classes.Selected].join(" ")
                : classes.ActionIcon
            }
            title="Like"
          />
        </div>
        <div className={classes.ActionButton}>
          {dislikes}
          <FaThumbsDown
            onClick={() => likeDislikeHandler(buzzId, "dislike")}
            className={
              selectedDislike
                ? [classes.ActionIcon, classes.Selected].join(" ")
                : classes.ActionIcon
            }
            title="Dislike"
          />
        </div>
      </div>
    </div>
  );
};

export default BuzzItem;