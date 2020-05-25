const router = require('express').Router();
const uploadImage = require('../../Middleware/multer.midware');
const complaintController = require('./complaint.controller');

router.get('/api/complaint', complaintController.getComplaints); 
router.post('/api/complaint', uploadImage.single('image'), complaintController.addComplaint);
router.patch('/api/complaint', complaintController.updateComplaintStatus) 


module.exports = router;