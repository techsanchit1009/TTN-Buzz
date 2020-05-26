const app = require('express').Router();
const userRoutes = require('../API/User/user-auth.route');
const complaintRoutes = require('../API/Complaint/complaint.route');
const buzzRoutes = require('../API/Buzz/buzz.route');

app.use(userRoutes);
app.use(complaintRoutes);
app.use(buzzRoutes);

module.exports = app;