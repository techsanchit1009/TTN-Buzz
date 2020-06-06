const checkAuth = (req, res, next) => {
  console.log(req.user);
  if(!req.user){
    res.status(401).send({
      authenticated: false,
    });
  } else {
    next();
  }
};

module.exports = checkAuth;