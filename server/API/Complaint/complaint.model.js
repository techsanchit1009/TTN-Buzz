const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be empty!"]
  },
  name: {
    type: String,
    required: [true, "Name cannot be empty!"]
  },
  title: {
    type: String,
    required: [true, "Issue Title cannot be empty!"]
  },
  dept: {
    type: String,
    required: [true, "Select a valid department type"],
    enum: ['Admin', 'IT', 'Infra', 'HR']
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty!"]
  },
  image: {
    type: String
  },
  issueId: {
    type: String
  },
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'In-Progress', 'Resolved']
  },
  complaintBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: String,
    default: "Un Assigned"
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false});

complaintSchema.pre('updateOne', function(){
  this.set({ updatedOn: new Date() });
});

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;
