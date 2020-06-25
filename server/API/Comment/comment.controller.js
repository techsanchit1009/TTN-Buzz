const commentService = require('./comment.service');
const cloudinary = require('cloudinary');


exports.addComment = async (req, res) => {
  const { buzzId } = req.params;
  let newComment = {
    content: req.body.comment,
    buzzId: buzzId,
    contentType: 'Comment',
    commentedBy: req.user._id // "5ee89464acc2582a9a53a2d4" for testing
  }

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    newComment = {
      ...newComment,
      image: result.secure_url
    }
  }

  try{
    // Add validations
    const comments = await commentService.addComment(newComment, buzzId);
    res.status(201).send(comments);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.getComments = async (req, res) => {
  try{
    const page = +req.query.page;
    const { buzzId } = req.params;
    const {allComments, totalComments} = await commentService.getComments(buzzId, page);
    res.status(200).send({comments: allComments, totalComments});
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.deleteComment = async (req, res) => {
  try{
    const { commentId } = req.params;
    const result = await commentService.deleteComment(commentId);
    if(result.ok && result.deletedCount > 0){
      res.status(200).send({message: 'Comment Removed Successfully!'});
    } else {
      res.status(200).send({message: 'No such comment found'});
    }
  } catch(err) {
    res.status(400).send(err);
  }
}

/* ------Replies controller----------- */

exports.addReply = async (req, res) => {
  const { commentId, buzzId } = req.params;
  let newReply = {
    content: req.body.reply,
    parentComment: commentId,
    buzzId: buzzId,
    contentType: 'Reply',
    commentedBy: req.user._id // "5ee89464acc2582a9a53a2d4" for testing
  }

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    newReply = {
      ...newReply,
      image: result.secure_url
    }
  }
  try{
    // Add validations
    const comments = await commentService.addComment(newReply, buzzId);
    res.status(201).send(comments);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.getReplies = async (req, res) => {
  try{
    const page = +req.query.page;
    const { commentId } = req.params;
    const {allReplies, totalReplies} = await commentService.getReplies(commentId, page);
    res.status(200).send({replies: allReplies, totalReplies});
  } catch(err) {
    res.status(400).send(err);
  }
}