const router = require("express").Router();
const uploadImage = require("../../Middleware/multer.midware");
const complaintController = require("./complaint.controller");
const checkAuth = require("../../Middleware/checkAuth.midware");

router.get(
  "/api/complaint",  // ?page=pageno for setting the pagination
  checkAuth, 
  complaintController.getComplaints
);

router.post(
  "/api/complaint",
  checkAuth,
  uploadImage.single("image"),
  complaintController.addComplaint
);

router.patch(
  "/api/complaint", 
  checkAuth, 
  complaintController.updateComplaint
);


module.exports = router;