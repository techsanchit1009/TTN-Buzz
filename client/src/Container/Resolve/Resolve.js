import React, { useEffect } from "react";
import BoxLayout from "../../Components/UI/BoxLayout/BoxLayout";
import ComplaintsTable from "../Complaint/ComplaintsTable/ComplaintsTable";
import * as action from "../../Store/Actions/index.actions";
import { connect } from "react-redux";


const Resolve = (props) => {
  const { 
    user, 
    complaints, 
    onFetchComplaints, 
    onInitUpdateComplaintStatus, 
    onInitUpdateComplaintAssignee 
  } = props;

  useEffect(() => {
    window.document.title = "Resolve";
    onFetchComplaints();
  }, [onFetchComplaints]);

  const updateStatusHandler = (complaintId, updatedStatus) => {
    onInitUpdateComplaintStatus(complaintId, updatedStatus);
  };

  const updateAssigneeHandler = (complaintId, assignedTo) => {
    onInitUpdateComplaintAssignee(complaintId, assignedTo);
  }

  return (
    <BoxLayout heading="Complaints">
      <ComplaintsTable
        userData={user}
        complaintData={complaints}
        updateStatusHandler={updateStatusHandler}
        updateAssigneeHandler={updateAssigneeHandler}
      />
    </BoxLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
    complaints: state.complaintData.complaints,
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
