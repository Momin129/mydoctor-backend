const generateUniqueId = require("generate-unique-id");
const pool = require("../../config/db");
const { insertUser } = require("../../controllers/users/queries");

const registerUser = async (req, res, next) => {
  const user_id = generateUniqueId({ length: 8, useLetters: false });
  const { fullname, email, password, contact, gender, role } = req.body;
  const result = await pool.query(insertUser, [
    user_id,
    fullname,
    email,
    password,
    contact,
    gender,
    role,
  ]);

  req.user_id = result.rows[0]["user_id"];
  next();
};

module.exports = { registerUser };
