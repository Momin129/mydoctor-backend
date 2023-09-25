const { registerUser } = require("../controllers/users/userEntryControllers");
const {
  detectDuplicate,
} = require("../controllers/users/userValidationControllers");

const router = require("express").Router();

router.post("/registerUser", registerUser);
router.get("/duplicate", detectDuplicate);

module.exports = router;
