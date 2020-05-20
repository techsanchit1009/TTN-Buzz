const userService = require('./user.service');

exports.addUser = async (req, res) => {
  let newUser = {
    email: req.body.email,
    name: req.body.name,
    userType: req.body.userType
  };
  
  try {
    const user = await userService.addUser(newUser);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
}
