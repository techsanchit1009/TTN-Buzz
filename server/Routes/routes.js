const app = require('express').Router();
const authRoutes = require('../API/User/auth.route');
const userRoutes = require('../API/User/user.route');
const complaintRoutes = require('../API/Complaint/complaint.route');
const buzzRoutes = require('../API/Buzz/buzz.route');
const commentRoutes = require('../API/Comment/comment.route');

app.use(authRoutes);
app.use(complaintRoutes);
app.use(buzzRoutes);
app.use(userRoutes);
app.use(commentRoutes);


module.exports = app;