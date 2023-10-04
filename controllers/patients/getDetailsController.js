const pool = require("../../config/db");
const { getGeneralDetails, getPersonalDetails } = require("./queries");

const getDetails = async (req, res) => {
  const user_id = req.query.user_id;

  try {
    const genral = await pool.query(getGeneralDetails, [user_id]);
    const personal = await pool.query(getPersonalDetails, [user_id]);

    if (genral.rowCount > 0 && personal.rowCount > 0) {
      res.status(200).json({
        genralDetails: genral.rows[0],
        personalDetails: personal.rows[0],
      });
    } else res.status(400).json({ message: "Something went wrong" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong please try again later.", error });
  }
};

module.exports = { getDetails };
