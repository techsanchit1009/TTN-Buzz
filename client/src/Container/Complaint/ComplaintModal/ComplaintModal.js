import React from "react";
import Modal from "../../../Components/UI/Modal/Modal";
import moment from "moment";
import classes from "./ComplaintModal.module.css";

const ComplaintModal = (props) => {
  const { selectedId, complaintData, closeModalHandler } = props;
  return (
    <Modal
      heading={`Issue ID: ${selectedId}`}
      closeModalHandler={closeModalHandler}
    >
      <div className={classes.ComplaintModal}>
        {complaintData
          .filter((complaint) => complaint.issueId === selectedId)
          .map((complaint) => (
            <div key={complaint._id}>
              <span className={classes.Label}>Title</span>
              <span className={classes.Data}>{complaint.title}</span>
              <span className={classes.Label}>Created By</span>
              <span className={classes.Data}>{complaint.name}</span>
              <span className={classes.Label}>Department</span>
              <span className={classes.Data}>{complaint.dept}</span>
              <span className={classes.Label}>Description</span>
              <span className={classes.Data}>{complaint.description}</span>
              {complaint.image && <span className={classes.Label}>Image</span>}
              {complaint.image && (
                <span className={classes.Data}>
                  <a
                    href={complaint.image}
                    alt={complaint.issueId}
                    target="blank"
                  >
                    <span
                      style={{ backgroundImage: `url("${complaint.image}")` }}
                      className={classes.ImageBlock}
                    ></span>
                  </a>
                </span>
              )}
              <span className={classes.Label}>Created On</span>
              <span className={classes.Data}>
                {moment(complaint.createdOn).format("MMMM Do YYYY, h:mm A")}
              </span>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default ComplaintModal;
