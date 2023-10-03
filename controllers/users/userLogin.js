const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../../utility/authToken");
const jwt = require("jsonwebtoken");
const { ifEmailPresent } = require("./queries");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const isUser = await pool.query(ifEmailPresent, [email]);
  if (isUser.rowCount > 0) {
    const data = isUser.rows[0];
    console.log(data["password"], password);
    if (!(await bcrypt.compare(password, data["password"]))) {
      res.status(400).json({ message: "Invalid password" });
    } else
      res.status(200).json({
        role: data["role"],
        id: data["user_id"],
        token: generateToken({ id: data["user_id"], role: data["role"] }),
      });
  } else res.status(400).json({ message: "Invalid Email" });
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
