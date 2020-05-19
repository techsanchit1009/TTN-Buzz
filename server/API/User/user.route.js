const router = require('express').Router();
const userController = require('./user.controller');

router.post('/login', userController.addUser);

module.exports = router;