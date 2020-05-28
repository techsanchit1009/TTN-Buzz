import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./ComplaintsTable.module.css";
import { connect } from "react-redux";

const ComplaintsTable = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    setComplaints(props.complaints);
  }, [props.complaints]);

  let complaintTable = (
    <table className={classes.Table}>
        <thead>
          <tr>
            <th>Department</th>
            <th>Issue Id</th>
            {isAdmin && <th>Locked By</th>}
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint._id}>
              <td>{complaint.dept}</td>
              <td>2</td>
              <td>{complaint.assignedTo}</td>
              {isAdmin ? <td className={classes.Status}>
              {complaint.status}
                <IoIosArrowDown className={classes.Arrow} />
              </td> : <td>{complaint.status}</td>}
          </tr>
          ))}
        </tbody>
      </table>
  );
  
  return (
    <div className={classes.ComplaintsTable}>
      <div className={classes.Header}>Your Complaints</div>
        {complaints.length ? complaintTable : <p className={classes.NoComplaintText}>No Complaints Found</p>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userData.user._id,
    complaints: state.complaintData.complaints
  }
}


export default connect(mapStateToProps)(ComplaintsTable);
