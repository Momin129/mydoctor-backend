const insertUser =
  "INSERT INTO public.users(user_id, fullname, email, password, contact, gender, role)	VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id";

const insertPatient =
  "INSERT INTO public.patients(patient_id,user_id) VALUES($1,$2)";

const insertDoctor =
  "INSERT INTO public.doctors(doctor_id,user_id) VALUES($1,$2)";

const insertHospital =
  "INSERT INTO public.hospitals(hospital_id,user_id) VALUES($1,$2)";

const emailExists = "Select * From users where email = $1";
const contactExists = "Select * From users where contact = $1";

module.exports = {
  insertUser,
  insertPatient,
  insertDoctor,
  insertHospital,
  emailExists,
  contactExists,
};
