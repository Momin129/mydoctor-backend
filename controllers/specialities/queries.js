const addSpeciality =
  "INSERT INTO specialities (speciality_id,speciality_name,image_url) VALUES ($1,$2,$3)";

const getAllSpecialities = "SELECT * From specialities";

module.exports = { addSpeciality, getAllSpecialities };
