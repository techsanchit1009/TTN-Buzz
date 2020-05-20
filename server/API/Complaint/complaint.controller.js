const complaintService = require('./complaint.service');

exports.addComplaint = async (req, res) => {
  let newComplaint = {
    email: req.body.email,
    name: req.body.name,
    title: req.body.title,
    dept: req.body.dept,
    description: req.body.description,
    status: req.body.status,
    complaintBy: req.body.complaintBy
  };

  try {
    const complaint = await complaintService.addComplaint(newComplaint);
    res.send(complaint);
  } catch (err) {
    res.status(400).send(err);
  }
};


exports.getComplaints = async (req, res) => {
  try {
    if(req.query.complaintBy){
      const complaints = await complaintService.getUserComplaint(req.query.complaintBy);
      res.send(complaints);
    } else {
      const complaints = await complaintService.getAllComplaints(res);  // For Admin
      res.send(complaints);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}


// For Admin
exports.updateComplaintStatus = async (req, res) => {
  try{
    if(req.query.complaintId){
      const updatedStatus = req.body.status;
      await complaintService.updateComplaintStatus(req.query.complaintId, updatedStatus, res);
      res.send('Updated Successfully');
    } else {
      res.send('Missing complaint id');
    }
  } catch (err) {
    res.status(400).send(err);
  }
}