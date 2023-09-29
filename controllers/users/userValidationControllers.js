const pool = require("../../config/db");
const {
  emailExistsPatient,
  emailExistsHospitalAdmin,
  contactExistsPatient,
  contactExistsHospitalAdmin,
} = require("./queries");

const detectDuplicate = async (req, res) => {
  const email = req.query.email;
  const contact = req.query.contact;
  const role = req.query.role;

  let type, checkFunction, value;

  if (email) {
    type = "Email";
    checkFunction =
      role == "patient" ? emailExistsPatient : emailExistsHospitalAdmin;
    value = email;
  } else {
    type = "Number";
    checkFunction =
      role == "patient" ? contactExistsPatient : contactExistsHospitalAdmin;
    value = contact;
  }

  pool.query(checkFunction, [value], (err, result) => {
    if (!err) {
      if (result.rowCount > 0)
        res.status(400).json({ message: `${type} already exists` });
      else res.status(200).json({ message: "" });
    }
  });
};

module.exports = { detectDuplicate };
