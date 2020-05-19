module.exports.checkAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    res.status(501);
  }
};