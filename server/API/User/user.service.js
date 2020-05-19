const User = require('./user.model');

exports.addUser = (userData, res) => {
  User.create(userData, (err, user) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
};