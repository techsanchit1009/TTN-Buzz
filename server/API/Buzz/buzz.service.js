const Buzz = require('./buzz.model');
const sharedService = require('../shared.service');

exports.addBuzz = async (buzz, userEmail) => {
  const user = await sharedService.getUser(userEmail);
  const newBuzz = {
    ...buzz,
    createdBy: user._id
  }
  const resBuzz = await Buzz.create(newBuzz);
  user.buzz.push(resBuzz);
  await user.save();  // adding complaint objectID in user buzz Array
  return resBuzz;
};

exports.getAllBuzz = () => {
  const allBuzz = Buzz.find({}).sort({ createdOn: -1 });
  return allBuzz;
};