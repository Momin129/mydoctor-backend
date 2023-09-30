const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../../utility/authToken");
const jwt = require("jsonwebtoken");

const checkIfDoctor = async (id) => {
  const result = await pool.query(
    "Select doctor_id,switch from doctors where user_id =$1",
    [id]
  );
  if (result.rowCount > 0)
    return {
      doctor_id: result.rows[0]["doctor_id"],
      switch: result.rows[0]["switch"],
    };
  else return "";
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const inPatient = await pool.query(
    "Select patient_id, password from patients where email=$1",
    [email]
  );

  const inHospitalAdmin = await pool.query(
    "Select hospital_id, password from hospital_admins where email=$1",
    [email]
  );

  //checking if login credentials are in patients table
  if (inPatient.rowCount > 0) {
    let patient_id = inPatient.rows[0]["patient_id"];
    const isDoctor = await checkIfDoctor(patient_id);
    const details = {
      role: "patient",
      token: generateToken({ id: patient_id }),
      isDoctor: isDoctor,
    };
    if (!bcrypt.compare(inPatient.rows[0]["password"], password)) {
      res.status(400).json({ message: "password not valid" });
    } else res.status(200).json(details);
  } else if (inHospitalAdmin.rowCount > 0) {
    const details = {
      role: "hospital_admin",
      token: generateToken({ id: inPatient.rows[0]["hospital_id"] }),
    };
    // checking if login credentials are in hospital_admins table
    if (!bcrypt.compare(inHospitalAdmin.rows[0]["password"], password)) {
      res.status(400).json({ message: "password not valid" });
    } else res.status(200).json(details);
  } else res.status(400).json({ message: "email not valid" }); // this determines invalid email was provided
};

const verifyToken = async (req, res) => {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: false });
  }
};

module.exports = { loginUser, verifyToken };
