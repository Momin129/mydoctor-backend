const pool = require("../../config/db");
const {
  insertPatient,
  insertHospitalAdmin,
  insertDoctor,
} = require("./queries");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const id = nanoid();

  const { fullname, email, password, contact, gender, hospital_name, role } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let values = [];
  let insertFunction;

  if (role == "patient") {
    values = [id, fullname, email, hashedPassword, contact, gender];
    insertFunction = insertPatient;
  } else {
    values = [id, hospital_name, email, hashedPassword, contact];
    insertFunction = insertHospitalAdmin;
  }

  try {
    const result = await pool.query(insertFunction, values);
    if (result.rowCount > 0)
      res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const registerDoctor = async (req, res) => {
  const id = nanoid();
  const { user_id, hospital_id, licenceNumber } = req.body;

  console.log(licenceNumber);
  try {
    const result = await pool.query(insertDoctor, [
      id,
      user_id,
      hospital_id,
      licenceNumber,
    ]);
    if (result.rowCount > 0)
      res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = { registerUser, registerDoctor };
