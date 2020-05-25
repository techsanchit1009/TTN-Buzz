import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./ComplaintsTable.module.css";

const ComplaintsTable = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className={classes.ComplaintsTable}>
      <div className={classes.Header}>Your Complaints</div>

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
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            {isAdmin ? <td className={classes.Status}>
             Open
              <IoIosArrowDown className={classes.Arrow} />
            </td> : <td>Open</td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
