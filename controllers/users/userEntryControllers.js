const User = require("../../models/userSchema");

const registerUser = async (req, res) => {
  const data = req.body;
  try {
    await User.create(data);
    res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};

const loginUser = async (req, res) => {
  
};

module.exports = { registerUser };
