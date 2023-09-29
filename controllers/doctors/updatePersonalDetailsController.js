const pool = require("../../config/db");
const { updateUserDetails, updateDoctorDetails } = require("./queries");

const updatePersonalDetails = async (req, res) => {
  const { doctor_id, languages, consultation_fee, bio } = req.body;
  const { user_id, fullname, contact, email, gender } = req.body;

  let lang = languages.split(",");

  try {
    const userUpdate = await pool.query(updateUserDetails, [
      fullname,
      email,
      contact,
      gender,
      user_id,
    ]);

    const doctorUpdate = await pool.query(updateDoctorDetails, [
      `{${lang}}`,
      consultation_fee,
      bio,
      doctor_id,
    ]);

    if (userUpdate.rowCount > 0 && doctorUpdate.rowCount > 0) {
      res.status(200).json({ message: "Updated Successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong.", error });
  }
};

module.exports = { updatePersonalDetails };
