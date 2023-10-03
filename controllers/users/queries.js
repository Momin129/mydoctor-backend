const insertIntoUsers =
  "Insert into users (user_id,fullname,email,contact,password,gender,role) Values($1,$2,$3,$4,$5,$6,$7)";

const insertIntoPatient =
  "Insert into patients(patient_id,user_id,dob) Values($1,$2,$3)";

const insertIntoDoctor =
  "Insert into doctors(doctor_id,user_id,licence_number) Values($1,$2,$3)";

const insertIntoHospital =
  "Insert Into hospitals(hospital_id,hospital_name) Values($1,$2)";

const insertIntoHospitalAdmin =
  "Insert into hospital_admin(hospital_admin_id,hospital_id,user_id) Values($1,$2,$3)";

const emailExists = "Select * from users where email=$1";
const contactExists = "Select * from users where contact=$1";

const ifEmailPresent = "Select user_id,password,role from users where email=$1";
const ifContactPresent =
  "Select user_id,password,role from users where contact=$1";

module.exports = {
  insertIntoUsers,
  insertIntoPatient,
  insertIntoDoctor,
  insertIntoHospital,
  insertIntoHospitalAdmin,
  emailExists,
  contactExists,
  ifEmailPresent,
  ifContactPresent,
};
