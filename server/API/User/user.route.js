const router = require('express').Router();
const userController = require('./user.controller');

router.patch('/user/set-admin/:email', userController.setAdmin); // to set a user as admin

module.exports = router;