const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../../utility/authToken");
const jwt = require("jsonwebtoken");
const { ifEmailPresent, ifContactPresent } = require("./queries");
const { isContact } = require("../../utility/checkContact");

const loginUser = async (req, res) => {
  const { emailContact, password } = req.body;

  let type, query;

  const isNumber = isContact(emailContact);

  if (!isNumber) {
    type = "Email";
    query = ifEmailPresent;
  } else {
    type = "Contact";
    query = ifContactPresent;
  }

  const isUser = await pool.query(query, [emailContact]);
  if (isUser.rowCount > 0) {
    const data = isUser.rows[0];
    if (!(await bcrypt.compare(password, data["password"]))) {
      res.status(400).json({ message: "Invalid password" });
    } else
      res.status(200).json({
        role: data["role"],
        id: data["user_id"],
        token: generateToken({ id: data["user_id"], role: data["role"] }),
      });
  } else res.status(400).json({ message: `Invalid ${type}` });
};

const verifyToken = async (req, res) => {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      res.status(200).json({ success: true, decode });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: false });
  }
};

module.exports = { loginUser, verifyToken };
