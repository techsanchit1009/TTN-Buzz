import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./ComplaintsTable.module.css";

const ComplaintsTable = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { userData, complaintData, location, updateStatusHandler, updateAssigneeHandler } = props;

  useEffect(() => {
    if (
      userData.userType === "Admin" &&
      location.pathname === "/dashboard/resolve"
    ) {
      setIsAdmin(true);
    }
  }, [complaintData, userData.userType, location.pathname]);

  const complaintStatus = (status) => {
    if(status === 'Open'){
      return <span style={{color: 'red'}}>{status}</span>;
    } else if (status === 'In-Progress'){
      return <span style={{color: 'blue'}}>{status}</span>;
    } else {
      return <span style={{color: 'green'}}>{status}</span>;
    }
  }


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

            {isAdmin ? (
              <td className={classes.Assigned}>
                  <IoIosArrowDown className={classes.Arrow} />
                <select 
                      defaultValue={complaint.assignedTo}
                      onChange={(event) => updateAssigneeHandler(complaint._id, event.target.value)} 
                      className={classes.Select}>
                <option defaultValue="DEFAULT" hidden disabled>{complaint.assignedTo}</option>
                  <optgroup label="Admin" disabled={ complaint.dept !== 'Admin' }>
                    <option value="Mukesh Mishra">Mukesh Mishra</option>
                  </optgroup>
                  <optgroup label="HR" disabled={ complaint.dept !== 'HR' }>
                      <option value="Shakshi Aggarwal">Shakshi Aggarwal</option>
                  </optgroup>
                  <optgroup label="IT" disabled={ complaint.dept !== 'IT' }>
                    <option value="Abhishek Singh">Abhishek Singh</option>
                  </optgroup>
                  <optgroup label="Infra" disabled={ complaint.dept !== 'Infra' }>
                    <option value="Rohit Kumar">Rohit Kumar</option>
                  </optgroup>
                </select>
               
              </td>
            ) : (
              <td>{complaint.assignedTo}</td>
            )}

            {isAdmin ? (
              <td className={classes.Status}>
                  <IoIosArrowDown className={classes.Arrow} />
                <select 
                      defaultValue={complaint.status}
                      onChange={(event) => updateStatusHandler(complaint._id, event.target.value)} 
                      className={classes.Select}>
                  <option value="Open" style={{color: 'red'}}>Open</option>
                  <option value="In-Progress" style={{color: 'blue'}}>In-Progress</option>
                  <option value="Resolved" style={{color: 'green'}}>Resolved</option>
                </select>
               
              </td>
            ) : (
              <td>{complaintStatus(complaint.status)}</td>
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
