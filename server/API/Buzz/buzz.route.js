const router = require('express').Router();
const uploadImage = require('../../Middleware/multer.midware');
const buzzController = require('./buzz.controller');
const checkAuth = require('../../Middleware/checkAuth.midware');

router.get(
  '/api/buzz', // ?page=pageno for setting the pagination
  checkAuth, 
  buzzController.getAllBuzz
);

router.post(
  '/api/buzz', 
  checkAuth,
  uploadImage.single('image'), 
  buzzController.addBuzz
);

router.patch(
  '/api/buzz/:action/:buzzId', 
  checkAuth, 
  buzzController.likeDislikeBuzz
);

router.delete(
  '/api/buzz/:buzzId', 
  checkAuth, 
  buzzController.deleteBuzz
);

module.exports = router;