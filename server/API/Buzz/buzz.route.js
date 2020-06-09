const router = require('express').Router();
const uploadImage = require('../../Middleware/multer.midware');
const buzzController = require('./buzz.controller');
const checkAuth = require('../../Middleware/checkAuth.midware');
const {buzzValidationResult, buzzValidator} = require('../../Middleware/Validation/buzzValidator.midware');
const { validator } = require('../../Middleware/Validation/validator.midware'); //temp validator

router.get('/api/buzz', checkAuth, buzzController.getAllBuzz);
router.post('/api/buzz', checkAuth, uploadImage.single('image'), buzzController.addBuzz);
router.patch('/api/buzz/:action/:buzzId', checkAuth, buzzController.likeDislikeBuzz);

module.exports = router;