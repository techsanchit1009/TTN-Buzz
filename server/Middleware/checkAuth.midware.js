const checkAuth = (req, res, next) => {
  if(!req.user){
    // console.log('not validated');
    res.status(401).json({
      authenticated: false,
    });
  } else {
    // console.log('validated');
    next();
  }
};

module.exports = checkAuth;