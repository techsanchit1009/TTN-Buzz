module.exports.checkAuth = (req, res, next) => {
  if(!req.user){
    res.status(400).json({
      authenticated: false,
      message: "User not authenticated"
    })
  } else {
    next();
  }
};