const userService = require('./user.service');

exports.setAdmin = async (req, res) => {
  try {
    const updatedUser = await userService.setAdmin(req.params.email);
    res.status(200).send(updatedUser);
  } catch(err) {
    res.status(400).send(err);
  }
}