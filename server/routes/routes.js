const app = require('express').Router();
const userRoutes = require('../API/User/user.route');
const complaintRoutes = require('../API/Complaint/complaint.route');
const buzzRoutes = require('../API/Buzz/buzz.route');

app.use('/auth', userRoutes);
app.use(complaintRoutes);
app.use(buzzRoutes);

module.exports = app;