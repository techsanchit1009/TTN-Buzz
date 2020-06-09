import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import moment from "moment";
import classes from "./BuzzItem.module.css";
import Modal from "../../../Components/UI/Modal/Modal";

const BuzzItem = (props) => {
  const [modalType, setModalType] = useState("");
  const {
    buzzId,
    creatorEmail,
    creatorName,
    imageUrl,
    desc,
    createdOn,
    likes,
    dislikes,
    likedBy,
    dislikedBy,
    likeDislikeHandler,
    selectedLike,
    selectedDislike,
  } = props;

  const showModalHandler = (modalType) => {
    setModalType(modalType);
  };

  const closeModalHandler = () => {
    setModalType("");
  }

  const likeDislikeModal = (modalType) => {
    if(modalType === 'likedBy'){
      return (
        <Modal heading="Liked By" closeModalHandler={closeModalHandler}>
          {likedBy.length ? likedBy.map(user => (
            <div className={classes.UserName} key={user._id}>{user.name}</div>
          )) : <span style={{fontSize: '1rem'}}>No Likes Found</span>}
        </Modal>
      )
    } else {
      return (
        <Modal heading="Disliked By" closeModalHandler={closeModalHandler}>
          {dislikedBy.length ? dislikedBy.map(user => (
            <div className={classes.UserName} key={user._id}>{user.name}</div>
          )): <span style={{fontSize: '1rem'}}>No Dislikes Found</span>}
        </Modal>
      )
    }
  }

  return (
    <div className={classes.BuzzItem}>
      {modalType && likeDislikeModal(modalType)}
      <div className={classes.Content}>
        <div className={classes.BuzzDate}>
          <div className={classes.Date}>{moment(createdOn).format("DD")}</div>
          <div className={classes.Month}>{moment(createdOn).format("MM")}</div>
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
              <span className={classes.CreatorName}>
                {creatorName && creatorName.split(" ")[0]}
              </span>
              @{creatorEmail}
            </span>
            <span className={classes.CreatedTime}>
              {moment(createdOn).fromNow()}
            </span>
          </div>
          <div className={classes.Description}>
            {desc.length < 500 ? desc : desc.substring(0, 500).concat(". . .")}
          </div>
        </div>
      </div>
      <div className={classes.ActionRow}>
        <div className={classes.ActionButton}>
          <span className={classes.Counter} onClick={() => showModalHandler("likedBy")}>{likes}</span>
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
          <span className={classes.Counter} onClick={() => showModalHandler("dislikedBy")}>{dislikes}</span>
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
