const pool = require("../../config/db");
const { insertIntoUsers } = require("./queries");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const {
  insertInPatient,
  insertInDoctor,
  insertHospitalAdmin,
} = require("../../utility/roleBasedInsertion");

const registerUser = async (req, res) => {
  const id = nanoid();

  const data = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const insert = await pool.query(insertIntoUsers, [
    id,
    data.fullname,
    data.email,
    data.contact,
    hashedPassword,
    data.gender,
    data.role,
  ]);

  if (insert.rowCount > 0) {
    let insertIntoRole;
    if (data.role == "patient") {
      insertIntoRole = insertInPatient(id, data);
    } else if (data.role == "doctor") {
      insertIntoRole = insertInDoctor(id, data);
    } else {
      insertIntoRole = insertHospitalAdmin(id, data);
    }

    if (insertIntoRole)
      res.status(201).json({ message: "Registered Successfully." });
    else
      res
        .status(400)
        .json({ message: "Something went wrong, please try again." });
  }
};

module.exports = { registerUser };
