import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import classes from "./BuzzItem.module.css";
import Modal from "../../../Components/UI/Modal/Modal";
import Comments from '../../Comments/Comments';

const BuzzItem = (props) => {
  const [modalType, setModalType] = useState("");
  const [selectedBuzzId, setSelectedBuzzId] = useState("");
  const {
    buzzId,
    creatorEmail,
    creatorName,
    imageUrl,
    desc,
    loggedInEmail,
    createdOn,
    category,
    comments,
    likes,
    dislikes,
    likedBy,
    dislikedBy,
    likeDislikeHandler,
    selectedLike,
    selectedDislike,
    deleteBuzzHandler
  } = props;

  const showModalHandler = (modalType, buzzId) => {
    setModalType(modalType);
    if(buzzId){
      setSelectedBuzzId(buzzId);
    }
  };

  const closeModalHandler = () => {
    setModalType("");
  };

  const showDelete = (creatorEmail) => {
    if (creatorEmail === loggedInEmail) {
      return true;
    }
    return false;
  };

  const actionModal = (modalType) => {
    if (modalType === "likedBy") {
      return (
        <Modal heading="Liked By" closeModalHandler={closeModalHandler}>
          {likedBy.length ? (
            likedBy.map((user) => (
              <div className={classes.UserName} key={user._id}>
                {user.name}
              </div>
            ))
          ) : (
            <span style={{ fontSize: "1rem" }}>No Likes Found</span>
          )}
        </Modal>
      );
    } else if(modalType === 'dislikedBy'){
      return (
        <Modal heading="Disliked By" closeModalHandler={closeModalHandler}>
          {dislikedBy.length ? (
            dislikedBy.map((user) => (
              <div className={classes.UserName} key={user._id}>
                {user.name}
              </div>
            ))
          ) : (
            <span style={{ fontSize: "1rem" }}>No Dislikes Found</span>
          )}
        </Modal>
      );
    } else {
      return (
        <Modal heading="Comments" closeModalHandler={closeModalHandler}>
          <Comments buzzId={selectedBuzzId} />
        </Modal>
      )
    }
  };

  return (
    <div className={classes.BuzzItem}>
      {modalType && actionModal(modalType)}
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
            <div>
              <span className={classes.CreatorName}>
                {creatorName && creatorName.split(" ")[0]}
              </span>
              @{creatorEmail.split("@")[0]}
            </div>
            <div className={classes.CreatedTime}>
              {moment(createdOn).fromNow()}
            </div>
          </div>
          <div className={classes.Description}>
            <span>{category}</span>
            {desc.length < 500 ? desc : desc.substring(0, 500).concat(". . .")}
          </div>
        </div>
      </div>
      <div className={classes.ActionRow}>
        <div className={classes.DeleteIcon} onClick={() => deleteBuzzHandler(buzzId)}>
          {showDelete(creatorEmail) && <MdDeleteForever title="Delete" />}
        </div>
        <div className={classes.ActionBlock}>
        <div className={classes.ActionButton}>
            <span
              className={classes.Counter}
              onClick={() => showModalHandler("comments", buzzId)}
            >
              {comments}
            </span>
            <FaCommentDots
              onClick={() => showModalHandler("comments", buzzId)}
              className={classes.ActionIcon}
              title="Comments"
            />
          </div>
          <div className={classes.ActionButton}>
            <span
              className={classes.Counter}
              onClick={() => showModalHandler("likedBy")}
            >
              {likes}
            </span>
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
            <span
              className={classes.Counter}
              onClick={() => showModalHandler("dislikedBy")}
            >
              {dislikes}
            </span>
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
    </div>
  );
};

export default BuzzItem;
