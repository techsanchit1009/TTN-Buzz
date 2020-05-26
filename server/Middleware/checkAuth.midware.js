const checkAuth = (req, res, next) => {
  if(!req.user){
    res.status(400).json({
      authenticated: false,
    });
  } else {
    next();
  }
};

module.exports = checkAuth;