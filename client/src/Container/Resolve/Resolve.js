import React, { useEffect, useState } from "react";
import BoxLayout from "../../Components/UI/BoxLayout/BoxLayout";
import ComplaintsTable from "../Complaint/ComplaintsTable/ComplaintsTable";
import * as action from "../../Store/Actions/index.actions";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";


const Resolve = (props) => {
  const { 
    user, 
    complaints, 
    onFetchComplaints, 
    onInitUpdateComplaintStatus, 
    onInitUpdateComplaintAssignee,
    loadingComplaints
  } = props;

  const [complaintList, setComplaintList] = useState([]);

  const filterOptions = [
    {displayValue: "HR", value: "HR"},
    {displayValue: "Admin", value: "Admin"},
    {displayValue: "IT", value: "IT"},
    {displayValue: "Infra", value: "Infra"},
  ];

  useEffect(() => {
    window.document.title = "Resolve";
    onFetchComplaints();
  }, [onFetchComplaints]);

  useEffect(() => {
    setComplaintList(complaints);
  }, [complaints]);

  const updateStatusHandler = (complaintId, updatedStatus) => {
    onInitUpdateComplaintStatus(complaintId, updatedStatus);
  };

  const updateAssigneeHandler = (complaintId, assignedTo) => {
    onInitUpdateComplaintAssignee(complaintId, assignedTo);
  }

  const deptFilterHandler = (dept) => {
    const filteredComplaints = complaints.filter(complaint => complaint.dept === dept);
    setComplaintList(filteredComplaints);
  }

  return (
    <BoxLayout heading="Complaints" filterHandler={deptFilterHandler} filters={filterOptions}>
      <ComplaintsTable
        userData={user}
        complaintData={complaintList}
        updateStatusHandler={updateStatusHandler}
        updateAssigneeHandler={updateAssigneeHandler}
      />
      {loadingComplaints && <Spinner />}
    </BoxLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
    complaints: state.complaintData.complaints,
    loadingComplaints: state.complaintData.loadingComplaints
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComplaints: () => dispatch(action.initFetchAllComplaints()),
    onInitUpdateComplaintStatus: (complaintId, updatedStatus) =>
      dispatch(action.initUpdateComplaintStatus(complaintId, updatedStatus)),
    onInitUpdateComplaintAssignee: (complaintId, assignedTo) =>
      dispatch(action.initUpdateComplaintAssignee(complaintId, assignedTo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resolve);
