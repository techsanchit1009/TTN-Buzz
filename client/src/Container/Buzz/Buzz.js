import React, { useEffect, useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";
import BuzzItem from "./BuzzItem/BuzzItem";
import * as buzzActions from "../../Store/Actions/index.actions";
import { connect } from "react-redux";

const Buzz = (props) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    window.document.title = "Buzz";
  }, []);

  const likeDislikeHandler = (id, actionType) => {
    props.onLikeDislikeBuzz(actionType, id, props.email);
  };

  return (
    <div className={classes.Buzz}>
      <NewBuzz />
      <div className={classes.RecentBuzz}>
        <div className={classes.Header}>
          <BsChatQuoteFill className={classes.Icon} /> Recent Buzz
        </div>
        <div className={classes.List}>
          {props.buzzList.map((buzz) => (
            <BuzzItem
              key={buzz._id}
              buzzId={buzz._id}
              creator={buzz.createdBy.email}
              desc={buzz.description}
              createdOn={buzz.createdOn}
              imageUrl={buzz.image}
              likes={buzz.likes}
              dislikes={buzz.dislikes}
              likeDislikeHandler={likeDislikeHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    buzzList: state.buzzData.buzzList,
    email: state.userData.user.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLikeDislikeBuzz: (buttonType, buzzId, email) =>
      dispatch(buzzActions.initLikeDislikeBuzz(buttonType, buzzId, email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buzz);
