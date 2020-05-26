const router = require('express').Router();
const passport = require('passport');
const userController = require('./user.controller');

router.post('/auth/login', userController.addUser); 

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/redirect', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard/buzz',
  failureRedirect:'http://localhost:3000/?error=Access Denied'
}));

router.get('/auth/success', (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
    cookie: req.cookies
  })
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  // res.redirect('http://localhost:3000');
  // Not complete.. (cookie not removing and not also redirecting)
  res.send('Logged out successfully');
});


module.exports = router;