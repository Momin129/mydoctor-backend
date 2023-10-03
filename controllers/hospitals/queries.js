const addDoctorToHospital =
  "Insert into hospital_doctor(hospital_doctor_id,hospital_id,user_id) Values($1,$2,$3)";

const addFee =
  "Update hospital_doctor set consultation_fee =$1 where hospital_id=$2 and user_id=$3";

const enable_doctor =
  "Update hospital_doctor set enabled =$1 where hospital_id=$2 and user_id=$3";

module.exports = { addDoctorToHospital, addFee, enable_doctor };
