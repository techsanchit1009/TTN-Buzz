const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description cannot be empty!"]
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
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  dislikedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {versionKey: false});

buzzSchema.pre('save', function(){
  this.set({likes: this.likedBy.length, dislikes: this.dislikedBy.length})
});

const buzzModel = mongoose.model('Buzz', buzzSchema);

module.exports = buzzModel;
