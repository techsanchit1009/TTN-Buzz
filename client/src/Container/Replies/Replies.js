import React, { useState, useEffect } from 'react';
import classes from './Replies.module.css';
import {TiLocationArrow} from 'react-icons/ti';
import { RiImageAddLine } from 'react-icons/ri';
import { checkValidity } from '../../Shared/validation';
import { connect } from 'react-redux';
import * as replyActions from '../../Store/Actions/index.actions';
import Reply from './Reply/Reply';

const Replies = (props) => {
  const initialFormData = {
    reply: {
      elementType: "text",
      elementConfig: {
        placeholder: "Add a reply.."
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    image: {
      elementType: "file",
      value: "",
      valid: true,
      validation: {}
    },
  };

  const {
    comment,
    onFetchReplies,
    onAddReply,
    onLoadMoreReplies,
    replies,
    totalReplies,
  } = props;

  const [replyData, setReplyData] = useState(initialFormData);
  const [formIsValid, setFormIsValid] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    onFetchReplies(comment._id)
  }, [onFetchReplies, comment._id]);

  let errorMessage = <p className={classes.ErrorMessage}>*Please enter a valid data</p>

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedReplyData = {
      ...replyData,
    };
    const updatedFormElement = {
      ...updatedReplyData[inputIdentifier],
    };
    
    if (inputIdentifier === "image") {
      updatedFormElement.value = event.target.files[0];
    } else {
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
        
      updatedFormElement.touched = true;
    }

    let formIsValid = true;
    for (let inputIdentifier in updatedReplyData) {
      formIsValid = updatedReplyData[inputIdentifier].valid && formIsValid;
    }
     
    updatedReplyData[inputIdentifier] = updatedFormElement;
    setReplyData(updatedReplyData);
    setFormIsValid(formIsValid);
  };

  const removeImage = () => {
    setReplyData({
      ...replyData,
      image: { ...replyData.image, value: "" },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const replyFormData = new FormData();
    Object.keys(replyData).forEach((item) => {
      replyFormData.append(item, replyData[item].value);
    });
    onAddReply(comment._id, comment.buzzId, replyFormData);
    setReplyData(initialFormData);
  };

  const loadMore = () => {
    setPageNo(pageNo + 1);
    onLoadMoreReplies(comment._id, pageNo + 1);
  }

  return (
    <div className={classes.Replies}>
      <div className={classes.RepliesList}>
        {replies.length ? replies.map(reply => (
          <Reply key={reply._id} reply={reply}/>
        )) : <p className={classes.NoResultText}>No Comments Found</p>}
      {totalReplies !== replies.length && <button onClick={() => loadMore()}>LoadMore</button>}  
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={classes.FormRow}>
          <input
            className={classes.Reply}
            type={replyData.reply.elementType}
            {...replyData.reply.elementConfig}
            value={replyData.reply.value}
            onChange={(e) => inputChangeHandler(e, 'reply')}
          />
          <button className={classes.SubmitButton} title="Add Reply" disabled={!formIsValid}>
              <TiLocationArrow />
          </button>
        </div>
        {!replyData.reply.valid && replyData.reply.touched ? errorMessage : ''}
        <div className={classes.FormRow}>
              <label htmlFor="image_reply">
                <RiImageAddLine
                  className={classes.ImageButton}
                  title="Add Image"
                />
              </label>
              <input
                id="image_reply"
                type="file"
                className={classes.ImageInput}
                accept="image/*"
                hidden
                onChange={(e) => inputChangeHandler(e, 'image')}
              />
              {replyData.image.value && (
                <p className={classes.ImageName}>
                  {replyData.image.value.name}
                  <span
                    className={classes.RemoveImage}
                    onClick={removeImage}
                    title="Remove"
                  >
                    &times;
                  </span>
                </p>
              )}
            </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    replies: state.replyData.replies,
    totalReplies: state.replyData.totalReplies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReplies: (commentId) =>
      dispatch(replyActions.initFetchReplies(commentId)),

    onLoadMoreReplies: (commentId, pageNo) =>
      dispatch(replyActions.initLoadMoreReplies(commentId, pageNo)),

    onAddReply: (commentId, buzzId, replyBody) =>
      dispatch(replyActions.initAddReply(commentId, buzzId, replyBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
