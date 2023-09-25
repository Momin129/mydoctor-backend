const User = require("../../models/userSchema");

const detectDuplicate = async (req, res) => {
  const email = req.query.email;
  const contactNumber = req.query.contactNumber;

  if (email) {
    const emailExist = await User.findOne({ email: email });
    if (emailExist) res.status(400).json({ message: "Email already exists" });
    else res.status(200).json({ message: "" });
  } else {
    const contactNumberExist = await User.findOne({
      contactNumber: contactNumber,
    });
    console.log(contactNumberExist);
    if (contactNumberExist)
      res.status(400).json({ message: "Number already exists" });
    else res.status(200).json({ message: "" });
  }
};

module.exports = { detectDuplicate };
