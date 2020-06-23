const router = require("express").Router();
const uploadImage = require("../../Middleware/multer.midware");
const commentController = require("./comment.controller");
const checkAuth = require('../../Middleware/checkAuth.midware');

router.get( // Get comments linked to buzzId
  "/api/comment/:buzzId", // ?page=pageno for setting the pagination
  checkAuth,
  commentController.getComments
);

router.post(
  "/api/comment/:buzzId",
  checkAuth,
  uploadImage.single("image"),
  commentController.addComment
);

router.delete( // will delete the related replies also
  "/api/comment/:commentId", 
  checkAuth,
  commentController.deleteComment
);

router.get(
  "/api/commentReply/:commentId",  // ?page=pageno for setting the pagination
  checkAuth,
  commentController.getReplies
);

router.post(
  "/api/commentReply/:commentId/:buzzId", 
  checkAuth,
  commentController.addReply
);


module.exports = router;
