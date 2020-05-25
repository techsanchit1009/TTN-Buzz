import React, { useEffect } from 'react'
import classes from './Complaint.module.css';
import NewComplaint from './NewComplaint/NewComplaint';
import ComplaintsTable from './ComplaintsTable/ComplaintsTable';

const Complaint = () => {
  useEffect(() => {
    window.document.title = 'Complaint';
  }, []);
  return (
    <div className={classes.Complaint}> 
      <NewComplaint />
      <ComplaintsTable />
    </div>
  );
}

export default Complaint;