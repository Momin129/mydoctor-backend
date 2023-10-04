const pool = require("../../config/db");
const { updateGeneralDetails, updatePersonalDetails } = require("./queries");

const updateDetails = async (req, res) => {
  const { user_id, generalDetails, personalDetails } = req.body;
  let genral, personal;

  try {
    if (generalDetails) {
      genral = await pool.query(updateGeneralDetails(generalDetails, user_id));
    }

    if (personalDetails) {
      personal = await pool.query(
        updatePersonalDetails(personalDetails, user_id)
      );
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};


module.exports = { updateDetails };
