const {
  registerUserRoles,
} = require("../controllers/users/userEntryControllers");

const {
  detectDuplicate,
} = require("../controllers/users/userValidationControllers");

const { registerUser } = require("../middlewares/users/registerUserMiddleware");

const router = require("express").Router();

router.post("/registerUser", registerUser, registerUserRoles);
router.get("/duplicate", detectDuplicate);

module.exports = router;
