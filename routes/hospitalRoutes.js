const express = require("express");
const {
  addToHospital,
  addConsultationFee,
  enableDoctor,
} = require("../controllers/hospitals/hospitalControllers");
const router = express.Router();

router.post("/addDoctor", addToHospital);
router.post("/addConsultationFee", addConsultationFee);
router.post("/enableDoctor", enableDoctor);

module.exports = router;
