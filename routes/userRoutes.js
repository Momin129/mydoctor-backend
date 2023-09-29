const pool = require("../config/db");
const {
  registerUser,
  registerDoctor,
} = require("../controllers/users/userEntryControllers");
const { loginUser } = require("../controllers/users/userLogin");

const {
  detectDuplicate,
} = require("../controllers/users/userValidationControllers");

const router = require("express").Router();

router.post("/registerUser", registerUser);
router.post("/registerDoctor", registerDoctor);
router.get("/duplicate", detectDuplicate);
router.post("/login", loginUser);

module.exports = router;
