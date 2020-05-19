const router = require('express').Router();
const complaintController = require('./complaint.controller');

router.post('/addComplaint', complaintController.addComplaint);
router.get('/user/:id', complaintController.getUserComplaint);
router.get('/all', complaintController.getAllComplaints); // For Admin

module.exports = router;