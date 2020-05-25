const router = require('express').Router();
const uploadImage = require('../../Middleware/multer.midware');
const buzzController = require('./buzz.controller');

router.get('/api/buzz', buzzController.getAllBuzz);
router.post('/api/buzz', uploadImage.single('image'), buzzController.addBuzz);

module.exports = router;