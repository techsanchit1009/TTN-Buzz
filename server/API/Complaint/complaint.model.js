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
}, {versionKey: false});


// some random IDs for now. will change it.
complaintSchema.pre('save', function(){
  if(this.dept === 'HR'){
    this.set({assignedTo: '5ec3e709552d0239263f94a1'});
  } else if(this.dept === 'IT') {
    this.set({assignedTo: '5ec3e709552d0239263f94a2'});
  } else if(this.dept === 'Infra') {
    this.set({assignedTo: '5ec3e709552d0239263f94a3'});
  } else if(this.dept === 'Admin') {
    this.set({assignedTo: '5ec3e709552d0239263f94a4'});
  }
})

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;
