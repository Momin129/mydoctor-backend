const pool = require("../config/db");
const {
  insertIntoPatient,
  insertIntoDoctor,
  insertIntoHospital,
  insertIntoHospitalAdmin,
} = require("../controllers/users/queries");
const { nanoid } = require("nanoid");

const insertInPatient = async (id, data) => {
  const patient_id = nanoid();
  const patient = await pool.query(insertIntoPatient, [
    patient_id,
    id,
    data.dob,
  ]);

  if (patient.rowCount > 0) return true;
  else return false;
};

const insertInDoctor = async (id, data) => {
  const doctor_id = nanoid();
  const doctor = await pool.query(insertIntoDoctor, [
    doctor_id,
    id,
    data.licence_number,
  ]);
  if (doctor.rowCount > 0) return 0;
  else return false;
};

const insertHospitalAdmin = async (id, data) => {
  let hospital_id;
  if (data.hospital_name) {
    hospital_id = nanoid();
    await pool.query(insertIntoHospital, [hospital_id, data.hospital_name]);
  } else hospital_id = data.hospital_id;

  const map_id = nanoid();
  const hospital_admin = await pool.query(insertIntoHospitalAdmin, [
    map_id,
    hospital_id,
    id,
  ]);
  if (hospital_admin.rowCount > 0) return true;
  else return false;
};

module.exports = { insertInPatient, insertInDoctor, insertHospitalAdmin };
