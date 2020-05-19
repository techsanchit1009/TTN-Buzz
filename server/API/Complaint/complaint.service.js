const Complaint = require('./complaint.model');

exports.addComplaint = (complaint, res) => {
  Complaint.create(complaint, (err, complaint) => {
    if(err) {
      res.send(err);
    } else {
      res.send(complaint);
    }
  });
};

exports.getUserComplaint = (id, res) => {
  Complaint.find({complaintBy: id}, (err, complaints) => {
    if(err) {
      res.send(err);
    } else {
      res.send(complaints);
    }
  })
}

// For Admin Route
exports.getAllComplaints = (res) => {
  Complaint.find({}, (err, complaints) => {
    if(err) {
      res.send(err);
    } else {
      res.send(complaints);
    }
  })
}