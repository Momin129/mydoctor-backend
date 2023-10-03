const pool = require("../../config/db");
const { emailExists, contactExists } = require("./queries");

const detectDuplicate = async (req, res) => {
  const email = req.query.email;
  const contact = req.query.contact;

  let checkQuery, type;

  if (email) {
    checkQuery = emailExists;
    type = email;
  } else if (contact) {
    checkQuery = contactExists;
    type = contact;
  }

  const result = await pool.query(checkQuery, [type]);
  if (result.rowCount > 0)
    res.status(200).json({ message: `${type} already exists.` });
  else res.status(200).json({ message: "" });
};

module.exports = { detectDuplicate };
