const router = require("express").Router();
const uploadImage = require("../../Middleware/multer.midware");
const commentController = require("./comment.controller");

router.get( // Get comments linked to buzzId
  "/api/comment/:buzzId", // ?page=pageno for setting the pagination
  commentController.getComments
);

router.post(
  "/api/comment/:buzzId",
  uploadImage.single("image"),
  commentController.addComment
);

router.delete( // will delete the related replies also
  "/api/comment/:commentId", 
  commentController.deleteComment
);

router.get(
  "/api/commentReply/:commentId",  // ?page=pageno for setting the pagination
  commentController.getReplies
);

router.post(
  "/api/commentReply/:commentId/:buzzId", 
  commentController.addReply
);


module.exports = router;
