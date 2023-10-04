const { registerUser } = require("../controllers/users/userEntryControllers");
const { loginUser, verifyToken } = require("../controllers/users/userLogin");

const {
  detectDuplicate,
} = require("../controllers/users/userValidationControllers");

const router = require("express").Router();

router.post("/registerUser", registerUser);
router.get("/duplicate", detectDuplicate);
router.post("/login", loginUser);
router.get("/verifyToken", verifyToken);

module.exports = router;
