const pool = require("../../config/db");
const { addSpeciality, getAllSpecialities } = require("./queries");
const { nanoid } = require("nanoid");

const addSpecialities = async (req, res) => {
  const { speciality_name, speciality_image } = req.body;
  try {
    const speciality_id = nanoid();
    const result = await pool.query(addSpeciality, [
      speciality_id,
      speciality_name,
      speciality_image,
    ]);
    if (result) {
      res.status(200).json({ message: "Speciality Added" });
    }
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

const retriveAllSpecialities = async (req, res) => {
  try {
    const result = await pool.query(getAllSpecialities);
    res.status(200).json({ total: result.rowCount, data: result.rows });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

module.exports = { addSpecialities, retriveAllSpecialities };
