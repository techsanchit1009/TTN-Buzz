const User = require('./user.model');

exports.addUser = (userData) => {
    const resp = User.create(userData);
    return resp;
}
