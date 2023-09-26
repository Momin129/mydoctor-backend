const pool = require("../../config/db");
const generateUniqueId = require("generate-unique-id");
const { addSpeciality, getAllSpecialities } = require("./queries");

const addSpecialities = async (req, res) => {
  const { speciality_name, image_url } = req.body;
  try {
    const speciality_id = generateUniqueId({ length: 16, useLetters: false });
    const result = await pool.query(addSpeciality, [
      speciality_id,
      speciality_name,
      image_url,
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
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

module.exports = { addSpecialities, retriveAllSpecialities };
