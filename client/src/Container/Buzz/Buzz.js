import React, { useEffect } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";
import BuzzItem from "./BuzzItem/BuzzItem";
import BoxLayout from '../../Components/UI/BoxLayout/BoxLayout';
import * as buzzActions from "../../Store/Actions/index.actions";
import { connect } from "react-redux";

const Buzz = (props) => {

  useEffect(() => {
    window.document.title = "Buzz";
  }, []);

  const likeDislikeHandler = (id, actionType) => {
    props.onLikeDislikeBuzz(actionType, id, props.user.email);
  };

  const checkSelected = (array, userId) => {
    const element = array.find(elem => elem._id === userId);
    if(!element){
      return false;
    }
    return true;
  }

  let headerIcon = <BsChatQuoteFill />;

  return (
    <div className={classes.Buzz}>
      <NewBuzz />
    
      <BoxLayout heading="Recent Buzz" icon={headerIcon}>
        <div className={classes.List}>
          {props.buzzList.map((buzz) => (
            <BuzzItem
              key={buzz._id}
              buzzId={buzz._id}
              creatorEmail={buzz.createdBy.email}
              creatorName={buzz.createdBy.name}
              desc={buzz.description}
              createdOn={buzz.createdOn}
              imageUrl={buzz.image}
              likes={buzz.likes}
              dislikes={buzz.dislikes}
              selectedLike={checkSelected(buzz.likedBy, props.user._id)}
              selectedDislike={checkSelected(buzz.dislikedBy, props.user._id)}
              likeDislikeHandler={likeDislikeHandler}
            />
          ))}
        </div>
      </BoxLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    buzzList: state.buzzData.buzzList,
    user: state.userData.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLikeDislikeBuzz: (buttonType, buzzId, email) =>
      dispatch(buzzActions.initLikeDislikeBuzz(buttonType, buzzId, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buzz);
