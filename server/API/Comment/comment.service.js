const Comment = require("./comment.model");
const Buzz = require("../Buzz/buzz.model");

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

exports.getComments = (buzzId, page) => {
  const allComments = Comment.find({ buzzId: buzzId, contentType: "Comment" }) // show only the comments
    .skip(10 * (page - 1))
    .limit(10) // 10 items to display
    .populate("commentedBy", "name email")
    .sort({ createdAt: -1 });
  return allComments;
};

exports.getReplies = (commentId, page) => {
  const allReplies = Comment.find({ parentComment: commentId })
    .skip(10 * (page - 1))
    .limit(10) // 10 items to display
    .populate("commentedBy", "name email")
    .sort({ createdAt: -1 });

  return allReplies;
};

exports.deleteComment = async (commentId) => {
  const comment = await Comment.findById(commentId); // to get the buzzId
  const result = await Comment.deleteMany({
    $or: [{ _id: commentId }, { parentComment: commentId }],
  });

  const buzz = await Buzz.findById(comment.buzzId);
  buzz.comments = buzz.comments - result.deletedCount; // updating the comments count
  await buzz.save();
  return result;
  // await Comment.findByIdAndDelete(commentId);
};
