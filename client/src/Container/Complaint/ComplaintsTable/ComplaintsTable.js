import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./ComplaintsTable.module.css";

const ComplaintsTable = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { userData, complaintData, location } = props;

  useEffect(() => {
    if (
      userData.userType === "Admin" &&
      location.pathname === "/dashboard/resolve"
    ) {
      setIsAdmin(true);
    }
  }, [complaintData, userData.userType, location.pathname]);

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
        {complaintData.map((complaint) => (
          <tr key={complaint._id}>
            <td>{complaint.dept}</td>
            <td>{complaint.issueId}</td>
            {isAdmin && <td>{complaint.complaintBy.name}</td>}
            <td>{complaint.assignedTo}</td>
            {isAdmin ? (
              <td className={classes.Status}>
                <label htmlFor="select">
                  <IoIosArrowDown className={classes.Arrow} />
                <select id="select" defaultValue={complaint.status} className={classes.StatusSelect}>
                  <option value="Open">Open</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Resolve">Resolved</option>
                </select>
                </label>
               
              </td>
            ) : (
              <td>{complaint.status}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {complaintData.length ? (
        complaintTable
      ) : (
        <p className={classes.NoComplaintText}>No Complaints Found</p>
      )}
    </div>
  );
};

export default withRouter(ComplaintsTable);
