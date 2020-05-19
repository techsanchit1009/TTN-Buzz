const complaintService = require('./complaint.service');

exports.addComplaint = (req, res) => {
  let newComplaint = {
    email: req.body.email,
    name: req.body.name,
    title: req.body.title,
    dept: req.body.dept,
    description: req.body.description,
    status: req.body.status,
    complaintBy: req.body.complaintBy
  };
  complaintService.addComplaint(newComplaint, res);
}

exports.getUserComplaint = (req, res) => {
  complaintService.getUserComplaint(req.params.id, res);
}


// For Admin
exports.getAllComplaints = (req, res) => {
  complaintService.getAllComplaints(res); 
}