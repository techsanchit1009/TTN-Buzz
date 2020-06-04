import React, { useEffect } from 'react';
import classes from './Resolve.module.css';
import BoxLayout from '../../Components/UI/BoxLayout/BoxLayout';
import ComplaintsTable from '../Complaint/ComplaintsTable/ComplaintsTable';
import * as action from '../../Store/Actions/index.actions';
import { connect } from 'react-redux';

const Resolve = (props) => {
  const {user, complaints, onFetchComplaints} = props;

  useEffect(() => {
    window.document.title="Resolve";
    onFetchComplaints();
  }, [onFetchComplaints]);
  return (
    <BoxLayout heading="Complaints">
      <ComplaintsTable userData={user} complaintData={complaints}/>
    </BoxLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
    complaints: state.complaintData.complaints
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComplaints: () => dispatch(action.initFetchAllComplaints())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resolve);