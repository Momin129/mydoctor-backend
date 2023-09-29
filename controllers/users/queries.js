const insertPatient =
  "INSERT INTO public.patients(patient_id, fullname, email, password, contact, gender) VALUES($1, $2, $3, $4, $5, $6)";

const insertDoctor =
  "INSERT INTO public.doctors(doctor_id,user_id,hospital_id, licence_number) VALUES($1,$2,$3,$4)";

const insertHospitalAdmin =
  "INSERT INTO public.hospital_admins(hospital_id,hospital_name,email,password,contact) VALUES ($1,$2,$3,$4,$5)";

const emailExistsPatient = "Select * From patients where email = $1";
const contactExistsPatient = "Select * From patients where contact = $1";

const emailExistsHospitalAdmin =
  "Select * From hospital_admins where email = $1";
const contactExistsHospitalAdmin =
  "Select * From hopital_admins where contact = $1";

module.exports = {
  insertPatient,
  insertDoctor,
  insertHospitalAdmin,
  emailExistsPatient,
  contactExistsPatient,
  emailExistsHospitalAdmin,
  contactExistsHospitalAdmin,
};
