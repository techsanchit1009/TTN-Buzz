const Complaint = require('./complaint.model');
const sharedServices = require('../shared.service');

const generateIssueId = () => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for(let i=0; i<8; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result
}

exports.addComplaint = async (complaint, creatorEmail) => {
  const user = await sharedServices.getUser(creatorEmail);
  const newComplaint = {
    ...complaint,
    complaintBy: user._id,
    issueId: generateIssueId()
  }

  const respComplaint = await Complaint.create(newComplaint);
  user.complaints.push(respComplaint);
  await user.save(); // adding complaint objectID in user complaints Array
  return respComplaint;
};

exports.getUserComplaint = (id) => {
  const complaints = Complaint.find({complaintBy: id})
                              .populate('complaintBy','name email userType')
                              .sort({ createdOn: -1 });
  return complaints;
}

// For Admin Route
exports.getAllComplaints = () => {
    const complaints = Complaint.find({})
                                .populate('complaintBy')
                                .populate('complaintBy', 'name email userType')
                                .sort({ createdOn: -1 });
    return complaints;
}

exports.updateComplaintStatus = (id, updatedStatus) => {
  const updatedComplaint = Complaint.updateOne({_id: id}, {status: updatedStatus});
  return updatedComplaint;
}

exports.updateComplaintAssignedTo = (id, assignedTo) => {
  const updatedComplaint = Complaint.updateOne({ _id: id}, {assignedTo: assignedTo});
  return updatedComplaint;
}