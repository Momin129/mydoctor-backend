const express = require("express");

const {
  updateDetails,
} = require("../controllers/doctors/updateDetailsController");
const { getDetails } = require("../controllers/doctors/getDetailsController");

const router = express.Router();

router.post("/updateDoctor", updateDetails);
router.get("/getDetails", getDetails);

module.exports = router;
