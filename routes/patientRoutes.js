const express = require("express");
const {
  updateDetails,
} = require("../controllers/patients/updateDetailsController");
const { getDetails } = require("../controllers/patients/getDetailsController");
const {
  deletePatient,
} = require("../controllers/patients/deletePatientController");
const {
  bookAppointment,
  showAppointments,
} = require("../controllers/patients/appointmentController");

const router = express.Router();

router.post("/updateDetails", updateDetails);
router.get("/getDetails", getDetails);
router.delete("/deletePatient/:user_id", deletePatient);
router.post("/bookSlot", bookAppointment);
router.get("/getAppointments", showAppointments);

module.exports = router;
