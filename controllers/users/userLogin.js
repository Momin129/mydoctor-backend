const pool = require("../../config/db");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  const inPatient = await pool.query(
    "Select password from patients where email=$1",
    [email]
  );

  const inHospitalAdmin = await pool.query(
    "Select password from hospital_admins where email=$1",
    [email]
  );

  if (inPatient.rowCount > 0) {
    if (!bcrypt.compare(inPatient.rows[0]["password"], password)) {
      res.status(400).json({ message: "password not valid" });
    } else res.status(200).json({ role: "patient" });
  } else if (inHospitalAdmin.rowCount > 0) {
    if (!bcrypt.compare(inHospitalAdmin.rows[0]["password"], password)) {
      res.status(400).json({ message: "password not valid" });
    } else res.status(200).json({ role: "hospital_admin" });
  } else res.status(400).json({ message: "email not valid" });
};

module.exports = { loginUser };
