const User = require('./User/user.model');

// Use _id instead of email (changes required in future)
exports.getUser = (email) => {
  try {
    const user = User.findOne({ email: email })
    if(user) {
      return user;
    }
  } catch(err) {
    throw err;
  }
}
