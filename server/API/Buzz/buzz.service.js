const Buzz = require('./buzz.model');

exports.addBuzz = (newBuzz) => {
  const buzz = Buzz.create(newBuzz);
  return buzz;
};

exports.getAllBuzz = async () => {
  const allBuzz = Buzz.find({}).sort({ createdOn: -1 });
  return allBuzz;
};