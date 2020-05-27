const app = require('express').Router();
const userRoutes = require('../API/User/user-auth.route');
const complaintRoutes = require('../API/Complaint/complaint.route');
const buzzRoutes = require('../API/Buzz/buzz.route');
const checkAuth = require('../Middleware/checkAuth.midware');

app.use(userRoutes);
app.use(complaintRoutes);
app.use(buzzRoutes);

// app.get('/', checkAuth, (req, res) => {
//   res.status(200).json({authenticated: true});
// });

module.exports = app;