const pool = require("../config/db");
const {
  registerUser,
  registerDoctor,
} = require("../controllers/users/userEntryControllers");
const { loginUser, verifyToken } = require("../controllers/users/userLogin");

const {
  detectDuplicate,
} = require("../controllers/users/userValidationControllers");

const router = require("express").Router();

router.post("/registerUser", registerUser);
router.get("/duplicate", detectDuplicate);
router.post("/login", loginUser);
router.get("/verifyToken", verifyToken);

// router.get("/patients", async (req, res) => {
//   let obj = { fullname: "Momin", contact: "9876543211" };

//   let patient_id = "GUbTv_fimBW3nZBGXpebQ";
//   let query = "Update patients set ";

//   var keys = Object.keys(obj);
//   var last = keys[keys.length - 1];

//   for (let item in obj) {
//     query += item + "=" + `'${obj[item]}'`;
//     if (item !== last) query += ",";
//   }

//   query += ` where patient_id='GUbTv_fimBW3nZBGXpebQ'`;

//   console.log(query);
//   // let tablename = "patients";
//   const result = await pool.query(query);
//   res.json(result.rows);
// });

module.exports = router;
