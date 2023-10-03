const { nanoid } = require("nanoid");
const pool = require("../../config/db");
const { addDoctorToHospital, addFee, enable_doctor } = require("./queries");

const addToHospital = async (req, res) => {
  const hospital_doctor_id = nanoid();
  const { hospital_id, user_id } = req.body;

  const addDoctor = await pool.query(addDoctorToHospital, [
    hospital_doctor_id,
    hospital_id,
    user_id,
  ]);

  if (addDoctor.rowCount > 0)
    res.status(201).json({ message: "Request sent successfully." });
  else
    res
      .status(400)
      .json({ message: "Something went wrong, please try again later." });
};

const enableDoctor = async (req, res) => {
  const { hospital_id, user_id, enabled } = req.body;
  const enable = await pool.query(enable_doctor, [
    enabled,
    hospital_id,
    user_id,
  ]);
  if (enable.rowCount > 0)
    res.status(200).json({ message: "Updated doctor status." });
  else
    res
      .status(400)
      .json({ message: "Something went wrong, please try again later." });
};

const addConsultationFee = async (req, res) => {
  const { hospital_id, user_id, fee } = req.body;
  const addConsultation = await pool.query(addFee, [fee, hospital_id, user_id]);
  if (addConsultation.rowCount > 0)
    res.status(200).json({ message: "Fee updated successfully." });
  else
    res.status(400).json({ message: "Something went wrong, try again later." });
};

module.exports = { addToHospital, enableDoctor, addConsultationFee };
