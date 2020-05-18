const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
  },
  userType: {
    type: String,
    enum: ['employee', 'admin']
  },
  buzz: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buzz'
  }],
  complaints: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint'
  }]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
