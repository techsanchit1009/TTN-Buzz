const complaintService = require('./complaint.service');
const cloudinary = require('cloudinary');
const validator = require('../../Libs/validator.lib');

exports.addComplaint = async (req, res) => {
  let newComplaint = {
    email: req.body.email,
    name: req.body.name,
    title: req.body.title,
    dept: req.body.dept,
    description: req.body.description,
    complaintBy: req.user._id
  };

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    newComplaint = {
      ...newComplaint,
      image: result.secure_url
    }
  }

  try {
    const errors = validator(req.body, 'complaint'); // Handling server side validation
    if(errors.length){
      return res.status(422).send(errors); // sending errorArray if validation failed
    }
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
      const complaints = await complaintService.getAllComplaints();  // For Admin
      res.send(complaints);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}


// For Admin
exports.updateComplaint = async (req, res) => {
  try{
    if(req.query.complaintId){
 
      if(req.body.status){
        const updatedStatus = req.body.status;
        await complaintService.updateComplaintStatus(req.query.complaintId, updatedStatus);
      } else if(req.body.assignedTo) {
        const assignedTo = req.body.assignedTo;
        await complaintService.updateComplaintAssignedTo(req.query.complaintId, assignedTo);
      }

      res.send('Updated Successfully');
    } else {
      res.send('Missing complaint id');
    }
  } catch (err) {
    res.status(400).send(err);
  }
}