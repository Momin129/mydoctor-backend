const pool = require("../../config/db");
const { emailExists, contactExists } = require("./queries");

const detectDuplicate = async (req, res) => {
  const email = req.query.email;
  const contact = req.query.contact;
  let type, checkFunction, value;

  if (email) {
    type = "Email";
    checkFunction = emailExists;
    value = email;
  } else {
    type = "Number";
    checkFunction = contactExists;
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
