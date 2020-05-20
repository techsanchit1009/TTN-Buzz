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
