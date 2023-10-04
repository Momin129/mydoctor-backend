const express = require("express");
const {
  updateDetails,
} = require("../controllers/patients/updateDetailsController");
const { getDetails } = require("../controllers/patients/getDetailsController");
const {
  deletePatient,
} = require("../controllers/patients/deletePatientController");

const router = express.Router();

router.post("/updateDetails", updateDetails);
router.get("/getDetails", getDetails);
router.delete("/deletePatient/:user_id", deletePatient);

module.exports = router;
