const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  email: {
    type: String,
    required:true,
  },
  name: {
    type: String,
    required:true,
  },
  title: {
    type: String,
    required:true,
  },
  dept: {
    type: String,
    required:true,
    enum: ['Admin', 'IT', 'Infra', 'HR']
  },
  description: {
    type: String,
    required:true,
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
  this.set({ updatedOn: Date.now() });
});

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;
