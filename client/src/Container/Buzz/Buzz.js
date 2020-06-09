import React, { useEffect } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";
import BuzzItem from "./BuzzItem/BuzzItem";
import BoxLayout from "../../Components/UI/BoxLayout/BoxLayout";
import * as buzzActions from "../../Store/Actions/index.actions";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";

const Buzz = (props) => {
  const { onFetchBuzz, onLikeDislikeBuzz, buzzList, user, loadingBuzz } = props;
  useEffect(() => {
    window.document.title = "Buzz";
    onFetchBuzz();
  }, [onFetchBuzz]);

  const likeDislikeHandler = (id, actionType) => {
    onLikeDislikeBuzz(actionType, id, user.email);
  };


  const checkSelected = (likedDislikedArray, userId) => {
    const element = likedDislikedArray.find((elem) => elem._id === userId);
    if (!element) {
      return false;
    }
    return true;
  };


  let headerIcon = <BsChatQuoteFill />;

  return (
    <div className={classes.Buzz}>
      <NewBuzz />
      <BoxLayout heading="Recent Buzz" icon={headerIcon}>
        <div className={classes.List}>
          {buzzList.map((buzz) => (
            <BuzzItem
              key={buzz._id}
              buzzId={buzz._id}
              creatorEmail={buzz.createdBy.email}
              creatorName={buzz.createdBy.name}
              desc={buzz.description}
              createdOn={buzz.createdOn}
              imageUrl={buzz.image}
              likes={buzz.likes}
              likedBy={buzz.likedBy}
              dislikedBy={buzz.dislikedBy}
              dislikes={buzz.dislikes}
              selectedLike={checkSelected(buzz.likedBy, user._id)}
              selectedDislike={checkSelected(buzz.dislikedBy, user._id)}
              likeDislikeHandler={likeDislikeHandler}
            />
          ))}
        </div>
      </BoxLayout>
      {loadingBuzz && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    buzzList: state.buzzData.buzzList,
    user: state.userData.user,
    loadingBuzz: state.buzzData.loadingBuzz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBuzz: () => dispatch(buzzActions.initFetchBuzz()),
    onLikeDislikeBuzz: (buttonType, buzzId, email) =>
      dispatch(buzzActions.initLikeDislikeBuzz(buttonType, buzzId, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buzz);
