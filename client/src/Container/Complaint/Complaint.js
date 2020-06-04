import React, { useEffect } from 'react'
import classes from './Complaint.module.css';
import NewComplaint from './NewComplaint/NewComplaint';
import ComplaintsTable from './ComplaintsTable/ComplaintsTable';
import BoxLayout from '../../Components/UI/BoxLayout/BoxLayout';
import * as action from '../../Store/Actions/index.actions';
import { connect } from 'react-redux';

const Complaint = (props) => {
  const {user, complaints, onFetchUserComplaints} = props;

  useEffect(() => {
    window.document.title = 'Complaint';
    if(user){
      onFetchUserComplaints(user._id);
    }
  }, [onFetchUserComplaints, user]);
  return (
    <div className={classes.Complaint}> 
      <NewComplaint />
      <BoxLayout heading="Your Complaints">
        <ComplaintsTable userData={user} complaintData={complaints}/>
      </BoxLayout>
    </div>
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
    onFetchUserComplaints: (userId) => dispatch(action.initFetchUserComplaints(userId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Complaint);