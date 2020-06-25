import React, { useEffect, useState, useCallback } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";
import BuzzItem from "./BuzzItem/BuzzItem";
import BoxLayout from "../../Components/UI/BoxLayout/BoxLayout";
import * as buzzActions from "../../Store/Actions/index.actions";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';

const Buzz = (props) => {
  const {
    onFetchBuzz,
    onLoadMoreBuzz,
    onLikeDislikeBuzz,
    buzzList,
    user,
    loadingBuzz,
    onDeleteBuzz,
    totalBuzzCount,
  } = props;

  const [buzzs, setBuzzs] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    window.document.title = "Buzz";
    onFetchBuzz();
  }, [onFetchBuzz]);

  useEffect(() => {
    setBuzzs(buzzList);
  }, [buzzList]);

  const filterOptions = [
    {displayValue: "Activity Buzz", value: "Activity"},
    {displayValue: "Lost & Found Buzz", value: "Lost & Found"}
  ];

  const likeDislikeHandler = (id, actionType) => {
    onLikeDislikeBuzz(actionType, id);
  };

  const filterHandler = (category) => {
    const filteredBuzzs = buzzList.filter(buzz => buzz.category === category);
    setBuzzs(filteredBuzzs);
  }


  const checkSelected = (likedDislikedArray, userId) => {
    const element = likedDislikedArray.find((elem) => elem._id === userId);
    if (!element) {
      return false;
    }
    return true;
  };

  const loadMore = useCallback(() => {
    setPageNo(pageNo + 1);
    onLoadMoreBuzz(pageNo + 1);
  } , [pageNo, onLoadMoreBuzz]);

  let headerIcon = <BsChatQuoteFill />;

  return (
    <div className={classes.Buzz}>
      <NewBuzz />
      <BoxLayout 
          heading="Recent Buzz" 
          icon={headerIcon} 
          filterHandler={filterHandler} 
          filters={filterOptions}>

        <div className={classes.List}>
          {/* <InfiniteScroll
              dataLength={totalBuzzCount}
              next={() => loadMore()}
              hasMore={totalBuzzCount !== pageNo}
              loader={<h4>Loading...</h4>}> */}
            {buzzs.length ? buzzs.map((buzz) => (
              <BuzzItem
                key={buzz._id}
                buzzId={buzz._id}
                creatorEmail={buzz.createdBy.email}
                loggedInEmail={user.email}
                creatorName={buzz.createdBy.name}
                desc={buzz.description}
                createdOn={buzz.createdOn}
                imageUrl={buzz.image}
                category={buzz.category}
                comments={buzz.comments} // no. of comments
                likes={buzz.likes}
                likedBy={buzz.likedBy}
                dislikedBy={buzz.dislikedBy}
                dislikes={buzz.dislikes}
                selectedLike={checkSelected(buzz.likedBy, user._id)}
                selectedDislike={checkSelected(buzz.dislikedBy, user._id)}
                likeDislikeHandler={likeDislikeHandler}
                deleteBuzzHandler={onDeleteBuzz}
              />
            )): <p className={classes.NoResultText}>No Buzz Found!</p>}
          {totalBuzzCount !== buzzs.length && <button onClick ={() => loadMore()}>LoadMore</button>}
          {/* </InfiniteScroll> */}
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
    totalBuzzCount: state.buzzData.totalBuzzCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBuzz: () => dispatch(buzzActions.initFetchBuzz()),
    onLoadMoreBuzz: (page) => dispatch(buzzActions.initLoadMoreBuzz(page)),
    onLikeDislikeBuzz: (buttonType, buzzId) =>
      dispatch(buzzActions.initLikeDislikeBuzz(buttonType, buzzId)),
    onDeleteBuzz: (buzzId) => dispatch(buzzActions.initDeleteBuzz(buzzId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buzz);
