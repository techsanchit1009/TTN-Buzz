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
  profilePic:{
    type: String
  },
  userType: {
    type: String,
    default: 'Employee',
    enum: ['Employee', 'Admin']
}
}, {versionKey: false});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
