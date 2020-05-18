const mongoose = require('mongoose');

module.exports.dbConnection = mongoose.connect("mongodb://localhost:27017/ttn-buzz", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));