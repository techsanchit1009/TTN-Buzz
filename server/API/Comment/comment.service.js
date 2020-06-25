const Comment = require("./comment.model");
const Buzz = require("../Buzz/buzz.model");

exports.addComment = async (newComment, buzzId) => {
  const addedComment = await Comment.create(newComment);
  const buzz = await Buzz.findById(buzzId);
  buzz.comments++; // updating the comments count
  await buzz.save();
  let populatedResponse = addedComment
    .populate("commentedBy", "name email profilePic")
    .execPopulate();
  return populatedResponse;
};

exports.getComments = async (buzzId, page) => {
  const totalComments = await Comment.find({ buzzId: buzzId, contentType: "Comment" }).countDocuments();
  const allComments = await Comment.find({ buzzId: buzzId, contentType: "Comment" }) // show only the comments
    .skip(1 * (page - 1))
    .limit(1) // 10 items to display
    .populate("commentedBy", "name email profilePic")
    .sort({ createdAt: -1 });
  return {allComments, totalComments};
};

exports.getReplies = async (commentId, page) => {
  const totalReplies = await Comment.find({ parentComment: commentId}).countDocuments();
  const allReplies = await Comment.find({ parentComment: commentId })
    .skip(1 * (page - 1))
    .limit(1) // 10 items to display
    .populate("commentedBy", "name email")
    .sort({ createdAt: -1 });

  return {allReplies, totalReplies};
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
