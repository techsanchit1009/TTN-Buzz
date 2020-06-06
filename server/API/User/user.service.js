const User = require('./user.model');

exports.setAdmin = async (email) => {
  const user = await User.findOne({email : email});
  user.userType = 'Admin';
  await user.save();
  return user;
}