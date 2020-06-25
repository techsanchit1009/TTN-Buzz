import React, { useState } from 'react';
import {TiLocationArrow} from 'react-icons/ti'
import { RiImageAddLine } from 'react-icons/ri';
import { checkValidity } from '../../Shared/validation';
import * as commentActions from '../../Store/Actions/index.actions';
import classes from './Comments.module.css';
import Comment from './Comment/Comment';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

const Comments = (props) => {
  const initialFormData = {
    comment: {
      elementType: "textarea",
      elementConfig: {
        placeholder: "Add a comment.."
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

  const [commentData, setCommentData] = useState(initialFormData);
  const [formIsValid, setFormIsValid] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const {
    onFetchComments,
    onLoadMoreComments,
    onAddComment,
    buzzId,
    comments,
    loading,
    loggedInUser,
    onDeleteComment,
    totalComments,
  } = props;

  useEffect(() => {
    onFetchComments(buzzId);
  }, [buzzId, onFetchComments]);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedCommentData = {
      ...commentData,
    };
    const updatedFormElement = {
      ...updatedCommentData[inputIdentifier],
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
    for (let inputIdentifier in updatedCommentData) {
      formIsValid = updatedCommentData[inputIdentifier].valid && formIsValid;
    }
     
    updatedCommentData[inputIdentifier] = updatedFormElement;
    setCommentData(updatedCommentData);
    setFormIsValid(formIsValid);
  };

  let errorMessage = <p className={classes.ErrorMessage}>*Please enter a valid data</p>

  
  const removeImage = () => {
    setCommentData({
      ...commentData,
      image: { ...commentData.image, value: "" },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(commentData).forEach((item) => {
      formData.append(item, commentData[item].value);
    });
    onAddComment(buzzId, formData);
    setCommentData(initialFormData);
  };

  const loadMore = () => {
    setPageNo(pageNo + 1);
    onLoadMoreComments(buzzId, pageNo + 1);
  }

  return (
    <div style={{minHeight: '100%'}}>
        <div className={classes.CommentList}>
          { loading ? <Spinner /> : comments.length ? (comments.map(comment => 
                  <Comment 
                    key={comment._id} 
                    comment={comment}
                    userData={comment.commentedBy}
                    loggedInUser={loggedInUser}
                    commentDeleteHandler={onDeleteComment}/>
          )) : <p className={classes.NoResultText}>No Comments Found</p>}
          {totalComments !== comments.length && <button onClick={() => loadMore()}>LoadMore</button>}
        </div>
        <form onSubmit={e => submitHandler(e)}>
          <div className={classes.FormRow}>
            <textarea
              className={classes.CommentArea}
              {...commentData.comment.elementConfig}
              value={commentData.comment.value}
              onChange={(e) => inputChangeHandler(e, 'comment')}
            ></textarea>
            <button className={classes.SubmitButton} title="Add Comment" disabled={!formIsValid}>
              <TiLocationArrow />
            </button>
          </div>
            {!commentData.comment.valid && commentData.comment.touched ? errorMessage : ''}
          <div className={classes.FormRow}>
              <label htmlFor="image_comment">
                <RiImageAddLine
                  className={classes.ImageButton}
                  title="Add Image"
                />
              </label>
              <input
                id="image_comment"
                type="file"
                className={classes.ImageInput}
                accept="image/*"
                hidden
                onChange={(e) => inputChangeHandler(e, 'image')}
              />
              {commentData.image.value && (
                <p className={classes.ImageName}>
                  {commentData.image.value.name}
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
  )
}

const mapStateToProps = state => {
  return {
    comments: state.commentData.comments,
    loading: state.commentData.loadingComments,
    loggedInUser: state.userData.user,
    totalComments: state.commentData.totalComments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComments: (buzzId) =>
      dispatch(commentActions.initFetchComments(buzzId)),

    onLoadMoreComments: (buzzId, pageNo) =>
      dispatch(commentActions.initLoadMoreComments(buzzId, pageNo)),

    onAddComment: (buzzId, commentBody) =>
      dispatch(commentActions.initAddComment(buzzId, commentBody)),

    onDeleteComment: (commentId) =>
      dispatch(commentActions.initDeleteComment(commentId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);