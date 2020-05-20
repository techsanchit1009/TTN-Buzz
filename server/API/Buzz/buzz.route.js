const router = require('express').Router();
const buzzController = require('./buzz.controller');

router.get('/api/buzz', buzzController.getAllBuzz);
router.post('/api/buzz', buzzController.addBuzz);

module.exports = router;