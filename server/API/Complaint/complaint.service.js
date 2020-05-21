const Complaint = require('./complaint.model');
const sharedServices = require('../shared.service');

exports.addComplaint = async (complaint) => {
  const user = await sharedServices.getUser(complaint.email);
  const newComplaint = {
    ...complaint,
    complaintBy: user._id
  }

  const respComplaint = await Complaint.create(newComplaint);
  user.complaints.push(respComplaint);
  await user.save(); // adding complaint objectID in user complaints Array
  return respComplaint;
};

exports.getUserComplaint = (id) => {
  const complaints = Complaint.find({complaintBy: id}).sort({ createdOn: -1 });
  return complaints;
}

// For Admin Route
exports.getAllComplaints = () => {
    const complaints = Complaint.find({}).sort({ createdOn: -1 });
    return complaints;
}

exports.updateComplaintStatus = (id, updatedStatus) => {
  const data = Complaint.updateOne({_id: id}, { status: updatedStatus})
  return data;
}