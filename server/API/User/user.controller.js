const userService = require('./user.service');

exports.addUser = (req, res) => {
  let newUser = {
    email: req.body.email,
    name: req.body.name,
    userType: req.body.userType
  };
  userService.addUser(newUser, res);
}