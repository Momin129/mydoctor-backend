const express = require("express");

const {
  updateDetails,
} = require("../controllers/doctors/updateDetailsController");

const router = express.Router();

router.post("/updateDoctor", updateDetails);

module.exports = router;
