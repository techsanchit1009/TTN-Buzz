const checkAuth = (req, res, next) => {
  if(!req.user){
    res.status(401).send({
      authenticated: false,
    });
  } else {
    next();
  }
};

module.exports = checkAuth;