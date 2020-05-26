const router = require('express').Router();
const passport = require('passport');
const checkAuth = require('../../Middleware/checkAuth.midware');
const userController = require('./user.controller');

router.post('/auth/login', userController.addUser); 

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/redirect', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard/buzz',
  failureRedirect:'http://localhost:3000/?error=Access Denied'
}));

router.get('/auth/success', checkAuth, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
    cookie: req.cookies
  })
});

router.get('/auth/logout', (req, res) => {
  req.session = null; // For clearing the cookie session
  req.logout();  // Removes the user data
  res.redirect('http://localhost:3000');
});


module.exports = router;