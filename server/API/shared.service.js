const User = require('./User/user.model');

exports.getUser = (email) => {
  try {
    const user = User.findOne({ email: email })
    if(user) {
      return user;
    } else {
      return 'user not found'
    }
  } catch(err) {
    throw err;
  }
}
