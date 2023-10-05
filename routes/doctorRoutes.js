const express = require("express");

const {
  updateDetails,
} = require("../controllers/doctors/updateDetailsController");
const { getDetails } = require("../controllers/doctors/getDetailsController");
const {
  createSlot,
  ifSlotExists,
} = require("../controllers/doctors/slotCreationControllers");

const router = express.Router();

router.post("/updateDoctor", updateDetails);
router.post("/createSlot", createSlot);
router.get("/getDetails", getDetails);
router.get("/slotExists", ifSlotExists);

module.exports = router;
