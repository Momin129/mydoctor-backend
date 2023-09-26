const {
  addSpecialities,
  retriveAllSpecialities,
} = require("../controllers/specialities/specialtlitesControllers");

const router = require("express").Router();

router.post("/addSpeciality", addSpecialities);
router.get("/getAllSpecialities", retriveAllSpecialities);

module.exports = router;
