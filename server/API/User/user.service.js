const User = require('./user.model');

exports.setAdmin = async (userId) => {
  const user = await User.findById(userId);
  user.userType = 'Admin';
  await user.save();
  return user;
}