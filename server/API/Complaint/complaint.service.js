const Complaint = require('./complaint.model');
const emailNotification = require('../../Libs/nodeMailer.lib');

const generateIssueId = () => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for(let i=0; i<8; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result
}

exports.addComplaint = async (complaint) => {
  const newComplaint = {
    ...complaint,
    issueId: generateIssueId()
  }

  const respComplaint = await Complaint.create(newComplaint);
  return respComplaint;
};

exports.getUserComplaint = async (id, pageNo) => {
  const totalComplaints = await Complaint.find({complaintBy: id}).countDocuments();
  const complaints = await Complaint.find({complaintBy: id})
                              .skip(10 * (pageNo - 1))
                              .limit(10) // 10 items to display
                              .populate('complaintBy','name email userType')
                              .sort({ createdOn: -1 });
  return {complaints, totalComplaints};
}

// For Admin Route
exports.getAllComplaints = async (pageNo) => {
  const totalComplaints = await Complaint.countDocuments();
  const complaints = await Complaint.find({})
                              .skip(2 * (pageNo - 1))
                              .limit(2) // 10 items to display
                              .populate('complaintBy')
                              .populate('complaintBy', 'name email userType')
                              .sort({ createdOn: -1 });
  return {complaints, totalComplaints};
}

exports.updateComplaintStatus = async (id, updatedStatus) => {
  const complaintData = await Complaint.findById(id)
    .populate("complaintBy", "email name -_id")
    .select("issueId -_id");
  const updateResponse = await Complaint.updateOne({_id: id}, {status: updatedStatus});
  
  if(updateResponse.ok && updateResponse.nModified > 0){
    let recipientEmail = complaintData.complaintBy.email;
    let subject = `Status Update! ( ${complaintData.issueId} )`;
    let body = `Hello ${complaintData.complaintBy.name}, Status of your complaint with ID: ${complaintData.issueId} is changed to - ${updatedStatus}.`;

    emailNotification(recipientEmail, subject, body); // Sending the mail
  }

  return updateResponse;
}

exports.updateComplaintAssignedTo = async (id, assignedTo) => {
  const complaintData = await Complaint.findById(id)
    .populate("complaintBy", "email name -_id")
    .select("issueId -_id");
  const updateResponse = await Complaint.updateOne({ _id: id}, {assignedTo: assignedTo});

  if(updateResponse.ok && updateResponse.nModified > 0){
    let recipientEmail = complaintData.complaintBy.email;
    let subject = `Complaint Assigned! ( ${complaintData.issueId} )`;
    let body = `Hello ${complaintData.complaintBy.name}, Your complaint  with ID: ${complaintData.issueId} is Assigned to - ${assignedTo}.`;

    emailNotification(recipientEmail, subject, body); // Sending the mail
  }

  return updateResponse;
}
