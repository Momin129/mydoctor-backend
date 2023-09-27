const express = require("express");
const {
  updatePersonalDetails,
} = require("../controllers/doctors/updatePersonalDetailsController");

const router = express.Router();

router.post("/updateDoctor", updatePersonalDetails);

module.exports = router;
