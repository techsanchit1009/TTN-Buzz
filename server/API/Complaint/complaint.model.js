const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true,
    enum: ['Admin', 'IT', 'Infra', 'HR']
  },
  description: {
    type: String
  },
  image: {
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
});

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;
