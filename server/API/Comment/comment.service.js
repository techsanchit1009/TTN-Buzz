const Comment = require("./comment.model");
const Buzz = require('../Buzz/buzz.model');

exports.addComment = async (newComment, buzzId) => {
  const addedComment = await Comment.create(newComment);
  const buzz = await Buzz.findById(buzzId);
  buzz.comments++; // updating the comments count
  await buzz.save();
  let populatedResponse = addedComment
    .populate("commentedBy", "name email")
    .execPopulate();
  return populatedResponse;
};

exports.getComments = (buzzId) => {
  const allComments = Comment.find({ buzzId: buzzId, parentComment: null}) // show only the comments
    .populate("commentedBy", "name email")
    .sort({ createdAt: -1 });
  return allComments;
};

exports.getReplies = (commentId) => {
  const allReplies = Comment.find({ parentComment: commentId})
      .populate("commentedBy","name email")
      .sort({ createdAt: -1 });
  
  return allReplies;
}

exports.deleteComment = async (commentId) => {
  await Comment.findByIdAndDelete(commentId);
}
