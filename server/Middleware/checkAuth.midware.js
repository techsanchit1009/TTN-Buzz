const checkAuth = (req, res, next) => {
  if(!req.user){
    res.status(401).send({
      authenticated: false,
      message: 'Please login first'
    });
  } else {
    next();
  }
};

module.exports = checkAuth;