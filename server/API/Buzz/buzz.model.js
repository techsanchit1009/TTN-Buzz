const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Activity', 'Lost & Found']
  },
  image: {
    type: String
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdOn: {
    type: Date,
    default: new Date()
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {versionKey: false});

const buzzModel = mongoose.model('Buzz', buzzSchema);

module.exports = buzzModel;
