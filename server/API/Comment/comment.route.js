const router = require('express').Router();
const uploadImage = require('../../Middleware/multer.midware');
const commentController = require('./comment.controller');

router.get('/api/comment/:buzzId', commentController.getComments); // Get comments linked to buzzId
router.post('/api/comment/:buzzId', uploadImage.single('image'), commentController.addComment);
router.delete('/api/comment/:commentId', commentController.deleteComment);

router.post('/api/commentReply/:commentId/:buzzId', commentController.addReply);
router.get('/api/commentReply/:commentId', commentController.getReplies);

module.exports = router;