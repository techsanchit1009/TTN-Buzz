const app = require('express').Router();
const userRoutes = require('../API/User/user.route');
const complaintRoutes = require('../API/Complaint/complaint.route');

app.use('/auth', userRoutes);
app.use('/api/complaint', complaintRoutes);

module.exports = app;