const router = require('express').Router();
const complaintController = require('./complaint.controller');

router.get('/api/complaint', complaintController.getComplaints); // For Admin
router.post('/api/complaint', complaintController.addComplaint);
router.patch('/api/complaint', complaintController.updateComplaintStatus) 


module.exports = router;