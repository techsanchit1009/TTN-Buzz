const Complaint = require('./complaint.model');

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

exports.updateComplaintStatus = (id, updatedStatus) => {
  const updatedComplaint = Complaint.updateOne({_id: id}, {status: updatedStatus});
  return updatedComplaint;
}

exports.updateComplaintAssignedTo = (id, assignedTo) => {
  const updatedComplaint = Complaint.updateOne({ _id: id}, {assignedTo: assignedTo});
  return updatedComplaint;
}
