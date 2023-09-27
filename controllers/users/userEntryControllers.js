const pool = require("../../config/db");
const generateUniqueId = require("generate-unique-id");
const { insertPatient, insertDoctor, insertHospital } = require("./queries");

const registerUserRoles = async (req, res) => {
  const role_id = generateUniqueId({ length: 8, useLetters: false });
  const { role, hospital_name, dob, hospital_id } = req.body;

  let insertFunction;
  let values = [role_id, req.user_id];

  if (role == "patient") {
    insertFunction = insertPatient;
    values.push(dob);
  } else if (role == "doctor") {
    insertFunction = insertDoctor;
    values.push(hospital_id);
  } else {
    insertFunction = insertHospital;
    values.push(hospital_name);
  }

  if (req.user_id.length > 0) {
    const result = await pool.query(insertFunction, values);
    if (result.rowCount > 0)
      res.status(200).json({ message: "Registered Successfully." });
  } else {
    res.status(400).json({ message: "Something went wrong." });
  }
};


module.exports = { registerUserRoles };
