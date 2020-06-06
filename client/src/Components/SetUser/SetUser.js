import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as action from '../../Store/Actions/index.actions';

const SetUser = (props) => {
  const {onFetchUser} = props;
  useEffect(() => {
    onFetchUser();
  }, [onFetchUser]);

  return(
    <Redirect to="/dashboard" />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(action.initFetchUser())
  }
}

export default connect(null, mapDispatchToProps)(SetUser);